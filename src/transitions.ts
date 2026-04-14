import {
  ELEVATION,
  DEFAULT_HORIZON_Y,
  FALLBACK_MAX_ELEVATION,
} from './constants'
import type { TransitionValues, CelestialPosition } from './types'
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
  _declinationNormalized: number,
  _config: unknown
): TransitionValues {
  // evening: 0 = full day (sun at or above 6°), 1 = sun at horizon (0°)
  // Fixed range 6° → 0°; no seasonal shift.
  const evening = normalize(sunElevation, ELEVATION.GOLDEN_HOUR_START, ELEVATION.TWILIGHT_START)

  // circadian_twilight: 0 = sun at horizon (0°), 1 = full night (−12°)
  const twilight = normalize(sunElevation, ELEVATION.TWILIGHT_START, ELEVATION.TWILIGHT_END)

  // Stars: appear between twilight 0.5 (−6°) and 1 (−12°), curved with x^0.6
  // so they emerge quickly early in nautical twilight then ease to full opacity
  const stars = Math.pow(clamp((twilight - 0.5) * 2, 0, 1), 1 / 0.6)

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

  // x^0.6 on evening (day→golden hour) and on twilight (0°→-12°, single ramp).
  const eveC  = Math.pow(evening,  0.6)
  const twilC = Math.pow(twilight, 0.6)

  // Foreground starts at whatever golden-hour level was reached, then ramps to night.
  const brightDay    = 1.0
  const brightGolden = 0.85
  const satGolden    = 1.3
  const satNight     = 0.70
  const contrastGolden = 1.1

  const brightness = lerp(lerp(brightDay, brightGolden, eveC), brightNight,   twilC)
  const saturation = lerp(lerp(1.0,       satGolden,    eveC), satNight,      twilC)
  const contrast   = lerp(lerp(1.0,       contrastGolden, eveC), contrastNight, twilC)

  return [
    `brightness(${brightness.toFixed(3)})`,
    `saturate(${saturation.toFixed(3)})`,
    `contrast(${contrast.toFixed(3)})`,
  ].join(' ')
}

/** Interpolate between two RGB colour stops and return a CSS rgb() string. */
function lerpColor(
  c1: readonly [number, number, number],
  c2: readonly [number, number, number],
  t: number
): string {
  const r = Math.round(lerp(c1[0], c2[0], t))
  const g = Math.round(lerp(c1[1], c2[1], t))
  const b = Math.round(lerp(c1[2], c2[2], t))
  return `rgb(${r},${g},${b})`
}

/**
 * Sky colour key-stops for each transition stage.
 * Two stops: zenith (top, 0%) and bottom (40% down the card).
 * The gradient is solid below 40%.
 */
const SKY: Record<string, readonly [number, number, number]> = {
  /**
  dayTop:          [ 80, 200, 250],  // light cyan-sky blue at zenith
  dayMid:          [140, 225, 230],  // light blue-green at midpoint
  dayBottom:       [200, 250, 210],  // extrapolated pale aqua at bottom

  goldenTop:       [205,  85,  50],  // bright warm orange-red at zenith
  goldenMid:       [238, 155, 110],  // light peach at midpoint
  goldenBottom:    [255, 225, 170],  // extrapolated pale warm yellow at bottom

  civilTop:        [ 30,  15,  70],  // deep indigo at zenith
  civilMid:        [ 88,  42, 128],  // vivid purple at midpoint
  civilBottom:     [146,  69, 186],  // extrapolated lighter purple at bottom

  nightTop:        [  8,  10,  40],  // near-black navy at zenith
  nightMid:        [ 12,  15,  50],  // very dark navy at midpoint
  nightBottom:     [ 16,  20,  60],  // extrapolated slightly lighter navy at bottom
  */
  dayTop:       [ 80, 200, 250],  // light cyan-sky blue at zenith
  dayBottom:    [140, 225, 230],  // light blue-green at 40%

  goldenTop:    [ 80, 200, 250],  // zenith at golden hour
  goldenBottom: [238, 155, 110],  // warm peach at 40%

  civilTop:     [ 12,  28,  65],  // deep indigo at zenith
  civilBottom:  [238,  102,  12],  // vivid orange-red at 40%

  nightTop:     [ 12,  28,  65],  // near-black navy at zenith
  nightBottom:  [ 12,  28,  80],  // flat night at 40%

}

/**
 * Compute a CSS linear-gradient string for the sky layer from current transitions.
 *
 * Progression:
 *   Day           (evening=0, twilight=0) → blue sky top, light-blue horizon
 *   Golden hour   (evening=1, twilight=0) → dark purple top, warm-orange horizon
 *   Civil twilight (twilight 0→0.5)       → lerp toward dark navy / mauve
 *   Night          (twilight 0.5→1)       → deep flat navy
 */
export function calcSkyGradient(transitions: TransitionValues): { top: string; bottom: string } {
  const { evening, twilight } = transitions
  // x^0.6 curve on evening so the sky colour shifts quickly early in golden hour
  const eveC = Math.pow(evening, 0.6)
  let top: string
  let bottom: string

  if (twilight === 0) {
    top    = lerpColor(SKY.dayTop,    SKY.goldenTop,    eveC)
    bottom = lerpColor(SKY.dayBottom, SKY.goldenBottom, eveC)
  } else if (twilight < 0.5) {
    const t = twilight * 2
    top    = lerpColor(SKY.goldenTop,    SKY.civilTop,    t)
    bottom = lerpColor(SKY.goldenBottom, SKY.civilBottom, t)
  } else {
    const t = (twilight - 0.5) * 2
    top    = lerpColor(SKY.civilTop,    SKY.nightTop,    t)
    bottom = lerpColor(SKY.civilBottom, SKY.nightBottom, t)
  }

  return { top, bottom }
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
 * @param maxElevation Peak elevation today — maps to top inset (default 60)
 * @param bodyHeightPct Body height as % of card height (for top-edge kissing)
 */
export function celestialPosition(
  azimuth: number,
  elevation: number,
  range: AzimuthRange,
  horizonY: number = DEFAULT_HORIZON_Y,
  maxElevation: number = FALLBACK_MAX_ELEVATION,
  bodyHeightPct: number = 0
): CelestialPosition {
  const span = range.max - range.min
  const x = span > 0
    ? clamp(((azimuth - range.min) / span) * 100, -5, 105)
    : 50

  // CSS top of the horizon line
  const horizonCssTop = 100 - horizonY

  // Keep transit at the top without clipping by mapping maxElevation to
  // half the body's rendered height from the top edge.
  const topInset = Math.max(0, bodyHeightPct / 2)

  // Leave a small top headroom so peak transit does not clip, and clamp the
  // normalized ratio so brief sensor overshoot cannot push above topInset.
  const effectiveMaxElevation = maxElevation * 1
  const elevationRatio = clamp(elevation / effectiveMaxElevation, -10, 1)

  // Scale elevation linearly: 0° → horizonCssTop, effectiveMaxElevation → topInset.
  // Negative elevation naturally places the body below the horizon.
  const y = horizonCssTop - elevationRatio * (horizonCssTop - topInset)

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
