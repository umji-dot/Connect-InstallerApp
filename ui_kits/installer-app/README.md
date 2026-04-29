# Connect Installer — UI Kit

Pixel-accurate React/JSX recreation of the 5 core screens of the Connect Installer mobile app, derived from the source Figma `커넥트 인스톨러.fig`.

Open `index.html` to use the interactive prototype. It boots inside an iOS-style device frame and lets you click through the full installer flow:

1. **배정 작업** — Job list (assigned)
2. **작업 상세** — Job detail (memo + vehicle info + checklist)
3. **설치 메뉴얼** — Step-by-step install manual with image
4. **사진 업로드** — Photo capture / thumbnail review
5. **완료 보고** — Submit & success / error toast
6. **오프라인** — Field-resilience pattern

All component dimensions, paddings, type sizes, and colors come straight from the Figma JSX values — no inventions. Icons render through the Material Symbols Outlined CDN font, which matches the metaphors used in the source file.

## Files

| File | Purpose |
|---|---|
| `index.html` | Mounts the prototype inside an iOS frame; boots `App.jsx` |
| `App.jsx` | Top-level navigator + screen state machine |
| `tokens.js` | Color / size constants pulled from `tokens.json` |
| `Primitives.jsx` | Header, Button, Badge, Card, Input, ListRow, Toast, BottomAction, Stepper, TabBar, StatusPill |
| `JobListScreen.jsx` | 배정 작업 list |
| `JobDetailScreen.jsx` | 작업 상세 detail + checklist |
| `ManualScreen.jsx` | 설치 메뉴얼 step-by-step |
| `PhotoScreen.jsx` | 사진 업로드 thumbnail grid |
| `CompleteScreen.jsx` | 완료 보고 + toast |
| `OfflineScreen.jsx` | Offline / error pattern |

