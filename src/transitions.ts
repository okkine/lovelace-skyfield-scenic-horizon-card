import {
  ELEVATION,
  EVENING_ELEV_SUMMER,
  EVENING_ELEV_WINTER,
  DEFAULT_HORIZON_Y,
  FALLBACK_MAX_ELEVATION,
} from './constants'
import type { SkylineCardConfig, TransitionValues, CelestialPosition } from './types'
import type { AzimuthRange } from './sensors'

/** Clamp a value between min and max */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/** Linear interpolation from a → b by t (0–1) */
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/**
 * Map a value from [fromMin, fromMax] → [0, 1], clamped.
 * Returns 0 when value === fromMin, 1 when value === fromMax.
 */
function normalize(value: number, fromMin: number, fromMax: number): number {
  if (fromMax === fromMin) return 0
  return clamp((value - fromMin) / (fromMax - fromMin), 0, 1)
}

/**
 * Calculate all day/night transition values from sun elevation.
 *
 * Mirrors pyscript circadian_on_off() logic:
 *
 *   circadian_evening:  0 = full day (sun above threshold),
 *                       1 = evening reached (sun at 5°)
 *   circadian_twilight: 0 = day (sun at 0°),
 *                       1 = full night (sun at −12°)
 *   circadian_stars:    star layer opacity (appears in second half of twilight)
 *   sky:                vertical offset for sky background layer (percentage)
 */
export function calcTransitions(
  sunElevation: number,
  declinationNormalized: number,
  config: SkylineCardConfig
): TransitionValues {
  const eveningSummer = config.evening_elev_summer ?? EVENING_ELEV_SUMMER
  const eveningWinter = config.evening_elev_winter ?? EVENING_ELEV_WINTER

  // Seasonal evening threshold: interpolate between winter and summer values.
  // declinationNormalized: −1 = December solstice, +1 = June solstice → remap to [0, 1]
  const seasonT = clamp((declinationNormalized + 1) / 2, 0, 1)
  const eveningDay = lerp(eveningWinter, eveningSummer, seasonT)
  const eveningNight = ELEVATION.GOLDEN_HOUR_START  // 5° (matches pyscript circadian_evening_night)

  // circadian_evening: 0 = full day (sun at or above eveningDay),
  //                    1 = sun has reached eveningNight (5°)
  const evening = normalize(sunElevation, eveningDay, eveningNight)

  // circadian_twilight: 0 = sun at horizon (0°), 1 = full night (−12°)
  const twilight = normalize(sunElevation, ELEVATION.TWILIGHT_START, ELEVATION.TWILIGHT_END)

  // Stars: appear in the second half of twilight progression
  const stars = clamp((twilight - 0.5) * 2, 0, 1)

  // Sky background position — mirrors pyscript circadian_sky:
  //   combined = (evening/2 + twilight/2) * 400
  //   if twilight == 0 (daytime): negate (morning/evening position above centre)
  const rawSky = ((evening / 2) + (twilight / 2)) * 400
  const sky = twilight === 0 ? -rawSky : rawSky

  return { evening, twilight, stars, sky }
}

/**
 * Build a CSS filter string for the scene layers based on current transition values.
 *
 * Stages:
 *   Day  (evening=0, twilight=0) → no filter modification
 *   Golden hour (evening rises)  → warm sepia tint, slight brightness drop
 *   Civil twilight (twilight 0→0.5) → blue-grey shift, dimming begins
 *   Nautical twilight (twilight 0.5→1) → deep blue, near-dark
 */
