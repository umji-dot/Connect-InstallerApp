// Connect Installer — primitive UI components. Plain JSX, no JSX imports;
// loaded as window globals so other Babel scripts can use them.
const { useState } = React;
const T = window.CIT;

// ---- Icon -----------------------------------------------------------------
function Icon({ name, size = 24, color, style }) {
  return (
    <span aria-hidden="true" style={{ ...T.icon(name, size, color), ...style }}>
      {name}
    </span>
  );
}

// ---- Header --------------------------------------------------------------
function Header({ title, onBack, showBack = true }) {
  return (
    <div style={{
      height: 56,
      background: T.colors.primaryDeep,
      color: T.colors.white,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      flexShrink: 0,
    }}>
      {showBack && (
        <button onClick={onBack} aria-label="뒤로" style={{
          position: "absolute", left: 12, top: 0, bottom: 0,
          width: 44, background: "transparent", border: 0, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", padding: 0,
        }}>
          <Icon name="arrow_back" size={24} />
        </button>
      )}
      <div style={{ fontWeight: T.font.w.bold, fontSize: T.font.sz.h3, lineHeight: 1 }}>
        {title}
      </div>
    </div>
  );
}

// ---- Button --------------------------------------------------------------
function Button({
  variant = "primary",  // primary | secondary | outline | danger | inactive
  size = "large",       // large 56 | medium 40
  icon,
  children,
  fullWidth,
  disabled,
  onClick,
  style,
}) {
  const isLg = size === "large";
  const padX = isLg ? 24 : 16;
  const h = isLg ? 56 : 40;
  const radius = isLg ? T.radius.lg : T.radius.md;
  const fs = isLg ? T.font.sz.body : T.font.sz.caption;
  const isDisabled = disabled || variant === "inactive";

  let bg, fg, border = "none";
  if (isDisabled) { bg = T.colors.n300; fg = T.colors.n500; }
  else if (variant === "primary")   { bg = T.colors.primary;  fg = T.colors.white; }
  else if (variant === "secondary") { bg = T.colors.n300;     fg = T.colors.n600;  }
  else if (variant === "outline")   { bg = T.colors.white;    fg = T.colors.primary; border = `1px solid ${T.colors.primary}`; }
  else if (variant === "danger")    { bg = T.colors.danger;   fg = T.colors.white; }

  return (
    <button
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      style={{
        height: h,
        minWidth: h,
        padding: `0 ${padX}px`,
        borderRadius: radius,
        background: bg,
        color: fg,
        border,
        fontFamily: T.font.family,
        fontWeight: T.font.w.bold,
        fontSize: fs,
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: isLg ? 8 : 4,
        cursor: isDisabled ? "default" : "pointer",
        flexShrink: 0,
        width: fullWidth ? "100%" : undefined,
        transition: "filter .15s ease",
        ...style,
      }}
      onMouseDown={e => { if (!isDisabled) e.currentTarget.style.filter = "brightness(0.92)"; }}
      onMouseUp={e => { e.currentTarget.style.filter = "none"; }}
      onMouseLeave={e => { e.currentTarget.style.filter = "none"; }}
    >
      {icon && <Icon name={icon} size={isLg ? 24 : 20} color={fg} />}
      {children}
    </button>
  );
}

// ---- Badge (job-type pill) ----------------------------------------------
// Badge color spec — Figma design system 기준 (Property1OBD/AS/설치/탈거 등)
const BADGE_TONES = {
  // 기본 그레이 톤 — 단말기 모드
  "OBD":      { bg: T.colors.n100,    fg: T.colors.n700 },
  "Non-OBD":  { bg: T.colors.n100,    fg: T.colors.n700 },
  // 작업 종류
  "설치":     { bg: T.colors.info,        fg: T.colors.white },   // rgb(27,69,210)
  "AS":       { bg: "rgb(214,113,31)",    fg: T.colors.white },   // 오렌지
  "탈거":     { bg: "rgb(255,238,238)",   fg: T.colors.danger },  // 연한 분홍 + danger
  "임시":     { bg: T.colors.tempBadgeBg, fg: T.colors.tempBadge },
};

