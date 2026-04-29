// Connect Installer — top-level navigator
const { useState } = React;

function App() {
  const [screen, setScreen] = useState("list");   // list | detail | manual | photos | complete | offline
  const [job, setJob] = useState(null);
  const [tab, setTab] = useState("jobs");
  const [completed, setCompleted] = useState(new Set(["c1", "c2", "c3"]));
  const [submitStatus, setSubmitStatus] = useState("idle");

  const finishManual = () => {
    const n = new Set(completed);
    n.add("c4");
    setCompleted(n);
    setScreen("detail");
  };
  const finishPhotos = () => {
    const n = new Set(completed);
    n.add("c5");
    setCompleted(n);
    setScreen("detail");
  };
  const submit = () => {
    setSubmitStatus("submitting");
    setTimeout(() => setSubmitStatus("success"), 900);
  };

  let body = null;
  if (screen === "list") {
    body = <JobListScreen tab={tab} onTab={setTab} onSelect={(j) => { setJob(j); setScreen("detail"); }} />;
  } else if (screen === "detail") {
    body = <JobDetailScreen
      job={job}
      onBack={() => setScreen("list")}
      onOpenManual={() => setScreen("manual")}
      onOpenPhotos={() => setScreen("photos")}
      onComplete={() => { setSubmitStatus("idle"); setScreen("complete"); }}
      completedSet={completed}
    />;
  } else if (screen === "manual") {
    body = <ManualScreen onBack={() => setScreen("detail")} onDone={finishManual} />;
  } else if (screen === "photos") {
    body = <PhotoScreen onBack={() => setScreen("detail")} onDone={finishPhotos} />;
  } else if (screen === "complete") {
    body = <CompleteScreen
      job={job}
      status={submitStatus}
      onBack={() => setScreen("detail")}
      onSubmit={submit}
    />;
  } else if (screen === "offline") {
    body = <OfflineScreen onBack={() => setScreen("list")} onRetry={() => setScreen("list")} />;
  }

  return body;
}

window.App = App;