export function calcSceneFilter(
  transitions: TransitionValues,
  config: { min_brightness?: number; max_contrast?: number }
): string {
  const { evening, twilight } = transitions
  const brightNight = config.min_brightness ?? 0.35
  const contrastNight = config.max_contrast ?? 1.3

  // brightness: 1.0 (day) → 0.85 (golden hour) → 0.45 (civil twilight) → brightNight (night)
  const brightDay    = 1.0
  const brightGolden = 0.85
  const brightCivil  = 0.45
  let brightness: number
  if (twilight < 0.5) {
    const t = twilight * 2
    brightness = lerp(lerp(brightDay, brightGolden, evening), brightCivil, t)
  } else {
    brightness = lerp(brightCivil, brightNight, (twilight - 0.5) * 2)
  }

  // saturation: 1.0 (day) → 1.3 (golden hour) → 0.85 (civil) → 0.70 (night)
  const satGolden = 1.3
  const satCivil  = 0.85
  const satNight  = 0.70
  let saturation: number
  if (twilight < 0.5) {
    const t = twilight * 2
    saturation = lerp(lerp(1.0, satGolden, evening), satCivil, t)
  } else {
    saturation = lerp(satCivil, satNight, (twilight - 0.5) * 2)
  }

  // contrast: 1.0 (day) → 1.1 (golden) → 1.4 (civil) → contrastNight (night)
  const contrastGolden = 1.1
  const contrastCivil  = 1.4
  const contrast = twilight < 0.5
    ? lerp(lerp(1.0, contrastGolden, evening), contrastCivil, twilight * 2)
    : lerp(contrastCivil, contrastNight, (twilight - 0.5) * 2)

  return [
    `brightness(${brightness.toFixed(3)})`,
    `saturate(${saturation.toFixed(3)})`,
    `contrast(${contrast.toFixed(3)})`,
  ].join(' ')
}

/**
 * Calculate the background-position-y value for the sky gradient layer.
 *
 * The sky gradient image layout (top to bottom):
 *   0%  — full night (dark navy)
 *   ~20% — upper golden hour / sunset glow
 *   ~45% — full daytime blue sky
 *
 * Scroll path for sunset:
 *   Full day   (evening=0, twilight=0) → 45%  (showing daytime blue)
 *   Golden hr  (evening=1, twilight=0) → 20%  (showing sunset glow)
 *   Full night (evening=1, twilight=1) → 0%   (showing dark navy)
 */
export function calcSkyPosition(transitions: TransitionValues): string {
  const { evening, twilight } = transitions
  const pct = lerp(lerp(45, 20, evening), 0, twilight)
  return `${pct.toFixed(1)}%`
}

/**
 * Map a celestial body's azimuth and elevation to x/y percentages within the card.
 *
 * Coordinate conventions:
 *   x: 0% = left edge, 100% = right edge (CSS left)
 *   y: CSS top percentage — 0% = top of card, 100% = bottom of card
 *
 * horizonY is expressed as % from the BOTTOM (0=bottom, 50=middle, 100=top),
 * so CSS top for the horizon = 100 - horizonY.
 *
 * maxElevation is today's peak elevation (greater of solar/lunar transit).
 * At maxElevation the body is at the very top of the card (CSS top = 0%).
 * At 0° the body is at the horizon line.
 * Negative elevation places the body below the horizon.
 *
 * @param azimuth      Body azimuth in degrees (0–360, north=0, east=90)
 * @param elevation    Body elevation in degrees (negative = below horizon)
 * @param range        Today's azimuth range (min = rise az, max = set az)
 * @param horizonY     % from bottom where 0° elevation falls (default 30)
 * @param maxElevation Peak elevation today — maps to top of card (default 60)
 */
export function celestialPosition(
  azimuth: number,
  elevation: number,
  range: AzimuthRange,
  horizonY: number = DEFAULT_HORIZON_Y,
  maxElevation: number = FALLBACK_MAX_ELEVATION
): CelestialPosition {
  const span = range.max - range.min
  const x = span > 0
    ? clamp(((azimuth - range.min) / span) * 100, -5, 105)
    : 50

  // CSS top of the horizon line
  const horizonCssTop = 100 - horizonY

  // Scale elevation linearly: 0° → horizonCssTop, maxElevation → 0%
  // Negative elevation → below horizon (cssTop > horizonCssTop)
  const y = horizonCssTop * (1 - elevation / maxElevation)

  return { x, y }
}

/**
 * Format a moon phase angle (0–360) to a zero-padded 3-digit string for image lookup.
 * e.g. 7 → "007", 159 → "159"
 */
export function formatPhaseAngle(angle: number): string {
  const clamped = clamp(Math.round(angle), 0, 360)
  return clamped.toString().padStart(3, '0')
}

/**
 * Resolve the moon phase image URL from the config template and current phase angle.
 * The config template uses {angle} as placeholder, e.g. /local/moon/phase_{angle}.png
 */
export function moonImageUrl(template: string, angle: number): string {
  return template.replace('{angle}', formatPhaseAngle(angle))
}