function Badge({ children }) {
  const tone = BADGE_TONES[children] || { bg: T.colors.n100, fg: T.colors.n700 };
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      height: 33,
      padding: "0 12px",
      borderRadius: T.radius.pill,
      background: tone.bg,
      color: tone.fg,
      fontWeight: T.font.w.bold,
      fontSize: T.font.sz.micro,
      lineHeight: 1,
    }}>{children}</span>
  );
}

// ---- Card ----------------------------------------------------------------
function Card({ children, tone = "default", style }) {
  let bg = T.colors.white, border = `1px solid ${T.colors.n300}`;
  if (tone === "memo")   { bg = T.colors.warningBg; border = `1px solid ${T.colors.warning}`; }
  if (tone === "ok")     { bg = T.colors.successSoft; border = `1px solid ${T.colors.success}`; }
  return (
    <div style={{
      background: bg,
      border,
      borderRadius: T.radius.lg,
      padding: 16,
      ...style,
    }}>{children}</div>
  );
}

// ---- Info row (label + value, with divider) -----------------------------
function InfoRow({ label, value, valueWeight = "regular", onRight }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      minHeight: 33,
    }}>
      <span style={{ fontSize: T.font.sz.bodySm, color: T.colors.n600 }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{
          fontSize: valueWeight === "big" ? T.font.sz.h2 : T.font.sz.bodySm,
          fontWeight: valueWeight === "big" ? T.font.w.bold : (valueWeight === "medium" ? T.font.w.med : T.font.w.reg),
          color: T.colors.n900,
        }}>{value}</span>
        {onRight}
      </div>
    </div>
  );
}
function Divider() { return <div style={{ height: 1, background: T.colors.n100, margin: "6px 0" }} />; }

// ---- Input ---------------------------------------------------------------
function Field({ label, required, error, helper, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {label && (
        <div style={{ fontSize: T.font.sz.micro, color: T.colors.n600, display: "flex", gap: 2 }}>
          <span>{label}</span>
          {required && <span style={{ color: T.colors.danger }}>*</span>}
        </div>
      )}
      {children}
      {error && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, color: T.colors.danger }}>
          <Icon name="error" size={20} color={T.colors.danger} />
          <span style={{ fontWeight: T.font.w.bold, fontSize: T.font.sz.micro }}>{error}</span>
        </div>
      )}
      {helper && !error && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, color: T.colors.n500 }}>
          <Icon name="help" size={20} color={T.colors.n500} />
          <span style={{ fontWeight: T.font.w.bold, fontSize: T.font.sz.micro }}>{helper}</span>
        </div>
      )}
    </div>
  );
}
function TextInput({ value, placeholder, error, onChange, type = "text", trailingIcon }) {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? T.colors.danger : (focused ? T.colors.primary : T.colors.n300);
  return (
    <div style={{
      height: 48,
      borderRadius: T.radius.input,
      background: T.colors.white,
      border: `1px solid ${borderColor}`,
      padding: "0 16px",
      display: "flex", alignItems: "center", gap: 8,
    }}>
      <input
        type={type}
        value={value || ""}
        placeholder={placeholder || "입력해 주세요"}
        onChange={e => onChange && onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1, height: "100%", border: 0, outline: 0, background: "transparent",
          fontFamily: T.font.family, fontSize: T.font.sz.bodySm,
          color: T.colors.n900,
        }}
      />
      {trailingIcon && <Icon name={trailingIcon} size={24} color={T.colors.n500} />}
    </div>
  );
}

