export interface ForegroundConfig {
  id: string
  label?: string
  background: string
  stars: string
  clouds: string
  foreground: string
}

export interface SkylineCardConfig {
  type: string

  // Foreground scene definitions
  foregrounds: ForegroundConfig[]
  active_foreground?: string

  // Sun image
  sun_image: string

  // Moon phase images - use {angle} as placeholder, e.g. /local/moon/phase_{angle}.png
  moon_image_path: string

  // Optional: Skyfield location_name prefix (e.g. "calgary" if sensors are named
  // sensor.skyfield_test_calgary_solar_elevation). Leave unset for default (no prefix).
  location_name?: string

  // Optional: override individual entity IDs
  sun_elevation_entity?: string
  sun_azimuth_entity?: string
  moon_elevation_entity?: string
  moon_azimuth_entity?: string
  moon_phase_angle_entity?: string
  moon_parallactic_angle_entity?: string
  sunrise_entity?: string
  sunset_entity?: string
  declination_normalized_entity?: string

  // Horizon position: percentage from top where 0° elevation falls (default 55)
  horizon_y?: number

  // Fallback azimuth range when sunrise/sunset azimuth attributes are unavailable
  azimuth_min?: number
  azimuth_max?: number

  // Seasonal evening threshold override range (degrees elevation)
  // Defaults: evening_elev_summer=15, evening_elev_winter=10
  evening_elev_summer?: number
  evening_elev_winter?: number
}

export interface ResolvedEntities {
  sunElevation: string
  sunAzimuth: string
  moonElevation: string
  moonAzimuth: string
  moonPhaseAngle: string
  moonParallacticAngle: string
  sunrise: string
  sunset: string
  declinationNormalized: string
}

export interface TransitionValues {
  /** 0 = evening/night, 1 = full day */
  evening: number
  /** 0 = day, 1 = full night */
  twilight: number
  /** 0 = no stars, 1 = full stars */
  stars: number
  /** 0–1 combined sky offset factor */
  sky: number
}

export interface CelestialPosition {
  /** Horizontal position as percentage of card width (0–100) */
  x: number
  /** Vertical position as percentage of card height (0–100) */
  y: number
}
