# Connect Installer Design System

> **커넥트 현장서비스 인스톨러 디자인 시스템** — design system for the Connect Installer mobile app, used by field installation technicians ("설치 기사") to manage assigned work, follow installation manuals, capture photos, and report results from the field.

## Product context

**Connect Installer** is a Korean‑language Android/iOS app for blue‑collar field technicians who install vehicle telematics / OBD hardware. The screens in the source Figma cover the technician's full daily flow:

- **배정 작업** — list of jobs assigned to the installer (customer, address, phone, OBD/Non‑OBD type, install/AS/탈거/임시 sub‑type)
- **작업 상세** — job detail with operations memo, vehicle info, checklist of sub‑tasks ("차량 DB 설치", "패킷 유효성 체크", "시동잠금 테스트")
- **설치 메뉴얼** — step‑by‑step installation manual (paged, with reference photos)
- **사진 촬영/업로드** — photo capture + thumbnail review (license plate, OBD port, etc.)
- **완료 보고 / 이력** — completion report and job history

### Primary persona

| | |
|---|---|
| Age | 40–50 |
| Gender | Predominantly male |
| Role | Field installation technician (blue‑collar, hands‑on) |
| Environment | Outdoor + indoor sites · bright sunlight or dark parking garages · gloves likely · one‑hand operation common |
| Digital fluency | Low‑to‑mid · prefers explicit text labels over abstract icons · low tolerance for nested modals or chrome |

### Design pillars

1. **Readability first.** Body min 16 px, key data 18–20 px, titles 22 px+. Bold/SemiBold used liberally. Line‑height ≥ 1.5. Never gray‑on‑gray.
2. **Big touch targets.** Buttons / rows ≥ 56 px tall (cozy 64 px). 12 px gap minimum between adjacent targets.
3. **One primary action per screen.** Icons always paired with a text label; no icon‑only navigation.
4. **No decoration.** Almost no shadows, no gradients, no blur (except a single 4 px backdrop on toasts). Animations strictly functional, ≤ 200 ms (예외: SKILL.md §6 — 무한 진행 표시).
5. **Field‑resilient.** Light + dark mode. Status is always color **+** text **+** icon (color‑blind safe). Errors say what's wrong AND how to fix it.

## Sources used

- **Figma file** — `커넥트 인스톨러.fig` (mounted virtual filesystem). 1 page, 40 top‑level frames; 112 local components. Top fonts/colors/components extracted to `METADATA.md` of the Figma.
- **Uploaded font files** — Pretendard (Light → Black, OTF). Stored in `fonts/`.

The Figma is the single source of truth for component shapes, dimensions, padding, and exact color values. All tokens below were derived directly from the JSX pseudocode reconstructed from the binary.

## Index

| File / folder | Purpose |
|---|---|
| `README.md` | This file — context, fundamentals, foundations, iconography, index |
| `SKILL.md` | Cross‑compatible Agent Skill manifest |
| `colors_and_type.css` | All CSS custom properties: color tokens, type scale, spacing, radii, elevation, dark mode |
| `tokens.json` | Same tokens in JSON form for tooling |
| `fonts/` | Pretendard font files (Light, Regular, Medium, SemiBold, Bold, ExtraBold, Black) |
| `assets/icons/` | SVG icons copied from Figma (search, error, help, imagesmode, delete) |
| `assets/images/` | Reference photos used in the install manual |
| `preview/` | Per‑token / per‑component preview cards rendered in the Design System tab |
| `ui_kits/installer-app/` | Pixel‑accurate React/JSX recreation of the 6 core installer screens — `index.html` boots an iPhone 15 frame with side nav |
| `SKILL.md` (root) | Cross‑compatible Agent Skill manifest, ready for Claude Code |

## Content fundamentals

The product copy is **direct, terse, and operational** — written for someone who needs to know *what to do next* while standing at a customer's car. Examples found in source:

