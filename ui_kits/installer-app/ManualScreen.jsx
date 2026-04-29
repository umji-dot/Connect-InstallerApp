// 설치 메뉴얼 — Step-by-step manual viewer
const T = window.CIT;

const STEPS = [
  { title: "OBD 단자 위치 확인", body: "운전석 하단, 핸들 좌측 패널 안쪽의 OBD-II 단자를 찾아 주세요. 단자 보호 커버가 있을 경우 부드럽게 분리합니다." },
  { title: "케이블 1차 연결", body: "장비의 OBD 커넥터를 단자에 끝까지 밀어 넣어 주세요. 흔들림이 있으면 연결 불량의 원인이 됩니다." },
  { title: "전원 LED 확인", body: "본체의 전원 LED가 녹색으로 점등되는지 확인합니다. 점등이 되지 않으면 케이블을 다시 분리 후 재연결해 주세요." },
  { title: "고정 클립 부착", body: "케이블이 운전 중 빠지지 않도록 동봉된 고정 클립으로 차량 내장재에 단단히 부착합니다." },
  { title: "패킷 유효성 체크", body: "앱의 [패킷 유효성 체크] 버튼을 눌러 서버 응답을 확인합니다. 30초 이내에 완료되어야 합니다." },
  { title: "시동잠금 테스트", body: "시동을 1회 ON/OFF 한 뒤 앱에서 잠금 상태가 정상으로 전환되는지 확인해 주세요." },
  { title: "마무리 점검", body: "분리한 패널을 원위치에 결합하고 외관에 손상이 없는지 점검합니다." },
];

function ManualScreen({ onBack, onDone }) {
  const [i, setI] = React.useState(0);
  const step = STEPS[i];
  const last = i === STEPS.length - 1;
  return (
    <React.Fragment>
      <Header title="설치 메뉴얼" onBack={onBack} />
      <div style={{ padding: "16px 20px", background: T.colors.white, flexShrink: 0 }}>
        <Stepper total={STEPS.length} current={i + 1} />
        <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: T.font.sz.micro, color: T.colors.n600 }}>STEP {i + 1} / {STEPS.length}</div>
          <div style={{ fontSize: T.font.sz.micro, color: T.colors.n500 }}>OBD 설치</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", background: T.colors.n50, padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{
          aspectRatio: "16/10",
          background: `linear-gradient(135deg, ${T.colors.n200}, ${T.colors.n100})`,
          borderRadius: T.radius.lg,
          border: `1px solid ${T.colors.n300}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: T.colors.n500,
        }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <Icon name="image" size={48} color={T.colors.n400} />
            <div style={{ fontSize: T.font.sz.micro }}>설치 가이드 이미지</div>
          </div>
        </div>
        <div style={{ fontWeight: T.font.w.bold, fontSize: T.font.sz.h2, color: T.colors.n900, lineHeight: 1.35 }}>
          {step.title}
        </div>
        <div style={{ fontSize: T.font.sz.body, color: T.colors.n900, lineHeight: 1.6 }}>
          {step.body}
        </div>
      </div>
      <BottomAction>
        <Button variant="outline" size="large" style={{ flex: 1 }} onClick={() => i === 0 ? onBack() : setI(i - 1)}>
          {i === 0 ? "닫기" : "이전"}
        </Button>
        <Button variant="primary" size="large" style={{ flex: 1 }} onClick={() => last ? onDone() : setI(i + 1)}>
          {last ? "완료" : "다음"}
        </Button>
      </BottomAction>
    </React.Fragment>
  );
}

window.ManualScreen = ManualScreen;
