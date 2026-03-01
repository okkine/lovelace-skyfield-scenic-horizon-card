# Skyfield Scenic Horizon Card

A Home Assistant Lovelace card that displays a scenic day/night landscape, with the sun and moon positioned according to your [Skyfield](https://github.com/your-username/Ha-Skyfield) integration sensors. The card transitions smoothly through golden hour, twilight, and night using CSS filters — no separate Photoshop overlays or pyscript helpers required.

---

## Prerequisites

- **[Skyfield integration](https://github.com/your-username/Ha-Skyfield)** installed and configured with at minimum:
  - Sun body enabled with azimuth/elevation sensors
  - Moon body enabled with azimuth/elevation, phase angle, and parallactic angle sensors

---

## Installation via HACS

1. In Home Assistant, go to **HACS → Frontend**.
2. Click the three-dot menu → **Custom repositories**.
3. Add `https://github.com/your-username/lovelace-skyfield-scenic-horizon-card` as a **Dashboard** type.
4. Install **Skyfield Scenic Horizon Card**.
5. Clear your browser cache and reload.

---

## Skyfield Sensor Setup

Enable the required sensors in the Skyfield integration config:

| Sensor | Config option | Required |
|---|---|---|
| Sun azimuth | `sun_enable_az_el: true` | Yes |
| Sun elevation | `sun_enable_az_el: true` | Yes |
| Moon azimuth | `moon_enable_az_el: true` | Yes |
| Moon elevation | `moon_enable_az_el: true` | Yes |
| Moon phase angle | `moon_enable_phase_angle: true` | Yes |
| Moon parallactic angle | `moon_enable_parallactic_angle: true` | Yes |
| Solar declination normalized | `enable_declination_normalized: true` | Recommended |
| Sunrise / Sunset | `sun_enable_rise_set: true` | Recommended (for seasonal azimuth range) |
| Moonrise / Moonset | `moon_enable_rise_set: true` | Recommended |

### Sunrise/sunset azimuth attributes (optional, improves seasonal accuracy)

If you add an `azimuth` attribute to your sunrise and sunset sensors in the Skyfield integration,
the card will automatically use those to determine the sun's visible arc for the current day,
adapting to seasonal variation. Without them, the card uses the `azimuth_min` / `azimuth_max`
config values.

---

## Image Setup

All images (sky, stars, clouds, sun, moon phases, and foreground scenes) are bundled with the card and installed by HACS. Users do not configure or name any images. Foregrounds are selected by number (1, 2, …); default is foreground 1. Additional foregrounds can be added to the bundle and to `FOREGROUND_IMAGES` in the card source when available.

---

## Configuration

### Zero config

```yaml
type: custom:skyfield-scenic-horizon-card
```

Uses foreground 1 (default). All images come from the bundle.

### Optional: choose foreground

```yaml
type: custom:skyfield-scenic-horizon-card
foreground: 1
```

Use `foreground: 2` (or 3, …) when more foreground scenes are added to the bundle.

### Optional: advanced overrides

```yaml
type: custom:skyfield-scenic-horizon-card
foreground: 1

# location_name: calgary
# horizon_y: 55
# sun_size: 25
# moon_size: 7
# azimuth_min: 60
# azimuth_max: 300
# evening_elev_summer: 15
# evening_elev_winter: 10
# (+ entity ID overrides if needed)
```

### Config reference

| Option | Type | Default | Description |
|---|---|---|---|
| `foreground` | number | `1` | Which foreground scene (1-based). More can be added to the bundle later. |
| `location_name` | string | — | Skyfield `location_name` for sensor ID prefix |
| `horizon_y` | number | `55` | % from top where elevation = 0° |
| `sun_size` | number | `25` | Sun image width as % of card width |
| `moon_size` | number | `7` | Moon image width as % of card width |
| `azimuth_min` | number | `60` | Fallback left-edge azimuth |
| `azimuth_max` | number | `300` | Fallback right-edge azimuth |
| `evening_elev_summer` | number | `15` | Sun elevation (°) where evening starts at summer solstice |
| `evening_elev_winter` | number | `10` | Sun elevation (°) where evening starts at winter solstice |

Entity ID overrides (optional): `sun_elevation_entity`, `sun_azimuth_entity`, `moon_elevation_entity`, `moon_azimuth_entity`, `moon_phase_angle_entity`, `moon_parallactic_angle_entity`, `sunrise_entity`, `sunset_entity`, `declination_normalized_entity`.

---

## Building from source

```bash
# Install Node.js 20+ and enable corepack
corepack enable

# Install dependencies
npm install

# Build
npm run build

# Watch mode (development)
npm run dev
```

The compiled file is written to `dist/skyfield-scenic-horizon-card.js`.

---

## Day/Night transition stages

| Stage | Sun elevation | Visual effect |
|---|---|---|
| Daytime | above ~10–15° | Full brightness, natural colours |
| Golden hour | +10° → 0° | Warm tint, slightly reduced brightness |
| Civil twilight | 0° → −6° | Cool blue-grey, dimmed, stars begin |
| Nautical twilight | −6° → −12° | Deep blue, stars prominent |
| Night | below −12° | Near-black, full star opacity |

The exact golden-hour threshold varies seasonally using the `solar_declination_normalized` sensor
(or the `evening_elev_summer` / `evening_elev_winter` config values if that sensor is unavailable).
