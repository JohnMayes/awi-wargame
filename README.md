I wanted a fun little zero-AI project to keep me sharp, and I love hex-and-counter wargames, so here this is.

## Overview

This project implements the *Horse and Musket* rules from Neil Thomas’s *One-Hour Wargames*, converted to use hexes. The goal is to create a fun, fast-playing browser-based hex-and-counter wargame.

### Project Goals

* Have fun coding.
* Figure everything out the old fashioned way (reading docs, trial and error).
* Have a cool game that I enjoy playing at the end.

### Tech Stack

* **React-Konva**: Used for rendering the hex grid and unit counters on a canvas. Uses click events for interactivity.
* **Zustand**: State management layer.
* **honeycomb-grid**: Hex grid logic.

### Planned Features

* Hex-grid battlefield supporting movement and line-of-sight calculations.
* Counter-based units representing infantry, cavalry, artillery, etc.
* Turn-based activation, movement, and combat resolution.
* Persistent state handled via Zustand, making undo/redo and save/load features possible.
* Scenario based gameplay.
* Fog of war.
* Play-by-email for live opponents.

### Future features maybe

* AI-opponent
* Live head-to-head (Websockets? Web server?)
* Wrap with Electron for desktop (Ionic for mobile?)

### Development

```bash
npm install
npm run dev
```

And open [http://localhost:3000](http://localhost:3000) in your browser.