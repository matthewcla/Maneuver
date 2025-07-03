# Maneuver Simulator

## Overview
Maneuver is a browser-based simulator for learning radar and collision avoidance concepts.  
It displays a radar screen, lets you play/pause a simulated scenario, add or drop tracks, and show wind data or closest point of approach (CPA) information.

## Running Locally
1. Clone or download this repository.
2. Open the `Simulator/index.html` file in any modern desktop browser (Chrome, Firefox, Edge, etc.).
3. The simulator should load immediately—no server setup is required.

## Safety Disclaimer
This software is **not** a certified navigational tool. It is meant purely for educational and entertainment purposes. Do **not** rely on it for real‑world navigation or collision avoidance. Always use official, approved navigational equipment in real situations.

## Contact
Questions or feedback? Email: `AheadFlank.ai@gmail.com`

## Numeric Input UX
Mobile browsers sometimes ignore the `inputmode` hint when `type="number"` is
used. To guarantee the decimal keypad appears across phones and tablets, the
simulator injects a text input with `inputmode="decimal"` when editing numeric
fields. This keeps the interface focused on digits and a single decimal point,
improving touch‑screen usability.