// ---- ListRow (checklist item) -------------------------------------------
function ListRow({ title, status = "wait", onClick }) {
  // status: wait | progress | complete | incomplete
  let right;
  if (status === "wait")        right = <span style={{ color: T.colors.n500, fontWeight: T.font.w.bold, fontSize: T.font.sz.body }}>대기</span>;
  if (status === "progress")    right = <span style={{ color: T.colors.n500, fontWeight: T.font.w.bold, fontSize: T.font.sz.caption }}>진행중...</span>;
  if (status === "complete")    right = (
    <div style={{ display: "flex", alignItems: "center", gap: 4, color: T.colors.success }}>
      <span style={{ fontWeight: T.font.w.bold, fontSize: T.font.sz.body }}>완료</span>
      <Icon name="check_circle" size={24} color={T.colors.success} />
    </div>
  );
  if (status === "incomplete")  right = (
    <div style={{ display: "flex", alignItems: "center", gap: 4, color: T.colors.n500 }}>
      <span style={{ fontWeight: T.font.w.bold, fontSize: T.font.sz.body }}>미완료</span>
      <Icon name="arrow_forward_ios" size={20} color={T.colors.n500} />
    </div>
  );

  const isDone = status === "complete";
  return (
    <button
      onClick={onClick}
      style={{
        all: "unset",
        cursor: onClick ? "pointer" : "default",
        boxSizing: "border-box",
        width: "100%", minHeight: 64,
        padding: "16px",
        background: isDone ? T.colors.successSoft : T.colors.white,
        border: `1px solid ${isDone ? T.colors.success : T.colors.n300}`,
        borderRadius: T.radius.lg,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}
    >
      <span style={{ fontWeight: T.font.w.bold, fontSize: T.font.sz.body, color: T.colors.n900 }}>{title}</span>
      {right}
    </button>
  );
}

// ---- Toast ---------------------------------------------------------------
function Toast({ tone = "success", title, body }) {
  const c = tone === "error" ? T.colors.danger : T.colors.success;
  const bg = tone === "error" ? T.colors.dangerBg : T.colors.successBg;
  const icon = tone === "error" ? "error" : "check_circle";
  return (
    <div style={{
      borderRadius: T.radius.lg,
      background: bg,
      border: `1px solid ${c}`,
      backdropFilter: "blur(4px)",
      padding: 16,
      display: "flex", gap: 12, alignItems: "center",
    }}>
      <Icon name={icon} size={32} color={c} />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ fontWeight: T.font.w.bold, fontSize: T.font.sz.body, color: T.colors.n900 }}>{title}</div>
        {body && <div style={{ fontSize: T.font.sz.caption, color: T.colors.n900, lineHeight: 1.5 }}>{body}</div>}
      </div>
    </div>
  );
}

// ---- BottomAction (sticky) -----------------------------------------------
function BottomAction({ children }) {
  return (
    <div style={{
      flexShrink: 0,
      height: 80,
      background: T.colors.white,
      borderTop: `1px solid ${T.colors.n300}`,
      padding: "0 20px",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    }}>{children}</div>
  );
}

// ---- Stepper (progress segments) ----------------------------------------
function Stepper({ total, current }) {
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 8, borderRadius: 4,
          background: i < current ? T.colors.primary : T.colors.n300,
          transition: "background .2s ease",
        }} />
      ))}
    </div>
  );
}

