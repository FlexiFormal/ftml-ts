import { FTML, injectCss } from "@flexiformal/ftml";
import { QuizProblem } from "@flexiformal/ftml-backend";
import { FTMLFragment } from "@flexiformal/ftml-react";
import { useEffect, useState } from "react";

const OnFragmentPage = () => {
  const problemIdx = 0;
  const [problem, setProblem] = useState<QuizProblem | undefined>(undefined);
  const [solution, setSolution] = useState<string | undefined>(undefined);
  const [response, setResponse] = useState<FTML.ProblemResponse | undefined>(
    undefined
  );
  useEffect(() => {
    injectCss([{ Link: "srv:/rustex.css" }]);

    async function getProblem() {
      const response = await fetch(`/api/get-problem?problemIdx=${problemIdx}`);
      const data = await response.json();
      const { problem, solution } = data as {
        problem: QuizProblem;
        solution: string | undefined;
      };
      setProblem(problem);
      setSolution(solution);
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
  if (!problem || !solution) return <div>Loading...</div>;

  const ftmlSolution = FTML.Solutions.from_jstring(solution);
  if (!ftmlSolution) return <div>Error: Invalid solution</div>;
  const feedback = response
    ? ftmlSolution.check_response(response)
    : ftmlSolution.default_feedback();
  if (!feedback) return <div>Error: Invalid feedback</div>;
  console.log("ftmlSolution", {ftmlSolution});
  console.log("feedback", {feedback});

  const problemState = { type: "Graded", feedback } as FTML.ProblemState;
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
      FTML Solution:
      <pre>{JSON.stringify(ftmlSolution, null, 2)}</pre>
      <br />
      Feedback:
      <pre>{JSON.stringify(feedback, null, 2)}</pre>
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
