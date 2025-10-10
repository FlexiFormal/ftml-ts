import { FTML } from "@flexiformal/ftml";
import { FTMLFragment } from "@flexiformal/ftml-react";
import { useState } from "react";


function getProblemState(
  isFrozen: boolean,
  solution?: string,
  current_response?: FTML.ProblemResponse
): FTML.ProblemState {
  if (!isFrozen) return { type: "Interactive", current_response, solution: undefined };
  if (!solution) return { type: "Finished", current_response };
  const sol = FTML.Solutions.from_jstring(solution.replace(/^"|"$/g, ""));
  const feedback = current_response
    ? sol?.check_response(current_response)
    : sol?.default_feedback();
  if (!feedback) return { type: "Finished", current_response }; // Something went wrong!!
  return { type: "Graded", feedback: feedback };
}

function UriProblemViewer({ uri }: { uri: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState<FTML.ProblemResponse | undefined>(
    undefined
  );
  const [solution, setSolution] = useState<string | undefined>(undefined);
  const problemState = getProblemState(submitted, solution, response);

  return (
    <div>
      <FTMLFragment
        key={`${uri}-${problemState.type}`}
        fragment={{ type:'FromBackend',uri }}
        allowHovers={submitted}
        problemStates={new Map([[uri, problemState]])}
        onProblemResponse={(response: FTML.ProblemResponse) => {
          setResponse(response);
        }}
      />
      <button onClick={() => setSubmitted(true)} disabled={submitted}>
        Submit Answer
      </button>
      <br />
      <pre>[{JSON.stringify(problemState, null, 2)}]</pre>
    </div>
  );
}

const OnFragmentPage = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const uri =
    "https://mathhub.info?a=courses/FAU/IWGS/course&p=legal/quiz&d=cc_cc-by-nd_compatibility&l=en&e=problem";

  return <UriProblemViewer uri={uri} />;
};

export default OnFragmentPage;