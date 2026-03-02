import { LitElement, html, css, unsafeCSS, type CSSResult, type TemplateResult } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import type { HomeAssistant } from 'custom-card-helpers'

import {
  CARD_TYPE,
  CARD_NAME,
  CARD_DESCRIPTION,
  CSS_TRANSITION_DURATION,
  HACS_BASE_PATH,
  DEFAULT_IMAGES,
  DEFAULT_SUN_SIZE,
  DEFAULT_MOON_SIZE,
  FOREGROUND_IMAGES,
} from './constants'
import type { SkylineCardConfig, CelestialPosition } from './types'
import { resolveEntities, readSensors } from './sensors'
import {
  calcTransitions,
  calcSceneFilter,
  calcSkyGradient,
  celestialPosition,
  moonImageUrl,
} from './transitions'

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; preview: boolean; description: string }>
  }
}

const TRANSITION = unsafeCSS(CSS_TRANSITION_DURATION)

function fullPath(filename: string): string {
  return `${HACS_BASE_PATH}${filename}`
}

@customElement(CARD_TYPE)
export class SkylineHorizonCard extends LitElement {
  @state() private _config!: SkylineCardConfig
  private _hass!: HomeAssistant

  static get styles(): CSSResult {
    return css`
      :host {
        display: block;
        position: relative;
        overflow: hidden;
        border-radius: var(--ha-card-border-radius, 12px);
      }

      ha-card {
        overflow: hidden;
        border-radius: inherit;
        background: none;
      }

      .card-container {
        position: relative;
        width: 100%;
        /* Height is established by the invisible aspect-ref image below */
      }

      /* Invisible image whose natural dimensions set the card aspect ratio */
      .aspect-ref {
        display: block;
        width: 100%;
        height: auto;
        visibility: hidden;
        pointer-events: none;
      }

      /* All scene layers sit on top of the aspect-ref, filling the container */
      .layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: fill;
      }

      .layer--sky {
        z-index: 0;
      }

      .layer--stars {
        z-index: 2;
        mix-blend-mode: hard-light;
        transition: opacity ${TRANSITION} ease;
      }

      .layer--clouds {
        z-index: 3;
        mix-blend-mode: overlay;
      }

      .layer--foreground {
        z-index: 3;
        transition: filter ${TRANSITION} ease;
      }

      /* Celestial bodies (sun / moon) */
      .celestial-body {
        position: absolute;
        transform: translate(-50%, -50%);
        z-index: 1;
        pointer-events: none;
        height: auto;
        transition:
          left ${TRANSITION} ease,
          top ${TRANSITION} ease,
          opacity ${TRANSITION} ease;
      }

      .moon-img {
        width: 100%;
        height: auto;
        display: block;
        mix-blend-mode: screen;
      }

      .sun-img {
        width: 100%;
        height: auto;
        display: block;
      }
    `
  }

  public setConfig(config: SkylineCardConfig): void {
    const n = Math.max(1, Math.min(config.foreground ?? 1, FOREGROUND_IMAGES.length))
    this._config = { ...config, foreground: n }
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass
    this.requestUpdate()
  }

  get hass(): HomeAssistant {
    return this._hass
  }

  /** All scene image URLs — fixed, from bundle */
  private get _images() {
    return {
      sky: fullPath(DEFAULT_IMAGES.skyBackground),
      stars: fullPath(DEFAULT_IMAGES.stars),
      clouds: fullPath(DEFAULT_IMAGES.clouds),
      sun: fullPath(DEFAULT_IMAGES.sun),
      moonPath: fullPath(DEFAULT_IMAGES.moonPath),
    }
  }

  /** Foreground image URL for the selected foreground number (1-based) */
  private get _activeForegroundImage(): string {
    const index = (this._config.foreground ?? 1) - 1
    const filename = FOREGROUND_IMAGES[Math.max(0, index)] ?? FOREGROUND_IMAGES[0]
    return fullPath(filename)
  }

  public override render(): TemplateResult {
    if (!this._hass || !this._config) return html``

    const entities = resolveEntities(this._config)
    const sensors = readSensors(this._hass, entities, this._config)
    const transitions = calcTransitions(
      sensors.sunElevation,
      sensors.declinationNormalized,
      this._config
    )
    const sceneFilter = calcSceneFilter(transitions, this._config)
    const skyGradient = calcSkyGradient(transitions)
    const horizonY = this._config.horizon_y ?? 30
    const images = this._images
    const fgImage = this._activeForegroundImage

    const sunPos = celestialPosition(
      sensors.sunAzimuth,
      sensors.sunElevation,
      sensors.azimuthRange,
      horizonY,
      sensors.maxElevation
    )
    const moonPos = celestialPosition(
      sensors.moonAzimuth,
      sensors.moonElevation,
      sensors.azimuthRange,
      horizonY,
      sensors.maxElevation
    )
    const moonUrl = moonImageUrl(images.moonPath, sensors.moonPhaseAngle)
    const sunSize = this._config.sun_size ?? DEFAULT_SUN_SIZE
    const moonSize = this._config.moon_size ?? DEFAULT_MOON_SIZE

    return html`
      <ha-card>
        <div class="card-container">

          <!-- Invisible image that establishes the card's aspect ratio from the actual image -->
          <img class="aspect-ref" src=${fgImage} alt="" />

          <!-- Layer 0: Sky gradient transitions through day / golden hour / night -->
          <div
            class="layer layer--sky"
            style=${styleMap({ background: skyGradient })}
          ></div>

          <!-- Layer 1: Sun -->
          ${this._renderSun(sunPos, sceneFilter, images.sun, sunSize)}

          <!-- Layer 1: Moon -->
          ${this._renderMoon(moonPos, moonUrl, sensors.moonParallacticAngle, moonSize)}

          <!-- Layer 2: Stars — opacity driven by twilight transition -->
          <img
            class="layer layer--stars"
            src=${images.stars}
            alt=""
            style=${styleMap({ opacity: String(transitions.stars) })}
          />

          <!-- Layer 3: Foreground scene — day/night filter applied here -->
          <img
            class="layer layer--foreground"
            src=${fgImage}
            alt=""
            style=${styleMap({ filter: sceneFilter })}
          />

          <!-- Layer 3: Clouds overlay -->
          <img
            class="layer layer--clouds"
            src=${images.clouds}
            alt=""
          />

        </div>
      </ha-card>
    `
  }

  private _renderSun(
    pos: CelestialPosition,
    filter: string,
    sunImage: string,
    size: number
  ): TemplateResult {
    return html`
      <img
        class="celestial-body sun-img"
        src=${sunImage}
        alt="Sun"
        style=${styleMap({
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          width: `${size}%`,
          filter,
        })}
      />
    `
  }

  private _renderMoon(
    pos: CelestialPosition,
    imageUrl: string,
    parallacticAngle: number,
    size: number
  ): TemplateResult {
    return html`
      <img
        class="celestial-body moon-img"
        src=${imageUrl}
        alt="Moon"
        style=${styleMap({
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          width: `${size}%`,
          transform: `translate(-50%, -50%) rotate(${parallacticAngle}deg)`,
          transformOrigin: '50% 50%',
        })}
      />
    `
  }

  public getCardSize(): number {
    return 4
  }
}

window.customCards ??= []
window.customCards.push({
  type: CARD_TYPE,
  name: CARD_NAME,
  preview: false,
  description: CARD_DESCRIPTION,
})
