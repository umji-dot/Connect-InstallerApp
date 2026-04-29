// 완료 보고 — submission summary + success/error toast
const T = window.CIT;

function CompleteScreen({ job, onBack, onSubmit, status }) {
  // status: idle | submitting | success | error
  return (
    <React.Fragment>
      <Header title="완료 보고" onBack={onBack} />
      <div style={{ flex: 1, overflowY: "auto", background: T.colors.n50, padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
        {status === "success" && (
          <Toast tone="success" title="완료 보고가 접수되었습니다" body="운영팀 확인 후 작업이 종료됩니다. 수고하셨습니다." />
        )}
        {status === "error" && (
          <Toast tone="error" title="전송 실패" body="네트워크 상태를 확인하고 다시 시도해 주세요. 입력된 내용은 보존됩니다." />
        )}

        <Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontWeight: T.font.w.bold, fontSize: T.font.sz.body, color: T.colors.n900, marginBottom: 6 }}>작업 요약</div>
            <InfoRow label="차량 번호" value={job.plate} valueWeight="medium" />
            <Divider />
            <InfoRow label="유형" value={`${job.type} / ${job.kind}`} valueWeight="medium" />
            <InfoRow label="고객사" value={job.customer.split(" · ")[0]} valueWeight="medium" />
            <InfoRow label="작업자" value="김설치 (현장 1팀)" valueWeight="medium" />
            <InfoRow label="작업 시간" value="32분" valueWeight="medium" />
          </div>
        </Card>

        <Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Field label="현장 메모" helper="운영팀에 공유할 사항을 적어 주세요">
              <div style={{
                minHeight: 96,
                border: `1px solid ${T.colors.n300}`,
                borderRadius: T.radius.input,
                padding: 12,
                background: T.colors.white,
                fontSize: T.font.sz.bodySm,
                color: T.colors.n900,
                lineHeight: 1.5,
              }}>
                지하 2층에 주차되어 있어 진입 협소함. 고객 인계 완료.
              </div>
            </Field>
          </div>
        </Card>
      </div>

      <BottomAction>
        {status === "success"
          ? <Button variant="primary" size="large" fullWidth onClick={onBack}>목록으로 돌아가기</Button>
          : <Button variant={status === "submitting" ? "inactive" : "primary"} size="large" fullWidth onClick={onSubmit}>
              {status === "submitting" ? "전송 중..." : "보고 제출"}
            </Button>}
      </BottomAction>
    </React.Fragment>
  );
}

window.CompleteScreen = CompleteScreen;
