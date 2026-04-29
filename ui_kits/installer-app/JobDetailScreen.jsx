// 02 작업 상세 — Job Detail (PRD v5.5 기준 갱신)
// 구조: 임시배너 → 운영팀 메모 → 차량 정보 → 현장 정보 → (AS) AS 요청사항 → 설치형태 변경 안내
// 하단: [작업 불가] / [작업 시작] (임시차량 시 [작업 시작] 비활성)
const T = window.CIT;

function JobDetailScreen({ job, onBack, onUnable, onStart }) {
  const isAS = job.kind === "AS";

  // 임시 차량 시 작업 시작 차단
  const startDisabled = !!job.isTemp;

  // 더미 보강
  const adminMemo = job.adminMemo
    || "강남 지역 주차 주의. 지하 2층 주차장 진입 필요. 고객 12:30 이후 가능.";
  const asRequests = job.asRequests
    || (isAS ? ["단말기 단순 교체", "시동잠금 동작 점검"] : []);

  return (
    <React.Fragment>
      <Header title="작업 상세" onBack={onBack} />

      <div style={{
        flex: 1, overflowY: "auto",
        background: T.colors.n50,
        padding: 16,
        display: "flex", flexDirection: "column", gap: 16,
      }}>

        {/* (조건부) 임시 등록 차량 안내 */}
        {job.isTemp && (
          <InlineBanner
            tone="warning"
            title="임시 등록 차량입니다"
            body={"차대번호가 확정되지 않아 작업을 시작할 수 없습니다.\n운영팀이 차량을 확정한 후 새로고침하세요."}
          />
        )}

        {/* 운영팀 메모 (최상단) */}
        {adminMemo && (
          <Card tone="memo">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                fontWeight: T.font.w.bold,
                fontSize: T.font.sz.bodySm,
                color: T.colors.n900,
              }}>
                <Icon name="campaign" size={20} color={T.colors.warning} />
                <span>운영팀 메모</span>
              </div>
              <div style={{
                fontSize: T.font.sz.bodySm,
                color: T.colors.n900,
                lineHeight: 1.6,
                whiteSpace: "pre-line",
              }}>{adminMemo}</div>
            </div>
          </Card>
        )}

        {/* 차량 정보 카드 */}
        <Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <SectionTitle icon="directions_car" label="차량 정보" />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <InfoRow
                label="차량 번호"
                value={
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span>{job.plate}</span>
                    {job.isTemp && <Badge>임시</Badge>}
                  </span>
                }
                valueWeight="big"
              />
              <Divider />
              <InfoRow label="차종"        value={job.model}   valueWeight="medium" />
              <InfoRow label="업체명"      value={job.company} valueWeight="medium" />
              <InfoRow label="지점명"      value={job.branch}  valueWeight="medium" />
              <InfoRow label="서비스 유형" value={<Badge>{job.kind}</Badge>} />
              <InfoRow label="설치 형태"   value={<Badge>{job.type}</Badge>} />
              <InfoRow label="작업 요청일" value={job.date}    valueWeight="medium" />
            </div>
          </div>
        </Card>

        {/* 현장 정보 카드 */}
        <Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <SectionTitle icon="place" label="현장 정보" />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* 작업 주소 */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontSize: T.font.sz.micro, color: T.colors.n600 }}>작업 주소</div>
                <div style={{
                  fontSize: T.font.sz.body,
                  color: T.colors.n900,
                  fontWeight: T.font.w.med,
                  lineHeight: 1.5,
                }}>{job.address}</div>
              </div>
              {/* 업체 담당자 — 전화번호만, tel: 링크 */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontSize: T.font.sz.micro, color: T.colors.n600 }}>업체 담당자</div>
                <a href={`tel:${job.phone}`} style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  fontSize: T.font.sz.body,
                  color: T.colors.primary,
                  fontWeight: T.font.w.bold,
                  textDecoration: "none",
                  minHeight: 32,
                }}>
                  <Icon name="call" size={20} color={T.colors.primary} />
                  <span>{job.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </Card>

        {/* (조건부, AS) AS 요청사항 카드 */}
        {isAS && asRequests.length > 0 && (
          <Card>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <SectionTitle icon="build_circle" label="AS 요청사항" />
              <ul style={{
                margin: 0, padding: 0, listStyle: "none",
                display: "flex", flexDirection: "column", gap: 10,
              }}>
                {asRequests.map((req, i) => (
                  <li key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    fontSize: T.font.sz.bodySm,
                    color: T.colors.n900,
                    lineHeight: 1.5,
                  }}>
                    <Icon name="circle" size={8} color={T.colors.primary}
                      style={{ marginTop: 8, flexShrink: 0 }} />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        )}

        {/* 설치형태 변경 안내 (하단 안내) */}
        <InlineBanner
          tone="neutral"
          icon="info"
          body="설치 형태 변경 시 작업이 초기화된 후 재진행됩니다."
        />
      </div>

      {/* 하단 액션 */}
      <BottomAction>
        <Button
          variant="outline"
          size="large"
          style={{ flex: 1 }}
          onClick={onUnable}
        >작업 불가</Button>
        <Button
          variant={startDisabled ? "inactive" : "primary"}
          size="large"
          style={{ flex: 1 }}
          onClick={startDisabled ? undefined : onStart}
        >작업 시작</Button>
      </BottomAction>
    </React.Fragment>
  );
}

// 섹션 헤더 — 카드 내부 타이틀 통일
function SectionTitle({ icon, label }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      fontWeight: T.font.w.bold,
      fontSize: T.font.sz.bodySm,
      color: T.colors.n900,
    }}>
      <Icon name={icon} size={20} color={T.colors.primary} />
      <span>{label}</span>
    </div>
  );
}

window.JobDetailScreen = JobDetailScreen;