- Page titles: **"배정 작업"**, **"작업 상세"**, **"설치 메뉴얼"** — 2–4 character action nouns.
- Section labels: **"운영팀 메모"**, **"차량 번호"**, **"차종"**, **"OBD"**, **"AS"**, **"탈거"**, **"임시"** — single concept per label.
- Status: **"진행중..."**, **"완료"**, **"미완료"** — 2–3 syllables, present tense.
- Messages mix imperative ("아래 버튼을 눌러 시동잠금 테스트를 진행하세요") with neutral status ("패킷 유효성 체크 완료" / "패킷 유효성 체크 실패").
- Operations memos read like radio chatter: **"강남 지역 주차 주의. 지하 2층 주차장 진입 필요."**
- Empty states are factual, not friendly: **"등록된 이미지가 없습니다"** ("No registered images.") — not "이미지를 추가해 보세요!".

**Tone & formality**

- Korean honorifics use **‑요/‑세요** polite form for instructions ("진행하세요"), but informational copy drops particles to stay tight ("운영팀 메모", not "운영팀의 메모입니다").
- No first/second person — the app addresses the task, not the user.
- **No emoji**, no exclamation marks, no friendly emoji‑style microcopy. The brand voice is *trustworthy field tool*, not *consumer app*.
- English used freely for technical nouns in their accepted Korean‑industry form: **OBD**, **Non‑OBD**, **AS**, **CarDB**, **YYYY‑MM‑DD**.
- Numbers and IDs are unembellished: **"004499"**, **"010‑1234‑5678"**, **"서울특별시 강남구 논현동 123"**.

## Visual foundations

### Color

Two anchors — **deep navy `#223240`** (and its slightly darker pair `#1D2A38` for header bars) for primary actions and headings, and **pure white `#FFFFFF`** for surfaces. Everything else is greyscale. The four semantic colors are saturated but used **only** for state:

| Role | Hex | Used for |
|---|---|---|
| Primary | `#223240` | Primary buttons, body text, header bg variant |
| Header bg | `#1D2A38` | Top app‑bar background |
| Danger | `#D72222` | Destructive buttons, error toasts/borders, required `*` |
| Success | `#62D764` | Completed badge/border, success toasts, valid checks |
| Warning | `#FFBF00` | Operations memo card border (pale `#FFF9EB` fill) |
| Info | `#1B45D2` | Informational links (rare) |
| Page | `#F9F9F9` | App background |
| Border | `#E0E0E3` | Default card / input border |

Cards on the soft grey page use a **1 px solid border** rather than a shadow — this is a defining trait of the system: every "card" is white + 12 px radius + 1 px `#E0E0E3` border, no elevation. Shadow tokens exist but are used essentially nowhere.

### Type

**Pretendard** is the only family. Four weights in active use: Regular 400, Medium 500, SemiBold 600, Bold 700. Bold is used aggressively — every button label, every page title, every status word, every section heading is Bold. Body copy and label copy is Regular. There is no italic, no all‑caps, no letter‑spacing tweaking.

Sizes cluster tightly:

- 22 px Bold — page titles
- 20 px Bold — header bar title
- 18 px Regular — sub‑titles, primary readouts
- 17 px Bold — list rows, large button labels, status text
- 16 px Regular — input text, body copy, info rows
- 15 px Bold / Regular — secondary info, item rows, helper (※ SKILL.md §1 적용 검토 중. 신규 컴포넌트에 임의 추가 금지)
- 14 px Regular / Bold — SKILL.md §1 화이트리스트 항목만 허용 (Status Badge / PhotoSlot 슬롯 번호 / InlineBanner 보조 텍스트 / RadioOption description)

Line height is **100%** (`1.0`) on button labels and tight chips, **1.5** on body and multiline content.

### Spacing & rhythm

Strict 4 px base. The values that actually appear in the Figma: **4, 8, 12, 16, 24, 32, 48, 64**. Most cards use **16 px** internal padding. Header bar is 56 px tall. Bottom action bar is 80 px tall with 20 px horizontal padding. Cards stack with **8 px** gap.

### Radii

