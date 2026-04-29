// 설치 위저드 Step 1 — 단말기 선택 (PRD v5.5 §5.1.4)
// 9개 모델 리스트 (검색 없음). RadioOption selected 상태가 선택 표시.
const T = window.CIT;

// 단말기 모델 — Figma/PRD에 명시된 9종.
// description은 임의 생성 (PRD에 모델 설명 미명시) — 디자이너 검수 후 정정 가능
const DEVICE_MODELS = [
  { value: "CAMD1000",    label: "CAMD1000",    description: "OBD 표준" },
  { value: "CAMD2000",    label: "CAMD2000",    description: "OBD 표준 · 시동잠금 지원" },
  { value: "CAMD2500",    label: "CAMD2500",    description: "OBD 표준 · 시동잠금 지원" },
  { value: "CAMD2500K",   label: "CAMD2500K",   description: "OBD 표준 · 디지털차키 호환" },
  { value: "CAMD2500LD",  label: "CAMD2500LD",  description: "OBD 표준 · LD 인증" },
  { value: "CAMD2500KD",  label: "CAMD2500KD",  description: "OBD 표준 · 디지털차키 + LD 인증" },
  { value: "CAMD3000BK",  label: "CAMD3000BK",  description: "Non-OBD 호환 · 시동잠금 지원" },
  { value: "CAMD3000BL",  label: "CAMD3000BL",  description: "Non-OBD 호환 · 디지털차키 호환" },
  { value: "CAMD3000BKC", label: "CAMD3000BKC", description: "Non-OBD 호환 · 디지털차키 + 시동잠금" },
];

function WizardStep1Device({ job, value, onChange, onBack, onNext }) {
  const canProceed = !!value;
  return (
    <React.Fragment>
      <Header title="설치 작업" onBack={onBack} />
      <div style={{
        flex: 1, overflowY: "auto",
        background: T.colors.n50,
        padding: 16,
        display: "flex", flexDirection: "column", gap: 16,
      }}>
        {/* Stepper */}
        <Stepper total={7} current={1} />

        {/* Step 안내 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{
            fontSize: T.font.sz.caption,
            color: T.colors.n600,
            fontWeight: T.font.w.bold,
          }}>STEP 1 / 7</div>
          <div style={{
            fontSize: T.font.sz.h1,
            fontWeight: T.font.w.bold,
            color: T.colors.n900,
            lineHeight: 1.3,
          }}>단말기를 선택해 주세요</div>
        </div>

        {/* 단말기 모델 리스트 */}
        <RadioGroup
          value={value}
          options={DEVICE_MODELS}
          onChange={onChange}
        />
      </div>

      <BottomAction>
        <Button variant="outline" size="large" style={{ flex: 1 }} onClick={onBack}>
          이전
        </Button>
        <Button
          variant={canProceed ? "primary" : "inactive"}
          size="large"
          style={{ flex: 1 }}
          onClick={canProceed ? onNext : undefined}
        >
          다음
        </Button>
      </BottomAction>
    </React.Fragment>
  );
}

window.WizardStep1Device = WizardStep1Device;
