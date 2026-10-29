# 🎨 Design System — "The Developer's Pearl"

## 1. Brand & Mood
- **Feel:** Aged, cursed, cinematic. Moonlit ocean + fire + old maps.
- **Keywords:** parchment, ink, ember, fog, brass, bone, blood-red
- **Poster cues:** burnt black edges, parchment banners, deep red headings, fire-orange glow at bottom, skull & compass motifs.

## 2. Color Tokens (CSS Variables)
| Token | Hex | Use |
| :--- | :--- | :--- |
| `--ink-black` | `#0b0906` | Page background (aged black) |
| `--charcoal` | `#171310` | Cards, panels, ship hull |
| `--parchment` | `#d8c49a` | Parchment banners, cards, headings |
| `--parchment-dark` | `#b39b6d` | Secondary text on parchment |
| `--blood-red` | `#a01d12` | Main accent (title red, wax seals) |
| `--ember` | `#ff7a1a` | Glows, hover, fire light, particles |
| `--gold` | `#c9a227` | Compass, borders, highlights, medals |
| `--bone` | `#e8dcc0` | Body text on dark backgrounds |
| `--sea` | `#0a1a1f` | Ocean water shader base color |

## 3. Typography
- **Display / Headings:** `Pirata One` (pirate-style display)
- **Sub-headings / Labels:** `Cinzel` (engraved, cinematic serif)
- **Body:** `IM Fell English` (antique handwritten book ink feel)

## 4. Textures & Ornaments
- **Parchment Texture:** Radial noise + linear fiber lines
- **Torn Edges:** Ragged polygon `clip-path` simulating torn antique paper
- **Burnt Border:** Inset vignette box-shadow + ember fire glow
- **Ornaments:** Compass rose SVG, wax-seal buttons with hover ember glow, skull bullet badges

## 5. Core Components
- `ParchmentCard`: Aged parchment bg, torn clip-path, ink text, slight tilt (-0.8deg)
- `WaxSealButton`: Red seal circle with inset bevel, hover ember glow + scale 1.05
- `SectionBanner`: Parchment ribbon with Pirata One heading & side swallowtails
- `CompassCursor`: Custom brass compass ring, magnetic needle, spins on click
- `TreasureModal`: Gold doubloon confetti explosion on project inspection
- `AudioEngine`: Procedural Web Audio synthesizer (surf, wind, timber creaks)

## 6. Narrative Port of Call Structure
- **Hero:** "Raise the Colors" (3D ship + ocean + moon + voyage intro)
- **About:** "The Legend" (Parchment treasure map, bio, stats)
- **Skills:** "The Armory" (Broadsides, ironclad oak, navigational brass, cursed blades)
- **Projects:** "The Voyages" (Archipelago island pins with coordinates & bounties)
- **Experience:** "Captain's Log" (Dated weathered journal timeline)
- **Contact:** "A Message in a Bottle" (Interactive corked bottle & scrolled letter)
