# Polar Grid Manual Test Checklist

## Canvas Sizes
- **600x600 px**
  - Rings and radial lines scale to fit.
  - Cardinal labels appear just outside outer ring.
  - No numeric range labels present.
- **1024x1024 px**
  - Grid maintains proportions; labels remain readable.

## Interactions
- Resizing the browser triggers a one-time rebuild of the static grid.
- Toggling radar range updates ring spacing without extra radial lines.
- Dynamic items (targets, vectors) draw normally after grid update.

