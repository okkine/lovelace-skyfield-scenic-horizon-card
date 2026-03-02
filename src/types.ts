export interface SkylineCardConfig {
  type: string

  /**
   * Which foreground scene to show (1-based). Default 1.
   * More foregrounds can be added to the card bundle later.
   */
  foreground?: number

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
  moonrise_entity?: string
  moonset_entity?: string
  sun_transit_entity?: string
  moon_transit_entity?: string
  declination_normalized_entity?: string

  /**
   * Horizon position: percentage from the BOTTOM of the card where 0° elevation falls.
   * 0 = bottom edge, 50 = middle, 100 = top edge. Default 30.
   */
  horizon_y?: number

  // Sun and moon image widths as percentage of card width
  sun_size?: number    // default 25
  moon_size?: number   // default 7

  // Fallback azimuth range when rise/set azimuth attributes are unavailable
  azimuth_min?: number
  azimuth_max?: number

  // Seasonal evening threshold elevation (degrees)
  evening_elev_summer?: number
  evening_elev_winter?: number

  /** Minimum brightness at full night (0–1). Default 0.20 */
  min_brightness?: number
  /** Maximum contrast at full night. Default 1.8 */
  max_contrast?: number
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
  moonrise: string
  moonset: string
  sunTransit: string
  moonTransit: string
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
  /** Vertical position as CSS top percentage (0 = top of card, 100 = bottom) */
  y: number
}
