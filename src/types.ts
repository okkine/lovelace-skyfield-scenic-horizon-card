export interface ForegroundConfig {
  id: string
  label?: string
  /**
   * Foreground image: filename relative to scene_base_path, or an absolute path starting with /.
   * Example: "Lake_Alpha.png"  →  resolved against scene_base_path
   *          "/local/myscene/Foreground.png"  →  used as-is
   */
  image: string
}

export interface SkylineCardConfig {
  type: string

  // Foreground scene definitions — only the foreground image changes between scenes
  foregrounds: ForegroundConfig[]
  active_foreground?: string

  /**
   * Base URL for all bundled scene images (sky background, stars, clouds, sun, moon phases).
   * Defaults to the HACS install location.
   * Override if you store images elsewhere.
   */
  scene_base_path?: string

  // Optional overrides for individual shared scene images.
  // Values are filenames relative to scene_base_path, or absolute paths.
  sky_background?: string
  stars_image?: string
  clouds_image?: string
  sun_image?: string
  /** Path template — use {angle} as placeholder, e.g. "moon/phase_{angle}.png" */
  moon_image_path?: string

  // Optional: Skyfield location_name prefix
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

  // Sun and moon image widths as percentage of card width
  sun_size?: number    // default 25
  moon_size?: number   // default 7

  // Fallback azimuth range when sunrise/sunset azimuth attributes are unavailable
  azimuth_min?: number
  azimuth_max?: number

  // Seasonal evening threshold elevation (degrees)
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
  /** 0 = full day, 1 = evening reached */
  evening: number
  /** 0 = day, 1 = full night */
  twilight: number
  /** 0 = no stars, 1 = full stars */
  stars: number
  /** Sky background vertical offset (pyscript circadian_sky scale) */
  sky: number
}

export interface CelestialPosition {
  /** Horizontal position as percentage of card width (0–100) */
  x: number
  /** Vertical position as percentage of card height (0–100) */
  y: number
}
