// 설치 작업 목록 — Install Task List screen (PRD v5.5 §5.1.3)
// 위저드(Step 1~7) 진입점. 모든 항목 완료 시 검증 단계로 진행.
const T = window.CIT;

// 작업 항목 — 현재 1개. 배열 구조 유지로 추후 확장 대응.
const TASKS_DEFAULT = [
  { id: "install", title: "설치 작업", status: "incomplete" },
];

function InstallTaskListScreen({ job, tasks = TASKS_DEFAULT, onBack, onTaskTap, onValidate }) {
  const allDone = tasks.every(t => t.status === "complete");
  return (
    <React.Fragment>
      <Header title="작업 진행" onBack={onBack} />
      <div style={{
        flex: 1, overflowY: "auto",
        background: T.colors.n50,
        padding: 16,
        display: "flex", flexDirection: "column", gap: 16,
      }}>
        {/* 차량 컨텍스트 헤더 */}
        <Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{
              fontSize: T.font.sz.caption,
              color: T.colors.n600,
            }}>{job.model}</div>
            <div style={{
              fontWeight: T.font.w.bold,
              fontSize: T.font.sz.h2,
              color: T.colors.n900,
              letterSpacing: -0.5,
            }}>{job.plate}</div>
          </div>
        </Card>

        {/* 안내 — 작업 흐름 설명 */}
        <InlineBanner
          tone="neutral"
          body={"항목을 눌러 작업을 진행하세요.\n모든 작업 완료 후 검증을 진행합니다."}
        />

        {/* 작업 항목 카드 */}
        <Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div style={{
                fontWeight: T.font.w.bold,
                fontSize: T.font.sz.body,
                color: T.colors.n900,
              }}>설치 작업 목록</div>
              <div style={{
                fontSize: T.font.sz.caption,
                color: T.colors.n600,
              }}>
                <span style={{
                  fontWeight: T.font.w.bold,
                  color: T.colors.primary,
                }}>{tasks.filter(t => t.status === "complete").length}</span>
                {" / "}{tasks.length}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {tasks.map(t => (
                <ListRow
                  key={t.id}
                  title={t.title}
                  status={t.status}
                  onClick={() => onTaskTap && onTaskTap(t)}
                />
              ))}
            </div>
          </div>
        </Card>
      </div>

      <BottomAction>
        <Button
          variant={allDone ? "primary" : "inactive"}
          size="large"
          fullWidth
          onClick={allDone ? onValidate : undefined}
        >
          검증하기
        </Button>
      </BottomAction>
    </React.Fragment>
  );
}

window.InstallTaskListScreen = InstallTaskListScreen;
