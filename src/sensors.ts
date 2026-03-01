import type { HomeAssistant } from 'custom-card-helpers'
import { DOMAIN, SENSOR_NAMES, DEFAULT_AZIMUTH_MIN, DEFAULT_AZIMUTH_MAX } from './constants'
import type { SkylineCardConfig, ResolvedEntities } from './types'

/**
 * Build the default entity ID for a sensor given an optional location_name prefix.
 * e.g. location_name="calgary" → sensor.skyfield_test_calgary_solar_elevation
 *      location_name=undefined  → sensor.skyfield_test_solar_elevation
 */
function defaultEntityId(sensorKey: keyof typeof SENSOR_NAMES, locationName?: string): string {
  const name = SENSOR_NAMES[sensorKey]
  const prefix = locationName ? `${locationName.toLowerCase().replace(/\s+/g, '_')}_` : ''
  return `sensor.${DOMAIN}_${prefix}${name}`
}

/** Resolve all entity IDs from config, falling back to defaults */
export function resolveEntities(config: SkylineCardConfig): ResolvedEntities {
  const loc = config.location_name
  return {
    sunElevation: config.sun_elevation_entity ?? defaultEntityId('sunElevation', loc),
    sunAzimuth: config.sun_azimuth_entity ?? defaultEntityId('sunAzimuth', loc),
    moonElevation: config.moon_elevation_entity ?? defaultEntityId('moonElevation', loc),
    moonAzimuth: config.moon_azimuth_entity ?? defaultEntityId('moonAzimuth', loc),
    moonPhaseAngle: config.moon_phase_angle_entity ?? defaultEntityId('moonPhaseAngle', loc),
    moonParallacticAngle: config.moon_parallactic_angle_entity ?? defaultEntityId('moonParallacticAngle', loc),
    sunrise: config.sunrise_entity ?? defaultEntityId('sunrise', loc),
    sunset: config.sunset_entity ?? defaultEntityId('sunset', loc),
    declinationNormalized: config.declination_normalized_entity ?? defaultEntityId('declinationNormalized', loc),
  }
}

/** Safely read a numeric sensor state, returning a fallback on failure */
export function getNumericState(hass: HomeAssistant, entityId: string, fallback: number): number {
  const state = hass.states[entityId]
  if (!state) return fallback
  const value = parseFloat(state.state)
  return isNaN(value) ? fallback : value
}

/** Safely read a numeric attribute, returning a fallback on failure */
export function getNumericAttribute(
  hass: HomeAssistant,
  entityId: string,
  attribute: string,
  fallback: number
): number {
  const state = hass.states[entityId]
  if (!state) return fallback
  const value = parseFloat(state.attributes[attribute])
  return isNaN(value) ? fallback : value
}

export interface AzimuthRange {
  min: number
  max: number
}

/**
 * Determine the azimuth range for the current day.
 * Reads azimuth attributes from sunrise/sunset sensors if available;
 * otherwise falls back to config values or the built-in defaults.
 */
export function getAzimuthRange(
  hass: HomeAssistant,
  entities: ResolvedEntities,
  config: SkylineCardConfig
): AzimuthRange {
  const riseAz = getNumericAttribute(hass, entities.sunrise, 'rise_azimuth', NaN)
  const setAz = getNumericAttribute(hass, entities.sunset, 'set_azimuth', NaN)

  if (!isNaN(riseAz) && !isNaN(setAz) && riseAz < setAz) {
    return { min: riseAz, max: setAz }
  }

  return {
    min: config.azimuth_min ?? DEFAULT_AZIMUTH_MIN,
    max: config.azimuth_max ?? DEFAULT_AZIMUTH_MAX,
  }
}

/**
 * Return all sensor values needed to render the card in a single call.
 */
export function readSensors(
  hass: HomeAssistant,
  entities: ResolvedEntities,
  config: SkylineCardConfig
) {
  const azRange = getAzimuthRange(hass, entities, config)

  return {
    sunElevation: getNumericState(hass, entities.sunElevation, 0),
    sunAzimuth: getNumericState(hass, entities.sunAzimuth, azRange.min + (azRange.max - azRange.min) / 2),
    moonElevation: getNumericState(hass, entities.moonElevation, -30),
    moonAzimuth: getNumericState(hass, entities.moonAzimuth, azRange.min),
    moonPhaseAngle: getNumericState(hass, entities.moonPhaseAngle, 0),
    moonParallacticAngle: getNumericState(hass, entities.moonParallacticAngle, 0),
    declinationNormalized: getNumericState(hass, entities.declinationNormalized, 0.5),
    azimuthRange: azRange,
  }
}
