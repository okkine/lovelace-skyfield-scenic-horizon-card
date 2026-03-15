import type { HomeAssistant } from 'custom-card-helpers'
import {
  DOMAIN,
  SENSOR_NAMES,
  DEFAULT_AZIMUTH_MIN,
  DEFAULT_AZIMUTH_MAX,
  FALLBACK_MAX_ELEVATION,
} from './constants'
import type { SkylineCardConfig, ResolvedEntities } from './types'

/**
 * Build the default entity ID for a sensor given an optional location_name prefix.
 * e.g. location_name="calgary" → sensor.sol_calgary_sun_elevation
 *      location_name=undefined  → sensor.sol_sun_elevation
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
    moonrise: config.moonrise_entity ?? defaultEntityId('moonrise', loc),
    moonset: config.moonset_entity ?? defaultEntityId('moonset', loc),
    sunTransit: config.sun_transit_entity ?? defaultEntityId('sunTransit', loc),
    moonTransit: config.moon_transit_entity ?? defaultEntityId('moonTransit', loc),
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

/** Safely read a sensor state as a string, returning null on failure */
function getStringState(hass: HomeAssistant, entityId: string): string | null {
  const state = hass.states[entityId]
  if (!state || !state.state) return null
  return state.state
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
 * Uses the wider of the sun and moon rise/set azimuths so both bodies
 * fit within the horizontal span of the card.
 * Falls back to config values or built-in defaults if attributes are absent.
 */
export function getAzimuthRange(
  hass: HomeAssistant,
  entities: ResolvedEntities,
  config: SkylineCardConfig
): AzimuthRange {
  const sunRiseAz  = getNumericAttribute(hass, entities.sunrise,  'rise_azimuth', NaN)
  const sunSetAz   = getNumericAttribute(hass, entities.sunset,   'set_azimuth',  NaN)
  const moonRiseAz = getNumericAttribute(hass, entities.moonrise, 'rise_azimuth', NaN)
  const moonSetAz  = getNumericAttribute(hass, entities.moonset,  'set_azimuth',  NaN)

  const hasSun  = !isNaN(sunRiseAz) && !isNaN(sunSetAz)

  // If moonset occurs before moonrise on the same calendar day, the set event
  // happened before tonight's rise — the moon's arc hasn't started yet.
  // Exclude the moon from range calculation to avoid an inverted/backwards arc.
  const moonRiseTime = getStringState(hass, entities.moonrise)
  const moonSetTime  = getStringState(hass, entities.moonset)
  const moonSetBeforeRise = (moonRiseTime !== null && moonSetTime !== null)
    ? new Date(moonSetTime) < new Date(moonRiseTime)
    : false

  const hasMoon = !isNaN(moonRiseAz) && !isNaN(moonSetAz) && !moonSetBeforeRise

  if (hasSun || hasMoon) {
    const candidates = [
      hasSun  ? sunRiseAz  : Infinity,
      hasMoon ? moonRiseAz : Infinity,
    ]
    const minAz = Math.min(...candidates)

    const candidatesMax = [
      hasSun  ? sunSetAz  : -Infinity,
      hasMoon ? moonSetAz : -Infinity,
    ]
    const maxAz = Math.max(...candidatesMax)

    if (minAz < maxAz) {
      return { min: minAz, max: maxAz }
    }
  }

  return {
    min: config.azimuth_min ?? DEFAULT_AZIMUTH_MIN,
    max: config.azimuth_max ?? DEFAULT_AZIMUTH_MAX,
  }
}

/**
 * Return all sensor values needed to render the card in a single call.
 * maxElevation is the greater of today's solar and lunar transit elevations,
 * used to scale the vertical position of both bodies on the card.
 */
export function readSensors(
  hass: HomeAssistant,
  entities: ResolvedEntities,
  config: SkylineCardConfig
) {
  const azRange = getAzimuthRange(hass, entities, config)

  const sunTransitElevation  = getNumericAttribute(hass, entities.sunTransit,  'transit_elevation', NaN)
  const moonTransitElevation = getNumericAttribute(hass, entities.moonTransit, 'transit_elevation', NaN)

  const candidates = [
    !isNaN(sunTransitElevation)  ? sunTransitElevation  : -Infinity,
    !isNaN(moonTransitElevation) ? moonTransitElevation : -Infinity,
  ]
  const maxElevation = Math.max(...candidates)

  return {
    sunElevation:        getNumericState(hass, entities.sunElevation,  0),
    sunAzimuth:          getNumericState(hass, entities.sunAzimuth,    azRange.min + (azRange.max - azRange.min) / 2),
    moonElevation:       getNumericState(hass, entities.moonElevation, -30),
    moonAzimuth:         getNumericState(hass, entities.moonAzimuth,   azRange.min),
    moonPhaseAngle:      getNumericState(hass, entities.moonPhaseAngle, 0),
    moonParallacticAngle:getNumericState(hass, entities.moonParallacticAngle, 0),
    declinationNormalized: getNumericState(hass, entities.declinationNormalized, 0.5),
    azimuthRange: azRange,
    maxElevation: maxElevation > 0 ? maxElevation : FALLBACK_MAX_ELEVATION,
  }
}
