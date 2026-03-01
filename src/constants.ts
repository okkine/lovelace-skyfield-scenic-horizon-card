export const CARD_TYPE = 'skyfield-scenic-horizon-card'
export const CARD_NAME = 'Skyfield Scenic Horizon Card'
export const CARD_DESCRIPTION =
  'Scenic day/night landscape card driven by Skyfield sun and moon sensors.'

export const DOMAIN = 'skyfield_test'

/** Sensor name segments used to build default entity IDs */
export const SENSOR_NAMES = {
  sunElevation: 'solar_elevation',
  sunAzimuth: 'solar_azimuth',
  moonElevation: 'lunar_elevation',
  moonAzimuth: 'lunar_azimuth',
  moonPhaseAngle: 'lunar_phase_angle',
  moonParallacticAngle: 'lunar_parallactic_angle',
  sunrise: 'sunrise',
  sunset: 'sunset',
  declinationNormalized: 'solar_declination_normalized',
} as const

/**
 * Default azimuth range when sunrise/sunset azimuth attributes are not available.
 * Approximate annual range for mid-latitudes (Calgary ~51°N).
 */
export const DEFAULT_AZIMUTH_MIN = 60
export const DEFAULT_AZIMUTH_MAX = 300

/** Default percentage from top at which 0° elevation is drawn */
export const DEFAULT_HORIZON_Y = 55

/** Maximum visible elevation drawn at the top of the sky area (%) */
export const MAX_ELEVATION_DEG = 70

/**
 * Sun elevation thresholds that define transition stages (degrees).
 * These match the pyscript circadian_evening / circadian_twilight boundaries.
 */
export const ELEVATION = {
  GOLDEN_HOUR_START: 6,   // above this → full day
  GOLDEN_HOUR_END: -1,    // evening transition zone: +EVENING_DAY down to this
  TWILIGHT_START: 0,      // civil twilight begins
  TWILIGHT_END: -12,      // nautical twilight end → full night
  STARS_HALF: -6,         // stars begin appearing at half-twilight
} as const

/** Default evening threshold elevations (seasonal – pyscript circadian_evening_day) */
export const EVENING_ELEV_SUMMER = 15  // degrees, near summer solstice
export const EVENING_ELEV_WINTER = 10  // degrees, near winter solstice

/** CSS transition duration applied to all animated layer properties */
export const CSS_TRANSITION_DURATION = '60s'
