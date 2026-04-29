// 오프라인 — field-resilience full-screen state
const T = window.CIT;

function OfflineScreen({ onRetry, onBack }) {
  return (
    <React.Fragment>
      <Header title="오프라인" onBack={onBack} />
      <div style={{
        flex: 1, background: T.colors.n50,
        padding: 32,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24, textAlign: "center",
      }}>
        <div style={{
          width: 96, height: 96, borderRadius: "50%",
          background: T.colors.n100,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon name="wifi_off" size={48} color={T.colors.n600} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontWeight: T.font.w.bold, fontSize: T.font.sz.h2, color: T.colors.n900 }}>인터넷에 연결되어 있지 않습니다</div>
          <div style={{ fontSize: T.font.sz.body, color: T.colors.n700, lineHeight: 1.5, maxWidth: 320 }}>
            작업 내역은 단말기에 자동 저장됩니다. 네트워크 복구 후 자동으로 전송돼요.
          </div>
        </div>
        <div style={{
          background: T.colors.warningBg, border: `1px solid ${T.colors.warning}`,
          borderRadius: T.radius.lg, padding: "12px 16px",
          display: "flex", alignItems: "center", gap: 10, color: T.colors.n900,
        }}>
          <Icon name="cloud_queue" size={24} color={T.colors.warning} />
          <span style={{ fontSize: T.font.sz.caption, fontWeight: T.font.w.bold }}>전송 대기 중인 보고 2건</span>
        </div>
      </div>
      <BottomAction>
        <Button variant="outline" size="large" style={{ flex: 1 }} onClick={onBack}>나중에</Button>
        <Button variant="primary" size="large" style={{ flex: 1 }} icon="refresh" onClick={onRetry}>다시 시도</Button>
      </BottomAction>
    </React.Fragment>
  );
}

window.OfflineScreen = OfflineScreen;
