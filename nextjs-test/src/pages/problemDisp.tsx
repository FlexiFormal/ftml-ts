import { FTML, injectCss } from "@flexiformal/ftml";
import { QuizProblem } from "@flexiformal/ftml-backend";
import { FTMLFragment } from "@flexiformal/ftml-react";
import { useEffect, useState } from "react";

function getProblemState(
  isFrozen: boolean,
  solution?: string,
  current_response?: FTML.ProblemResponse
): FTML.ProblemState {
  if (!isFrozen)
    return { type: "Interactive", current_response, solution: undefined };
  if (!solution) return { type: "Finished", current_response };
  const sol = FTML.Solutions.from_jstring(solution.replace(/^"|"$/g, ""));
  const feedback = current_response
    ? sol?.check_response(current_response)
    : sol?.default_feedback();
  if (!feedback) return { type: "Finished", current_response }; // Something went wrong!!
  return { type: "Graded", feedback: feedback };
}

const OnFragmentPage = () => {
  const problemIdx = 0;
  const [problem, setProblem] = useState<QuizProblem | undefined>(undefined);
  const [solution, setSolution] = useState<string | undefined>(undefined);
  const [solutionAvailable, setSolutionAvailable] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [response, setResponse] = useState<FTML.ProblemResponse | undefined>({
    uri: "http://stexmmt.mathhub.info/:sTeX?a=courses/FAU/KRMT/hwexam&p=quizzes/SS25&d=quiz02&l=en&e=section/problem_1",
    responses: [
      {
        type: "MultipleChoice",
        value: [true, true, false, true, true, false],
      },
    ],
  });
  useEffect(() => {
    injectCss([{ Link: "srv:/rustex.css" }]);
    fetch(`/api/get-problem?problemIdx=${problemIdx}`)
      .then((response) => response.json())
      .then((data: { problem: QuizProblem; solution: string | undefined }) => {
        setProblem(data.problem);
        setSolution(data.solution);
      })
      .catch((error) => console.error("Error:", error));
  }, [problemIdx]);
  if (!problem) return <div>Loading...</div>;

  const problemState = getProblemState(isFrozen, solutionAvailable ? solution : undefined, response);
  const problemStates = new Map([[problem.uri, problemState]]);
  console.log("problemState", problemState);
  console.log("problemStates", problemStates);
  // Alternative: Convert Map to object for better console display
  console.log("problemStates as object", Object.fromEntries(problemStates));
  return (
    <div>
      <button onClick={() => setSolutionAvailable(!solutionAvailable)}>
        {solutionAvailable ? "Make Solution unavailable" : "Make Solution available"}
      </button>
      <button onClick={() => setIsFrozen(!isFrozen)}>
        {isFrozen ? "Unfreeze" : "Freeze"} Problem
      </button>
      <FTMLFragment
        fragment={{ type: "HtmlString", html: problem.html, uri: problem.uri }}
        key={problem.uri}
        allowHovers={isFrozen}
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
