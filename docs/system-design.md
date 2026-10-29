# ⚙️ System Design — The Developer's Pearl

## 1. High-Level Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                       BROWSER VIEWPORT                      │
│                                                             │
│   ┌───────────────────────┐     ┌───────────────────────┐   │
│   │    HTML / UI LAYER    │     │  FIXED THREE.JS WEBGL │   │
│   │  (Parchment, Cards,   │     │ (Ocean, 3D Galleon,   │   │
│   │   Timeline, Forms)    │     │  Embers, Fog, Moon)   │   │
│   └──────────┬────────────┘     └───────────▲───────────┘   │
│              │                              │               │
│              ▼                              │               │
│      Scroll Progress (0 to 1) ──────────────┘               │
│      + Mouse Coordinates (X, Y)                             │
└─────────────────────────────────────────────────────────────┘
```

**Key Architectural Decision:**
A single fixed fullscreen `<canvas>` is rendered behind the HTML content layer. As the user scrolls through the ports of call, the scroll offset normalizes into `scrollProgress` ($0.0 \rightarrow 1.0$), driving continuous 3D camera trajectory paths, wave dynamics, and lighting transitions without multiple WebGL context switches.

## 2. Component Pipeline
- **Canvas Director (`ThreeOceanScene`):**
  - Ambient + Moon directional light (`0xd4e5ff`) + Sunset horizon light (`0xff6a00`)
  - Flickering ship stern lantern (`PointLight`, intensity modulated by high-frequency sine/cosine)
  - Procedural Black Pearl Galleon: Keel, bow, poop deck, illuminated captain's windows, 3 masts, curved billowing sails, and Jolly Roger flag
  - Buoyancy Kinematics: Real-time pitch, yaw, and roll synchronized to sinusoidal wave equations
  - 180+ Rising Ember Particles with additive blending and upward velocity
  - Damped camera navigation following the ship along the voyage
- **Procedural Soundscape (`AudioEngine`):**
  - Native Web Audio API implementation
  - Bandpass-filtered brown/pink noise generator with an 8-second LFO swell
  - Resonant sea breeze synthesis
  - Zero external MP3 downloads required
- **Custom Compass Cursor (`CustomCursor`):**
  - Brass cardinal ring (N, S, E, W) with dual-point magnetic needle
  - Smooth lerp motion tracking with dynamic spin on click

## 3. Performance Budget & Metrics
- **Target FPS:** 60 FPS on mobile, 120 FPS on high-refresh desktop
- **Bundle Size:** ~223 kB gzipped total JS (including Three.js, Lucide, and Canvas Confetti)
- **Initial Load Time:** < 500ms
- **Memory Footprint:** < 45 MB GPU VRAM
- **Accessibility:** 100% semantic HTML, screen-reader safe, prefers-reduced-motion respected