Three sizes used: **4 px** (chip outlines, dividers), **8 px** (medium buttons / inputs ~10 px), **12 px** (cards, large buttons). Pills/badges use **999 px** (full round). No 2 px, no 16 px, no 24 px radius anywhere.

### Backgrounds

Solid colors only. **No gradients. No background images**, except for one reference photo on the install manual page (a flat photo inside a 12 px‑rounded container). **No textures, no patterns, no illustrations.**

### Animation & feedback

- Animations are **functional only**: button press dim, status badge fade in, toast slide‑in.
- Duration ≤ 200 ms (예외: SKILL.md §6 — 무한 진행 표시). No spring, no bounce. Linear or ease‑out only.
- No shimmer, no skeleton flourishes — loading shows a "진행중..." text plus LoadingSpinner (SKILL.md §6 예외 1번).

### States

- **Hover** — desktop is not a target environment, but for prototype rendering we darken primary buttons to `#162029`.
- **Press** — primary buttons dim to ~85% opacity; outline buttons fill with the neutral‑100 chip background.
- **Disabled** — gray `#9797A0` text on `#E0E0E3` fill, no border.
- **Focus** — 2 px primary‑navy outline, offset 2 px, on inputs and buttons.
- **Selected (tab bar)** — text + icon switch from `#979FA3` (silver) to `#1D2A38` (deep primary). No underline, no pill.

### Borders, shadows, transparency

- Borders **always 1 px**. No 2 px, no thick.
- Shadows essentially **unused**. Tokens defined for `elev-1` (0 1 2 6%) and `elev-2` (0 4 12 8%) in case needed; the design itself does not show drop shadows on cards.
- Transparency used only on toast fills (`success` 10%, `error` 10%) with a subtle 4 px `backdrop-filter` blur. Everywhere else colors are flat opaque.

### Layout rules

- Mobile design width is **412 px** (Pixel 5 / iPhone 14 viewport).
- Top: fixed 56 px header (`#1D2A38`, white title centered, white back arrow at left 20 px).
- Bottom: fixed 80 px bottom action bar (white, 1 px top border `#E4E4E7`, 20 px side padding).
- Tab bar (when used): 4 tabs, each 70 px tall.
- Content scroll region: page bg `#F9F9F9`, 16–24 px side gutter.

## Iconography

The Figma uses a **Material Symbols** vocabulary — all icons in the source are clearly drawn from Google's Material Symbols set (filled / rounded variants, 24 px on a 24 px canvas). Identifiable: `arrow_back`, `arrow_drop_down`, `arrow_forward_ios`, `build` (wrench), `calendar_today`, `call_end`, `check_circle`, `content_copy`, `delete`, `error`, `help`, `imagesmode`, `key`, `lock`, `memo`, `search`.

A handful of these were extracted from the Figma as raw SVGs and live in `assets/icons/` (search, error, help, imagesmode, delete). For the rest, the UI kit and previews use the **Material Symbols Outlined** webfont via Google Fonts CDN — same metaphors, same metrics, free to use, and visually consistent with the source.

> **Substitution flag:** the Figma did not embed the full Material icon font. We render via the official Material Symbols CDN. If your production app uses a different fork of Material (e.g. Material Symbols *Rounded*), swap the CDN class to match. The five SVGs we did extract (`assets/icons/`) take precedence wherever they're referenced.

**Rules — strictly enforced by this system:**

- Icons are **24 px** in standard contexts, **20 px** in medium buttons, **32 px** in toasts.
- Icons appear in three forms only: (a) leading + label, (b) trailing + label, (c) icon‑only on small utility buttons (delete in image grid, calendar trailing affordance). Bottom nav icons always have text below them.
- Icon color follows text color of the row it sits in — not its own brand color.
- **No emoji** anywhere in the UI.
- No unicode pictographs as icons (no ★, no ✓, no ▶ — `check_circle` is always the SVG/font glyph).
- No hand‑drawn / illustrative icons. No 3D renders. No gradient‑filled icons.
