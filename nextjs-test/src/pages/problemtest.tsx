import { gradingNotes } from "@flexiformal/ftml-backend";
import { FTMLFragment } from "@flexiformal/ftml-react";
import { useEffect, useState } from "react";

const problemUri =
  "http://mathhub.info?a=courses/Jacobs/GenCS/problems&p=SML/prob&d=mapcan1&l=en&e=problem";
const problemSource =
  "https://gl.mathhub.info/courses/jacobs/GenCS/problems/-/blob/main/source/SML/prob/mapcan1.en.tex?ref_type=heads";
const Problemtest = () => {
  return (
    <div style={{ margin: "10px" }}>
      <a href={problemSource} target="_blank" style={{ color: "blue" }}>
        View Problem Source
      </a>
      <FTMLFragment
        fragment={{ type: "FromBackend", uri: problemUri }}
        key={problemUri}
        problemWrap={(uri, subProblem, autogradable) => {
          return (ch) => (
            <div style={{ border: `1px solid grey` }}>
              <span style={{ color: "grey" }}>
                {subProblem ? "SUB-PROBLEM: " : "MAIN-PROBLEM: "}
                {uri}
              </span>
              {ch}
            </div>
          );
        }}
      />
      <GnotesFetcher />
    </div>
  );
};

const GnotesFetcher = () => {
  const [uri, setUri] = useState(
    "http://mathhub.info?a=courses/Jacobs/GenCS/problems&p=SML/prob&d=mapcan1&l=en&e=problem/problem_2",
  );
  const [notes, setNotes] = useState<string | object>("");

  useEffect(() => {
    if (!uri) return;
    setNotes("Loading...");
    gradingNotes({ uri: uri }).then((result) => {
      if (result) setNotes(result);
      else setNotes(`No grading notes found for:\n${uri}`);
    });
  }, [uri]);

  return (
    <div style={{ marginTop: "20px" }}>
      <hr />
      <b>GNotes Fetcher</b>
      <input
        type="text"
        value={uri}
        onChange={(e) => setUri(e.target.value)}
        placeholder="Enter sub-problem URI..."
        style={{ width: "100%", marginTop: "10px" }}
      />
      <br />
      <span style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
        {typeof notes === "object" ? JSON.stringify(notes, null, 2) : notes}
      </span>
    </div>
  );
};

export default Problemtest;
