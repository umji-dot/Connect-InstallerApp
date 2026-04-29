// 배정 작업 — Job List screen (PRD v5.5 기준 갱신)
// 카드 1행 위계: 차량번호(big, +임시배지) → 차종 → 업체명·지점명
// 카드 2행: 작업 주소 / 업체 담당자 / 작업 요청일
// "오늘 배정 N건" 헤더 유지, 정렬 토글 제거
const T = window.CIT;

const JOBS = [
  { id: "j1", plate: "12가 3456", model: "현대 셀토스",
    company: "주식회사아이카", branch: "강남 지점",
    address: "서울특별시 강남구 논현동 123", phone: "010-1234-5678",
    type: "OBD", kind: "설치", date: "2026-04-27", isTemp: false },
  { id: "j2", plate: "112가 5821", model: "벤츠 E-Class",
    company: "한국물류", branch: "분당 지점",
    address: "성남시 분당구 정자동 45", phone: "010-9876-5432",
    type: "Non-OBD", kind: "AS", date: "2026-04-27", isTemp: false },
  { id: "j3", plate: "32라 9100", model: "기아 봉고3",
    company: "송파택배", branch: "가락 지점",
    address: "서울특별시 송파구 가락동 88", phone: "010-2222-3344",
    type: "OBD", kind: "탈거", date: "2026-04-28", isTemp: false },
  { id: "j4", plate: "임시 0001", model: "현대 포터2",
    company: "현대모비스", branch: "용인 테스트",
    address: "용인시 기흥구 마북동 1", phone: "010-5555-1111",
    type: "OBD", kind: "설치", date: "2026-04-28", isTemp: true },
];

function JobCard({ job, onClick }) {
  return (
    <button onClick={onClick} style={{
      all: "unset",
      cursor: "pointer",
      boxSizing: "border-box",
      width: "100%",
      background: T.colors.white,
      border: `1px solid ${T.colors.n300}`,
      borderRadius: T.radius.lg,
      padding: 16,
      display: "flex", flexDirection: "column", gap: 12,
    }}>
      {/* 1행: 좌측 정보 블록 + 우측 배지 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 }}>
          {/* 차량번호 + 임시 배지 */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <div style={{
              fontWeight: T.font.w.bold,
              fontSize: T.font.sz.h2,
              color: T.colors.n900,
              letterSpacing: -0.5,
            }}>{job.plate}</div>
            {job.isTemp && <Badge>임시</Badge>}
          </div>
          {/* 차종 */}
          <div style={{
            fontSize: T.font.sz.bodySm,
            color: T.colors.n700,
            fontWeight: T.font.w.med,
          }}>{job.model}</div>
          {/* 업체명 · 지점명 */}
          <div style={{
            fontSize: T.font.sz.caption,
            color: T.colors.n600,
            marginTop: 2,
          }}>{job.company} · {job.branch}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, flexShrink: 0, alignItems: "flex-end" }}>
          <Badge>{job.type}</Badge>
          <Badge>{job.kind}</Badge>
        </div>
      </div>

      <div style={{ height: 1, background: T.colors.n100 }} />

      {/* 2행: 주소 / 담당자 / 작업 요청일 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: T.colors.n700 }}>
          <Icon name="location_on" size={20} color={T.colors.n500} />
          <span style={{ fontSize: T.font.sz.bodySm }}>{job.address}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: T.colors.n700 }}>
          <Icon name="call" size={20} color={T.colors.n500} />
          <span style={{ fontSize: T.font.sz.bodySm }}>{job.phone}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: T.colors.n700 }}>
          <Icon name="event" size={20} color={T.colors.n500} />
          <span style={{ fontSize: T.font.sz.bodySm }}>{job.date}</span>
        </div>
      </div>
    </button>
  );
}

function JobListScreen({ onSelect, onTab, tab }) {
  return (
    <React.Fragment>
      <Header title="배정 작업" showBack={false} />
      <div style={{ padding: "16px 20px 12px", background: T.colors.n50, flexShrink: 0 }}>
        <TextInput placeholder="차량번호, 업체명, 지점명 검색" trailingIcon="search" />
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "4px 20px 20px", background: T.colors.n50 }}>
        {/* 오늘 배정 N건 카운터 (정렬 토글 제거) */}
        <div style={{
          display: "flex", alignItems: "center",
          padding: "8px 0 12px",
          fontSize: T.font.sz.bodySm, color: T.colors.n600,
        }}>
          오늘 배정 ·&nbsp;
          <span style={{ fontWeight: T.font.w.bold, color: T.colors.n900 }}>
            {JOBS.length}건
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {JOBS.map(j => <JobCard key={j.id} job={j} onClick={() => onSelect && onSelect(j)} />)}
        </div>
      </div>
      <TabBar active={tab} onChange={onTab} />
    </React.Fragment>
  );
}

window.JobListScreen = JobListScreen;
