// 04 위저드 Step 2 — 설정 입력 (PRD v5.5 §5.1.5 / Step 2)
// 입력: SN(시리얼) / 사용자 ID / 사용자 PW / 디지털차키(읽기) / 시동잠금(읽기)
// Non-OBD 차량: SN 입력 옆 [Non-OBD 호출] 버튼 + 호출 후 InlineBanner(success)로 변환된 SN 표시
// 디지털차키 / 시동잠금: 운영팀 설정값을 InfoRow(읽기)로 표시 — Toggle 미사용
const T = window.CIT;

// 호출 상태: idle | calling | success | failed
function NonObdCallButton({ status, onCall }) {
  const isCalling = status === "calling";
  return (
    <button
      onClick={isCalling ? undefined : onCall}
      disabled={isCalling}
      style={{
        all: "unset",
        cursor: isCalling ? "default" : "pointer",
        boxSizing: "border-box",
        height: 56,
        padding: "0 16px",
        background: isCalling ? T.colors.n300 : T.colors.white,
        color: isCalling ? T.colors.n500 : T.colors.primary,
        border: `1px solid ${isCalling ? T.colors.n300 : T.colors.primary}`,
        borderRadius: T.radius.md,
        fontFamily: T.font.family,
        fontWeight: T.font.w.bold,
        fontSize: T.font.sz.bodySm,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        flexShrink: 0,
      }}>
      {isCalling
        ? <LoadingSpinner size="sm" color={T.colors.n500} />
        : <Icon name="sync" size={20} color={T.colors.primary} />}
      <span>{isCalling ? "호출 중" : "Non-OBD 호출"}</span>
    </button>
  );
}

function WizardStep2Settings({
  job, isNonObd,
  // 입력 값
  sn, userId, userPw,
  // 운영팀 설정 (읽기)
  digitalKey,   // "설치" | "미설치"
  ignitionLock, // "설치" | "미설치"
  // Non-OBD 호출
  callStatus,   // "idle" | "calling" | "success" | "failed"
  convertedSn,
  onChangeSn, onChangeUserId, onChangeUserPw,
  onCall,
  onPrev, onNext,
}) {
  const canNext =
    !!sn && !!userId && !!userPw &&
    (!isNonObd || callStatus === "success");

  return (
    <React.Fragment>
      <Header title="설치 작업" onBack={onPrev} />

      <div style={{
        flex: 1, overflowY: "auto",
        background: T.colors.n50,
        padding: "16px 16px 24px",
        display: "flex", flexDirection: "column", gap: 16,
      }}>
        {/* Stepper */}
        <Stepper total={7} current={2} />

        {/* 단계 라벨 + 제목 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{
            fontSize: T.font.sz.caption,
            color: T.colors.primary,
            fontWeight: T.font.w.bold,
            letterSpacing: 0.5,
          }}>STEP 2 / 7</div>
          <h1 style={{
            margin: 0,
            fontSize: T.font.sz.h1,
            fontWeight: T.font.w.bold,
            color: T.colors.n900,
            lineHeight: 1.3,
          }}>설치 정보를 입력해 주세요</h1>
        </div>

        {/* 입력 카드 */}
        <Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* SN — Non-OBD인 경우 [호출] 버튼 표시 */}
            <Field
              label="단말기 SN (시리얼 번호)"
              required
              helper={isNonObd
                ? "Non-OBD 차량입니다. 호출 후 SN이 자동 입력됩니다."
                : null}
            >
              {isNonObd ? (
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <TextInput
                      value={sn}
                      placeholder="호출 후 자동 입력"
                      onChange={onChangeSn}
                    />
                  </div>
                  <NonObdCallButton status={callStatus} onCall={onCall} />
                </div>
              ) : (
                <TextInput
                  value={sn}
                  placeholder="단말기 본체의 SN 입력"
                  onChange={onChangeSn}
                />
              )}
            </Field>

            {/* Non-OBD 호출 결과 배너 */}
            {isNonObd && callStatus === "success" && (
              <InlineBanner
                tone="info"
                icon="check_circle"
                title="SN 변환 완료"
                body={`변환된 SN: ${convertedSn || sn}`}
              />
            )}
            {isNonObd && callStatus === "failed" && (
              <InlineBanner
                tone="warning"
                icon="error"
                title="호출 실패"
                body={"단말기 응답이 없습니다.\n전원/연결 확인 후 다시 시도하세요."}
              />
            )}

            <Divider />

            {/* 사용자 ID */}
            <Field label="사용자 ID" required>
              <TextInput
                value={userId}
                placeholder="고객사로부터 전달받은 ID"
                onChange={onChangeUserId}
              />
            </Field>

            {/* 사용자 PW */}
            <Field label="사용자 비밀번호" required>
              <TextInput
                type="password"
                value={userPw}
                placeholder="고객사로부터 전달받은 비밀번호"
                onChange={onChangeUserPw}
              />
            </Field>
          </div>
        </Card>

        {/* 운영팀 설정 (읽기 전용) */}
        <Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              fontWeight: T.font.w.bold,
              fontSize: T.font.sz.bodySm,
              color: T.colors.n900,
            }}>
              <Icon name="settings" size={20} color={T.colors.primary} />
              <span>운영팀 설정값</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <InfoRow label="디지털차키"
                value={
                  <span style={{
                    color: digitalKey === "설치" ? T.colors.success : T.colors.n600,
                    fontWeight: T.font.w.bold,
                  }}>{digitalKey}</span>
                }
                valueWeight="medium" />
              <Divider />
              <InfoRow label="시동 잠금"
                value={
                  <span style={{
                    color: ignitionLock === "설치" ? T.colors.success : T.colors.n600,
                    fontWeight: T.font.w.bold,
                  }}>{ignitionLock}</span>
                }
                valueWeight="medium" />
            </div>
            <div style={{
              fontSize: T.font.sz.micro,
              color: T.colors.n600,
              lineHeight: 1.5,
              padding: "4px 0 0",
              borderTop: `1px dashed ${T.colors.n300}`,
              paddingTop: 12,
            }}>
              ※ 변경이 필요한 경우 운영팀에 요청하세요.
            </div>
          </div>
        </Card>
      </div>

      <BottomAction>
        <Button variant="outline" size="large" style={{ flex: 1 }} onClick={onPrev}>
          이전
        </Button>
        <Button
          variant={canNext ? "primary" : "inactive"}
          size="large"
          style={{ flex: 1 }}
          onClick={canNext ? onNext : undefined}
        >
          다음
        </Button>
      </BottomAction>
    </React.Fragment>
  );
}

window.WizardStep2Settings = WizardStep2Settings;
