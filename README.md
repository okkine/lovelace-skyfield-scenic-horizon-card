# Skyfield Scenic Horizon Card

A Home Assistant Lovelace card that displays a scenic day/night landscape, with the sun and moon positioned according to your [Skyfield](https://github.com/your-username/Ha-Skyfield) integration sensors. The card transitions smoothly through golden hour, twilight, and night using CSS filters — no separate Photoshop overlays or pyscript helpers required.

---

## Prerequisites

- **[Skyfield integration](https://github.com/your-username/Ha-Skyfield)** installed and configured with at minimum:
  - Sun body enabled with azimuth/elevation sensors
  - Moon body enabled with azimuth/elevation, phase angle, and parallactic angle sensors
- Your scene images uploaded to your Home Assistant `www/` folder
- 360 moon phase images named `phase_000.png` through `phase_360.png`

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

Place your images in your Home Assistant `www/` folder (e.g. `www/pictures/`).
They will be accessible at `/local/pictures/`.

Recommended folder structure:

```
www/
  pictures/
    backgrounds/
      Lake_Sky_Background5.png
      Lake_Sky_Stars.png
      Lake_Sky_Clouds.png
      Lake_Alpha.png
    sun-48190c.png
    moon/
      phase_000.png
      phase_001.png
      ...
      phase_360.png
```

---

## Configuration

### Minimal example

```yaml
type: custom:skyfield-scenic-horizon-card
sun_image: /local/pictures/sun-48190c.png
moon_image_path: /local/pictures/moon/phase_{angle}.png
foregrounds:
  - id: lake
    label: Lake
    background: /local/pictures/backgrounds/Lake_Sky_Background5.png
    stars: /local/pictures/backgrounds/Lake_Sky_Stars.png
    clouds: /local/pictures/backgrounds/Lake_Sky_Clouds.png
    foreground: /local/pictures/backgrounds/Lake_Alpha.png
```

### Full example

```yaml
type: custom:skyfield-scenic-horizon-card
sun_image: /local/pictures/sun-48190c.png
moon_image_path: /local/pictures/moon/phase_{angle}.png

# Active scene (must match an id in foregrounds)
active_foreground: lake

foregrounds:
  - id: lake
    label: Lake Scene
    background: /local/pictures/backgrounds/Lake_Sky_Background5.png
    stars: /local/pictures/backgrounds/Lake_Sky_Stars.png
    clouds: /local/pictures/backgrounds/Lake_Sky_Clouds.png
    foreground: /local/pictures/backgrounds/Lake_Alpha.png

# Optional: if your Skyfield entry has a location_name set (e.g. "Calgary"),
# sensor IDs will be prefixed accordingly.
# location_name: calgary

# Optional: override individual entity IDs
# sun_elevation_entity: sensor.skyfield_test_solar_elevation
# sun_azimuth_entity: sensor.skyfield_test_solar_azimuth
# moon_elevation_entity: sensor.skyfield_test_lunar_elevation
# moon_azimuth_entity: sensor.skyfield_test_lunar_azimuth
# moon_phase_angle_entity: sensor.skyfield_test_lunar_phase_angle
# moon_parallactic_angle_entity: sensor.skyfield_test_lunar_parallactic_angle
# sunrise_entity: sensor.skyfield_test_sunrise
# sunset_entity: sensor.skyfield_test_sunset
# declination_normalized_entity: sensor.skyfield_test_solar_declination_normalized

# Horizon position: % from top where 0° elevation falls (default: 55)
horizon_y: 55

# Azimuth range fallback when sunrise/sunset azimuth attributes are not available
azimuth_min: 60
azimuth_max: 300

# Seasonal evening threshold (degrees elevation)
evening_elev_summer: 15
evening_elev_winter: 10
```

### Config reference

| Option | Type | Default | Description |
|---|---|---|---|
| `foregrounds` | list | required | Scene image definitions |
| `active_foreground` | string | first entry | `id` of the foreground to display |
| `sun_image` | string | required | Path to sun image |
| `moon_image_path` | string | required | Path template with `{angle}` placeholder |
| `location_name` | string | — | Skyfield `location_name` for sensor ID prefix |
| `horizon_y` | number | `55` | % from top where elevation = 0° |
| `azimuth_min` | number | `60` | Fallback left-edge azimuth |
| `azimuth_max` | number | `300` | Fallback right-edge azimuth |
| `evening_elev_summer` | number | `15` | Sun elevation (°) where evening starts at summer solstice |
| `evening_elev_winter` | number | `10` | Sun elevation (°) where evening starts at winter solstice |

Each `foregrounds` entry:

| Option | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Unique identifier |
| `label` | string | No | Display label |
| `background` | string | Yes | Sky gradient image |
| `stars` | string | Yes | Stars overlay image |
| `clouds` | string | Yes | Clouds overlay image |
| `foreground` | string | Yes | Foreground scene image |

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