// ---- Tab bar -------------------------------------------------------------
function TabBar({ active, onChange }) {
  const tabs = [
    { id: "jobs",    label: "배정 작업", icon: "build" },
    { id: "history", label: "이력",      icon: "history" },
  ];
  return (
    <div style={{
      flexShrink: 0,
      height: 70,
      background: T.colors.white,
      borderTop: `1px solid ${T.colors.n300}`,
      display: "flex",
    }}>
      {tabs.map(t => {
        const sel = t.id === active;
        const c = sel ? T.colors.primaryDeep : T.colors.n500;
        return (
          <button key={t.id} onClick={() => onChange && onChange(t.id)} style={{
            all: "unset",
            cursor: "pointer",
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 4,
          }}>
            <Icon name={t.icon} size={24} color={c} />
            <span style={{ fontWeight: T.font.w.bold, fontSize: T.font.sz.body, color: c }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// =========================================================================
// v5.5 신규 컴포넌트 — Modal, InlineBanner, LoadingSpinner, PhotoSlot,
//                     RadioOption, ActionSheet
// =========================================================================
// Hard Rules 준수: 본문 16px+, 터치 56px+, 토큰만 사용, 텍스트 라벨 동반
// 14px 예외: Status Badge / PhotoSlot 슬롯 번호만 허용 (SKILL.md 갱신 예정)

// ---- Modal --------------------------------------------------------------
// Props:
//   open, title, body,
//   imagePlaceholder (boolean, default false) — placeholder 박스 사용
//   imageState (string?) — 예: "빨간 동그라미 1번 점멸"
//   imageUrl (string?) — 실제 이미지 URL (있으면 우선)
//   variant ("info"|"error"|"confirm"),
//   buttons [{label, variant, onClick}], onDismiss
function Modal({ open, title, body, imagePlaceholder = false, imageState,
                 imageUrl, variant = "info", buttons = [], onDismiss }) {
  if (!open) return null;
  const allowBackdropDismiss = variant === "info" && onDismiss;
  const accent =
    variant === "error" ? T.colors.danger :
    variant === "confirm" ? T.colors.primary :
    T.colors.info;
  const showImage = imagePlaceholder || imageUrl;
  return (
    <div
      onClick={allowBackdropDismiss ? onDismiss : undefined}
      style={{
        position: "absolute", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 360,
          background: T.colors.white,
          borderRadius: T.radius.lg,
          padding: 24,
          display: "flex", flexDirection: "column", gap: 16,
          boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
          maxHeight: "80vh",
        }}>
        <div style={{
          height: 4, width: 32, borderRadius: 2,
          background: accent, flexShrink: 0,
        }} />
        <div style={{
          fontWeight: T.font.w.bold,
          fontSize: T.font.sz.h3,
          color: T.colors.n900,
          lineHeight: 1.35,
        }}>{title}</div>
        <div style={{
          flex: "1 1 auto",
          overflowY: "auto",
          fontSize: T.font.sz.bodySm,
          color: T.colors.n900,
          lineHeight: 1.6,
          whiteSpace: "pre-line",
        }}>{body}</div>
        {showImage && (
          <div style={{
            background: T.colors.n100,
            borderRadius: T.radius.md,
            border: `1px solid ${T.colors.n300}`,
            padding: 12,
            display: "flex", alignItems: "center", justifyContent: "center",
            minHeight: 120,
          }}>
            {imageUrl
              ? <img src={imageUrl} alt={imageState || ""}
                  style={{ maxWidth: "100%", maxHeight: 180, borderRadius: T.radius.sm }}/>
              : (
                <div style={{ display: "flex", flexDirection: "column",
                  alignItems: "center", gap: 8, color: T.colors.n600 }}>
                  <Icon name="developer_board" size={36} color={T.colors.n500} />
                  <span style={{ fontSize: T.font.sz.bodySm,
                    fontWeight: T.font.w.bold, color: T.colors.n800 }}>단말기 LED</span>
                  {imageState && (
                    <span style={{ fontSize: T.font.sz.micro,
                      color: T.colors.n600 }}>{imageState}</span>
                  )}
                </div>
              )
            }
          </div>
        )}
        <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
          {buttons.map((b, i) => (
            <Button key={i}
              variant={b.variant || "primary"}
              size="large"
              fullWidth={buttons.length === 1}
              style={{ flex: buttons.length > 1 ? 1 : undefined }}
              onClick={b.onClick}>
              {b.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- InlineBanner -------------------------------------------------------
// Props: tone ("info"|"warning"|"neutral"), title?, body, icon?,
//        dismissible (default false), onDismiss?
function InlineBanner({ tone = "info", title, body, icon,
                         dismissible = false, onDismiss }) {
  let bg, border, fg, defaultIcon;
  if (tone === "warning") {
    bg = T.colors.warningBg; border = T.colors.warning;
    fg = T.colors.n900; defaultIcon = "warning";
  } else if (tone === "neutral") {
    bg = T.colors.n100; border = T.colors.n300;
    fg = T.colors.n700; defaultIcon = "info";
  } else {
    bg = "rgba(27,69,210,0.06)"; border = T.colors.info;
    fg = T.colors.n900; defaultIcon = "info";
  }
  return (
    <div style={{
      background: bg,
      border: `1px solid ${border}`,
      borderRadius: T.radius.lg,
      padding: 16,
      display: "flex", alignItems: "flex-start", gap: 12,
    }}>
      <Icon name={icon || defaultIcon} size={24}
        color={tone === "warning" ? T.colors.warning :
               tone === "info" ? T.colors.info : T.colors.n600} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        {title && (
          <div style={{ fontWeight: T.font.w.bold,
            fontSize: T.font.sz.bodySm, color: fg, lineHeight: 1.4 }}>{title}</div>
        )}
        <div style={{ fontSize: T.font.sz.bodySm,
          color: fg, lineHeight: 1.6, whiteSpace: "pre-line" }}>{body}</div>
      </div>
      {dismissible && (
        <button onClick={onDismiss} aria-label="닫기" style={{
          all: "unset", cursor: "pointer",
          width: 56, height: 56, marginRight: -12, marginTop: -12,
          marginBottom: -12, borderRadius: T.radius.sm,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: T.colors.n500, flexShrink: 0,
        }}>
          <Icon name="close" size={20} color={T.colors.n500} />
        </button>
      )}
    </div>
  );
}

// ---- LoadingSpinner -----------------------------------------------------
// Props: size ("sm"|"md"|"lg"), label?, color?
// 의존성: colors_and_type.css의 @keyframes citspin
function LoadingSpinner({ size = "md", label, color }) {
  const px = size === "sm" ? 20 : size === "lg" ? 48 : 32;
  const stroke = size === "sm" ? 2 : size === "lg" ? 4 : 3;
  const c = color || T.colors.primary;
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 12,
    }}>
      <svg width={px} height={px} viewBox="0 0 24 24"
        style={{ animation: "citspin 1s linear infinite", flexShrink: 0 }}>
        <circle cx="12" cy="12" r="10" fill="none"
          stroke={T.colors.n200} strokeWidth={stroke} />
        <path d="M12 2 a10 10 0 0 1 10 10" fill="none"
          stroke={c} strokeWidth={stroke} strokeLinecap="round" />
      </svg>
      {label && (
        <span style={{
          fontSize: T.font.sz.bodySm,
          fontWeight: T.font.w.med,
          color: T.colors.n700,
          lineHeight: 1.5,
        }}>{label}</span>
      )}
    </div>
  );
}

// ---- ActionSheet (PhotoSlot 보조용 + 일반 사용 가능) -------------------
// Props: open, title?, actions [{label, icon?, tone?("default"|"danger"), onClick}],
//        onDismiss
function ActionSheet({ open, title, actions = [], onDismiss }) {
  if (!open) return null;
  return (
    <div onClick={onDismiss} style={{
      position: "absolute", inset: 0, zIndex: 220,
      background: "rgba(0,0,0,0.4)",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", background: T.colors.white,
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
        padding: 12, paddingBottom: 24,
        display: "flex", flexDirection: "column", gap: 4,
      }}>
        <div style={{
          width: 36, height: 4, borderRadius: 2,
          background: T.colors.n300, alignSelf: "center", margin: "4px 0 8px",
        }} />
        {title && (
          <div style={{
            fontSize: T.font.sz.micro, color: T.colors.n600,
            fontWeight: T.font.w.bold, padding: "8px 16px 4px",
          }}>{title}</div>
        )}
        {actions.map((a, i) => (
          <button key={i} onClick={() => { a.onClick && a.onClick(); onDismiss && onDismiss(); }}
            style={{
              all: "unset", cursor: "pointer",
              minHeight: 56, padding: "0 16px",
              borderRadius: T.radius.md,
              display: "flex", alignItems: "center", gap: 12,
              fontSize: T.font.sz.bodySm,
              fontWeight: T.font.w.bold,
              color: a.tone === "danger" ? T.colors.danger : T.colors.n900,
            }}>
            {a.icon && <Icon name={a.icon} size={24}
              color={a.tone === "danger" ? T.colors.danger : T.colors.n700} />}
            <span>{a.label}</span>
          </button>
        ))}
        <button onClick={onDismiss} style={{
          all: "unset", cursor: "pointer",
          minHeight: 56, marginTop: 8,
          borderRadius: T.radius.md,
          background: T.colors.n100,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: T.font.sz.bodySm,
          fontWeight: T.font.w.bold,
          color: T.colors.n800,
        }}>닫기</button>
      </div>
    </div>
  );
}

// ---- PhotoSlot ----------------------------------------------------------
// Props:
//   index (1~5), filled, imageUrl?, thumbnailColor?,
//   cameraOnly (default true),
//   onCapture, onSlotTap (filled=true 시 액션 시트 트리거)
// 주: 재촬영/삭제는 onSlotTap 안에서 ActionSheet로 호출 (Hard Rule §2 준수)
function PhotoSlot({ index, filled, imageUrl, thumbnailColor,
                      cameraOnly = true, onCapture, onSlotTap }) {
  const bg = filled
    ? (imageUrl ? `url(${imageUrl}) center/cover no-repeat`
       : (thumbnailColor || `linear-gradient(135deg, hsl(${200 + index * 25} 30% 60%), hsl(${220 + index * 25} 30% 40%))`))
    : T.colors.white;
  return (
    <button
      onClick={filled ? onSlotTap : onCapture}
      aria-label={filled ? `사진 ${index} 옵션` : `사진 ${index} 촬영하기`}
      style={{
        all: "unset", cursor: "pointer",
        boxSizing: "border-box",
        aspectRatio: "1",
        background: bg,
        border: `2px solid ${filled ? T.colors.primary : T.colors.n300}`,
        borderRadius: T.radius.lg,
        position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}>
      {/* 슬롯 번호 (14px 예외) */}
      <div style={{
        position: "absolute", top: 8, left: 8,
        padding: "4px 8px", borderRadius: T.radius.sm,
        background: filled ? "rgba(0,0,0,0.55)" : T.colors.n100,
        color: filled ? "#fff" : T.colors.n700,
        fontSize: T.font.sz.micro,
        fontWeight: T.font.w.bold,
        zIndex: 2,
      }}>{index}</div>

      {!filled && (
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 8,
          padding: 12,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: T.colors.primary,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <Icon name="photo_camera" size={28} color="#fff" />
          </div>
          <span style={{ fontSize: T.font.sz.bodySm,
            fontWeight: T.font.w.bold, color: T.colors.n800 }}>촬영하기</span>
        </div>
      )}

      {filled && (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "flex-end", justifyContent: "flex-end",
          padding: 8,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "rgba(0,0,0,0.55)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon name="more_horiz" size={20} color="#fff" />
          </div>
        </div>
      )}
    </button>
  );
}

// PhotoSlotAdd — 5개 미만일 때 표시되는 + 슬롯
function PhotoSlotAdd({ onAdd }) {
  return (
    <button onClick={onAdd} style={{
      all: "unset", cursor: "pointer",
      boxSizing: "border-box",
      aspectRatio: "1",
      border: `2px dashed ${T.colors.n400}`,
      borderRadius: T.radius.lg,
      background: T.colors.n50,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 8,
      color: T.colors.n600,
    }}>
      <Icon name="add_a_photo" size={36} color={T.colors.n500} />
      <span style={{ fontSize: T.font.sz.bodySm,
        fontWeight: T.font.w.bold, color: T.colors.n700 }}>사진 추가</span>
    </button>
  );
}

// ---- RadioOption / RadioGroup -------------------------------------------
// Props: selected, label, description?, onSelect
// border 2px 통일 — 레이아웃 시프트 방지
function RadioOption({ selected, label, description, onSelect }) {
  return (
    <button onClick={onSelect} style={{
      all: "unset", cursor: "pointer",
      boxSizing: "border-box",
      width: "100%", minHeight: 64,
      padding: "12px 16px",
      background: selected ? "rgba(34,50,64,0.04)" : T.colors.white,
      border: `2px solid ${selected ? T.colors.primary : T.colors.n300}`,
      borderRadius: T.radius.lg,
      display: "flex", alignItems: "center", gap: 12,
    }}>
      <div style={{
        width: 24, height: 24, borderRadius: "50%",
        border: `2px solid ${selected ? T.colors.primary : T.colors.n400}`,
        background: T.colors.white,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        {selected && (
          <div style={{
            width: 12, height: 12, borderRadius: "50%",
            background: T.colors.primary,
          }} />
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2,
        flex: 1, minWidth: 0 }}>
        <span style={{
          fontSize: T.font.sz.bodySm,
          fontWeight: T.font.w.bold,
          color: T.colors.n900,
        }}>{label}</span>
        {description && (
          <span style={{
            fontSize: T.font.sz.micro,
            color: T.colors.n600, lineHeight: 1.5,
          }}>{description}</span>
        )}
      </div>
    </button>
  );
}

function RadioGroup({ value, options, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {options.map(o => (
        <RadioOption
          key={o.value}
          selected={value === o.value}
          label={o.label}
          description={o.description}
          onSelect={() => onChange && onChange(o.value)}
        />
      ))}
    </div>
  );
}

// expose globally so other Babel scripts can grab them
Object.assign(window, {
  Icon, Header, Button, Badge, Card, InfoRow, Divider, Field, TextInput,
  ListRow, Toast, BottomAction, Stepper, TabBar,
  // v5.5 additions
  Modal, InlineBanner, LoadingSpinner, ActionSheet,
  PhotoSlot, PhotoSlotAdd, RadioOption, RadioGroup,
});
