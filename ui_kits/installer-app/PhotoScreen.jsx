// 사진 업로드 — capture/preview thumbnail screen
const T = window.CIT;

const SLOTS = [
  { id: "s1", label: "OBD 단자 연결" },
  { id: "s2", label: "본체 LED 점등" },
  { id: "s3", label: "케이블 정리" },
  { id: "s4", label: "차량 외관" },
];

function PhotoScreen({ onBack, onDone }) {
  const [taken, setTaken] = React.useState(new Set(["s1", "s2"]));
  const allTaken = taken.size === SLOTS.length;
  const toggle = id => {
    const next = new Set(taken);
    next.has(id) ? next.delete(id) : next.add(id);
    setTaken(next);
  };

  return (
    <React.Fragment>
      <Header title="사진 업로드" onBack={onBack} />
      <div style={{ flex: 1, overflowY: "auto", background: T.colors.n50, padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontWeight: T.font.w.bold, fontSize: T.font.sz.body, color: T.colors.n900 }}>설치 사진 (필수 4장)</div>
          <div style={{ fontSize: T.font.sz.micro, color: T.colors.n600 }}>
            <span style={{ fontWeight: T.font.w.bold, color: T.colors.primary }}>{taken.size}</span> / {SLOTS.length}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {SLOTS.map((s, idx) => {
            const has = taken.has(s.id);
            return (
              <button key={s.id} onClick={() => toggle(s.id)} style={{
                all: "unset",
                cursor: "pointer",
                aspectRatio: "1",
                background: has ? `linear-gradient(135deg, hsl(${200 + idx * 25} 30% 60%), hsl(${220 + idx * 25} 30% 40%))` : T.colors.white,
                border: `1px solid ${has ? T.colors.primary : T.colors.n300}`,
                borderRadius: T.radius.lg,
                position: "relative",
                overflow: "hidden",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {!has && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: T.colors.n500 }}>
                    <Icon name="photo_camera" size={36} color={T.colors.n500} />
                    <div style={{ fontSize: T.font.sz.micro, fontWeight: T.font.w.bold }}>촬영</div>
                  </div>
                )}
                {has && (
                  <div style={{
                    position: "absolute", top: 8, right: 8, width: 28, height: 28,
                    background: T.colors.success, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: `2px solid #fff`,
                  }}>
                    <Icon name="check" size={18} color="#fff" />
                  </div>
                )}
                <div style={{
                  position: "absolute", left: 0, right: 0, bottom: 0,
                  padding: "8px 10px",
                  background: has ? "rgba(0,0,0,0.55)" : T.colors.n50,
                  color: has ? "#fff" : T.colors.n700,
                  fontSize: T.font.sz.micro, fontWeight: T.font.w.bold,
                  textAlign: "left",
                }}>{s.label}</div>
              </button>
            );
          })}
        </div>
        <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 6, color: T.colors.n600 }}>
          <Icon name="info" size={20} color={T.colors.n500} />
          <span style={{ fontSize: T.font.sz.micro }}>슬롯을 탭하면 촬영 화면이 열립니다 (데모)</span>
        </div>
      </div>
      <BottomAction>
        <Button variant={allTaken ? "primary" : "inactive"} size="large" fullWidth onClick={allTaken ? onDone : undefined}>
          저장 후 돌아가기
        </Button>
      </BottomAction>
    </React.Fragment>
  );
}

window.PhotoScreen = PhotoScreen;
