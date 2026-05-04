import { gradingNotes } from "@flexiformal/ftml-backend";
import { FTMLFragment } from "@flexiformal/ftml-react";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

const problemUri =
  "http://mathhub.info?a=courses/Jacobs/GenCS/problems&p=SML/prob&d=mapcan1&l=en&e=problem";

const getSubProblemId = (uri: string, index: number) =>
  index === 0 ? `${uri}/problem` : `${uri}/problem_${index}`;

const Problemtest = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [subProblemIds, setSubProblemIds] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [notes, setNotes] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSubProblemIds = () => {
      const nextSubProblemIds = Array.from(
        container.querySelectorAll("[data-ftml-subproblem]")
      ).map((_, index) => getSubProblemId(problemUri, index));

      setSubProblemIds((currentSubProblemIds) =>
        JSON.stringify(currentSubProblemIds) === JSON.stringify(nextSubProblemIds)
          ? currentSubProblemIds
          : nextSubProblemIds
      );
    };

    updateSubProblemIds();
    const observer = new MutationObserver(updateSubProblemIds);
    observer.observe(container, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  const handleFetch = () => {
    if (!selectedId) return;
    setError(null);
    setNotes(null);
    gradingNotes({ uri: selectedId })
      .then((result) => {
        if (result === undefined) {
          setError(`No grading notes found for:\n${selectedId}`);
          return;
        }
        setNotes(result);
      })
      .catch((err) => setError(err?.message ?? String(err)));
  };

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#171717" }}>
      <Head>
        <title>Problem Test</title>
      </Head>

      <main
        ref={containerRef}
        style={{ maxWidth: 900, margin: "0 auto", padding: "24px" }}
      >
        <FTMLFragment
          fragment={{ type: "FromBackend", uri: problemUri }}
          key={problemUri}
        />
      </main>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "16px 24px", display: "flex", gap: "12px" }}>
        <select
          value={selectedId}
          onChange={(e) => { setSelectedId(e.target.value); setNotes(null); setError(null); }}
          disabled={subProblemIds.length === 0}
          style={{ flex: 1 }}
        >
          <option value="">
            {subProblemIds.length === 0 ? "No sub-problems detected..." : "Select a sub-problem ID..."}
          </option>
          {subProblemIds.map((id) => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>

        <button onClick={handleFetch} disabled={!selectedId}>
          Fetch
        </button>
      </div>

      {error !== null && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "12px 24px", color: "#dc2626" }}>
          <pre style={{ margin: 0, fontSize: "13px", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
            {error}
          </pre>
        </div>
      )}

      {notes !== null && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "12px 24px" }}>
          <pre style={{ margin: 0, fontSize: "13px", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
            {JSON.stringify(notes, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Problemtest;
