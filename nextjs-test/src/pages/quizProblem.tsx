import { FTML, injectCss } from "@flexiformal/ftml";
import { FTMLFragment } from "@flexiformal/ftml-react";
import { useEffect, useReducer, useState } from "react";

import quiz from "./api/quiz-5d6d9b60.json";

const [firstProblem] = Object.values(quiz.problems);
const { css } = quiz;
const { problem } = firstProblem;

export default function QuizProblemPage() {
  const [response, setResponse] = useState<FTML.ProblemResponse>();

  useEffect(() => {
    injectCss(css);
  }, []);

  const problemState: FTML.ProblemState = {
    type: "Interactive",
    current_response: response,
    solution: undefined,
  };
    const [, forceRerender] = useReducer((x) => x + 1, 0);

  return (
    <>
      <FTMLFragment
        fragment={{ type: "HtmlString", html: problem.html, uri: problem.uri }}
        problemStates={new Map([[problem.uri, problemState]])}
        onProblemResponse={(response) => {
          console.log("Received problem response:", response);
          setResponse(response);
          forceRerender();
        }}
        allowHovers={false}
      />
    </>
  );
}

