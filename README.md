# Environmental Inequalities in Swiss Cities

This project analyzes **environmental inequalities** in Switzerland’s 10 largest cities (2023), combining **high-resolution socio-economic data** and **environmental exposures** (noise, air pollution, green access) to highlight disparities across socio-economic groups.

## 📍 Study Area & Data Sources

- **Socio-economic status**: Swiss-SEP 3 index, from Panczak et al. (2023), at the building level (~50 households)
- **Environmental exposures**:
  - Road traffic noise (10m, FOEN 2025, ref. 2021)
  - NO₂ concentrations (20m, Meteotest 2021)
  - Green space access: NDVI (Copernicus 2022–2024, via GEE)
- **Additional geodata**: SwissBOUNDARIES3D & swissTLM3D (swisstopo)

All spatial extractions used **bilinear interpolation**. Maps were anonymized via **hex grids and hotspots**.

## 📊 Analytical Approach

- Households grouped by **local socio-economic quartiles** (Q1 = lowest SES)
- Environmental exposures also split into **local quartiles** (Q4 = worst exposure)
- Inequality metric: **% point difference** between Q1 and Q4 in exposure rates
- Thresholds:
  - Noise > 50 dB
  - NO₂ > 15 μg/m³
  - NDVI < 0.5 within 200m

## 📁 Project Structure

### `01_extract_raster_values.qmd`

- Imports & extracts noise, NO₂, NDVI
- Outputs: `sep_cross_noise_no2_ndvi.gpkg`

### `02_prepare_cities_analysis.qmd`

- Reclassification by quartiles
- Produces long-format summary: `cities_reclassified.gpkg`

### `03_datawrapper_final_charts.qmd`

- Charts for: disparities, scatterplots (selected cities), aggregated views
- Selected chart IDs: `iLHkd`, `rffGE`, `8ZPgH`, `qRJ8l`, `MJu0Z`, `HfB0J`, `BnMJJ`, `Qsh2p`, `3xp9e`

### `04_create_mapbox_hotspots.qmd`

- Creates anonymized hotspots per city & indicator
- Exports: `hotspots_*_final.geojson`

### `05_prepare_mapbox_utilities.qmd`

- Prepares Mapbox-ready layers:
  - SES hexagons (`hex_aggregated_ses.geojson`)
  - City boundaries (`cities.geojson`)
  - Centroids (`city_centroids_mapbox.csv`)
  - Raster tiles per city & indicator

## 📚 References

- Panczak et al. (2012): [Swiss-SEP](https://smw.ch/index.php/smw/article/view/3285)
- FOEN (2025): [Traffic Noise](https://www.bafu.admin.ch/bafu/de/home/themen/laerm/publikationen-studien/publikationen/laermbelastung-in-der-schweiz-sonbase.html)
- FOEN (2021): [NO₂ Maps](https://www.bafu.admin.ch/bafu/en/home/topics/air/luftbelastung/data/historical-data/maps-of-annual-values.html)
