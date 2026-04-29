// Connect Installer — design tokens lifted directly from /tokens.json.
// Mirrors the JSX-derived Figma values; do not invent here.
window.CIT = {
  colors: {
    primary:     "#223240",
    primaryHover:"#162029",
    primaryDeep: "#1D2A38",
    danger:      "#D72222",
    dangerBg:    "rgba(215,34,34,0.08)",
    success:     "#62D764",
    successBg:   "rgba(98,215,100,0.10)",
    successSoft: "#F7FDF7",
    warning:     "#FFBF00",
    warningBg:   "#FFF9EB",
    info:        "#1B45D2",

    // 임시 차량 배지 전용 (PRD: 임시 등록 차량)
    tempBadge:   "#F5A332",
    tempBadgeBg: "#FFF6EA",

    n50:  "#F9F9F9",
    n100: "#F2F2F3",
    n200: "#E6E6E6",
    n300: "#E0E0E3",
    n400: "#CECED2",
    n500: "#9797A0",
    n600: "#66666F",
    n700: "#484851",
    n800: "#223240",
    n900: "#000000",
    white: "#FFFFFF",
  },
  font: {
    family: "Pretendard, -apple-system, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
    sz: { display:32, h1:24, h2:22, h3:20, bodyLg:18, body:17, bodySm:16, caption:15, micro:14 },
    w:  { reg:400, med:500, semi:600, bold:700 },
  },
  space: { 1:4, 2:8, 3:12, 4:16, 6:24, 8:32, 12:48, 16:64 },
  radius:{ sm:4, md:8, input:10, lg:12, pill:999 },
  device:{ width: 412, height: 840 },
  // Material Symbols outlined font ligatures used throughout
  icon: (name, size = 24, color) => ({
    fontFamily: "'Material Symbols Outlined'",
    fontSize: size,
    lineHeight: `${size}px`,
    color: color || "inherit",
    fontFeatureSettings: "'liga'",
    WebkitFontFeatureSettings: "'liga'",
    fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
    userSelect: "none",
  }),
};
