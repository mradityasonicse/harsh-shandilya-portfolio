# 🗺️ Build Roadmap — 0 → Deployed

## Phase 0 — Environment & Tooling
- Bun 1.4+ / Node.js 20+ runtime
- Vite + TypeScript compiler
- Three.js WebGL engine

## Phase 1 — Scaffolding & Dependencies
```bash
bun create vite pirate-portfolio --template react-ts
cd pirate-portfolio
bun add three lucide-react clsx tailwind-merge canvas-confetti
bun add -d @types/three @types/canvas-confetti tailwindcss @tailwindcss/vite
```

## Phase 2 — Nautical Design Tokens & Fonts
- Load Google Fonts (`Pirata One`, `Cinzel`, `IM Fell English`) in `index.html`
- Configure color tokens (`--ink-black`, `--parchment`, `--blood-red`, `--gold`, etc.) in `index.css`
- Implement custom torn-paper clip-paths and wax seal buttons

## Phase 3 — 3D Scene & Kinematic Ocean
- Implement `ThreeOceanScene.tsx` with procedural galleon ship, wave kinematics, and rising embers
- Bind mouse movement for realistic 3D parallax
- Synchronize camera position with document scroll progress ($0 \rightarrow 1$)

## Phase 4 — Procedural Web Audio Soundscape
- Synthesize ocean waves and sea wind using the native browser Web Audio API
- Add wax seal mute/unmute toggle in navigation bar

## Phase 5 — The 6 Ports of Call
- Port I: Hero Section ("Raise the Colors")
- Port II: About Section ("The Legend")
- Port III: Skills Section ("The Armory")
- Port IV: Projects Section ("The Voyages") + `TreasureModal` with confetti burst
- Port V: Experience Section ("Captain's Log")
- Port VI: Contact Section ("Message in a Bottle")

## Phase 6 — Verification & Production Deployment
- Verify strict TypeScript compilation (`tsc -b && vite build`)
- Test responsive mobile layout down to 375px
- Deploy to Vercel / Cloudflare Pages / Netlify with single-command CI/CD
