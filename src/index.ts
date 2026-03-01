import { LitElement, html, css, unsafeCSS, type CSSResult, type TemplateResult } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import type { HomeAssistant } from 'custom-card-helpers'

import { CARD_TYPE, CARD_NAME, CARD_DESCRIPTION, CSS_TRANSITION_DURATION } from './constants'
import type { SkylineCardConfig, ForegroundConfig, CelestialPosition } from './types'
import { resolveEntities, readSensors } from './sensors'
import {
  calcTransitions,
  calcSceneFilter,
  calcSkyPosition,
  celestialPosition,
  moonImageUrl,
} from './transitions'

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; preview: boolean; description: string }>
  }
}

const TRANSITION = unsafeCSS(CSS_TRANSITION_DURATION)

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
      }

      .card-container {
        position: relative;
        width: 100%;
        /* 8:3 aspect ratio default; override with CSS custom property --shc-aspect-ratio */
        padding-bottom: var(--shc-aspect-ratio, 37.5%);
        overflow: hidden;
      }

      .layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center top;
        background-repeat: no-repeat;
      }

      .layer--sky {
        z-index: 0;
        background-size: 100% auto;
        background-repeat: no-repeat;
        transition: background-position-y ${TRANSITION} ease;
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

      .celestial-body {
        position: absolute;
        transform: translate(-50%, -50%);
        z-index: 1;
        pointer-events: none;
        transition:
          left ${TRANSITION} ease,
          top ${TRANSITION} ease,
          opacity ${TRANSITION} ease;
      }

      .celestial-body img {
        width: 100%;
        height: auto;
        display: block;
      }

      .moon-img {
        width: 100%;
        height: auto;
        display: block;
        mix-blend-mode: screen;
      }
    `
  }

  public setConfig(config: SkylineCardConfig): void {
    if (!config.foregrounds || config.foregrounds.length === 0) {
      throw new Error(
        `${CARD_TYPE}: at least one entry under "foregrounds" is required`
      )
    }
    if (!config.sun_image) {
      throw new Error(`${CARD_TYPE}: "sun_image" is required`)
    }
    if (!config.moon_image_path) {
      throw new Error(
        `${CARD_TYPE}: "moon_image_path" is required — use {angle} as placeholder, e.g. /local/moon/phase_{angle}.png`
      )
    }
    this._config = config
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass
    this.requestUpdate()
  }

  get hass(): HomeAssistant {
    return this._hass
  }

  private get activeForeground(): ForegroundConfig {
    const id = this._config.active_foreground
    const fg = id ? this._config.foregrounds.find(f => f.id === id) : undefined
    return fg ?? this._config.foregrounds[0]
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
    const sceneFilter = calcSceneFilter(transitions)
    const skyPosition = calcSkyPosition(transitions)
    const fg = this.activeForeground
    const horizonY = this._config.horizon_y ?? 55

    const sunPos = celestialPosition(
      sensors.sunAzimuth,
      sensors.sunElevation,
      sensors.azimuthRange,
      horizonY
    )
    const moonPos = celestialPosition(
      sensors.moonAzimuth,
      sensors.moonElevation,
      sensors.azimuthRange,
      horizonY
    )
    const moonUrl = moonImageUrl(this._config.moon_image_path, sensors.moonPhaseAngle)

    return html`
      <ha-card>
        <div class="card-container">

          <!-- Layer 0: Sky background gradient, background-position-y scrolls through time of day -->
          <div
            class="layer layer--sky"
            style=${styleMap({
              backgroundImage: `url('${fg.background}')`,
              backgroundPositionY: skyPosition,
            })}
          ></div>

          <!-- Layer 1: Sun -->
          ${this._renderSun(sunPos, sceneFilter)}

          <!-- Layer 1: Moon -->
          ${this._renderMoon(moonPos, moonUrl, sensors.moonParallacticAngle, transitions.stars)}

          <!-- Layer 2: Stars (opacity driven by twilight transition) -->
          <div
            class="layer layer--stars"
            style=${styleMap({
              backgroundImage: `url('${fg.stars}')`,
              opacity: String(transitions.stars),
            })}
          ></div>

          <!-- Layer 3: Static foreground (lake scene, trees, etc.) with day/night filter -->
          <div
            class="layer layer--foreground"
            style=${styleMap({
              backgroundImage: `url('${fg.foreground}')`,
              filter: sceneFilter,
            })}
          ></div>

          <!-- Layer 3: Clouds overlay -->
          <div
            class="layer layer--clouds"
            style=${styleMap({ backgroundImage: `url('${fg.clouds}')` })}
          ></div>

        </div>
      </ha-card>
    `
  }

  private _renderSun(pos: CelestialPosition, filter: string): TemplateResult {
    return html`
      <div
        class="celestial-body"
        style=${styleMap({
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          width: '7%',
          filter,
        })}
      >
        <img src=${this._config.sun_image} alt="Sun" />
      </div>
    `
  }

  private _renderMoon(
    pos: CelestialPosition,
    imageUrl: string,
    parallacticAngle: number,
    starsOpacity: number
  ): TemplateResult {
    // Moon is visible when it's in the sky area and it's dark enough to see
    const moonVisible = pos.y >= 0 && pos.y <= 100
    const moonOpacity = moonVisible ? Math.max(starsOpacity, 0.15) : 0

    return html`
      <div
        class="celestial-body"
        style=${styleMap({
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          width: '7%',
          opacity: String(moonOpacity),
          transform: `translate(-50%, -50%) rotate(${parallacticAngle}deg)`,
          transformOrigin: '50% 50%',
        })}
      >
        <img class="moon-img" src=${imageUrl} alt="Moon" />
      </div>
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
