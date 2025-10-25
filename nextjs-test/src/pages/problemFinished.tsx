import { FTML, injectCss } from "@flexiformal/ftml";
import { QuizProblem } from "@flexiformal/ftml-backend";
import { FTMLFragment } from "@flexiformal/ftml-react";
import { useEffect, useState } from "react";

const OnFragmentPage = () => {
  const problemIdx = 0;
  const [problem, setProblem] = useState<QuizProblem | undefined>(undefined);
  const [response, setResponse] = useState<FTML.ProblemResponse | undefined>(
    undefined
  );
  useEffect(() => {
    injectCss([{ Link: "srv:/rustex.css" }]);
    async function getProblem() {
      const response = await fetch(`/api/get-problem?problemIdx=${problemIdx}`);
      const data = await response.json();
      const { problem } = data as {
        problem: QuizProblem;
        solution: string | undefined;
      };
      setProblem(problem);
      setResponse({
        uri: problem.uri,
        responses: [
          {
            type: "MultipleChoice",
            value: [true, true, false, true, true, false],
          },
        ],
      });
    }
    getProblem();
  }, [problemIdx]);
  if (!problem) return <div>Loading...</div>;

  const problemState = {
    type: "Finished",
    current_response: response,
  } as FTML.ProblemState;
  const problemStates = new Map([[problem.uri, problemState]]);

  return (
    <div>
      <FTMLFragment
        fragment={{ type: "HtmlString", html: problem.html, uri: problem.uri }}
        key={problem.uri}
        allowHovers={false}
        problemStates={problemStates}
        onProblemResponse={(response) => {
          console.log("response callback", response);
          setResponse(response);
        }}
      />
      Problem:
      <pre>{JSON.stringify(problem, null, 2)}</pre>
      <br />
      Problem States:
      <pre>{JSON.stringify(Object.fromEntries(problemStates), null, 2)}</pre>
      <br />
      Response:
      <pre>{JSON.stringify(response, null, 2)}</pre>
      <br />
    </div>
  );
};

export default OnFragmentPage;
