import { FTML, injectCss } from "@flexiformal/ftml";
import { FTMLFragment } from "@flexiformal/ftml-react";
import { useEffect, useState } from "react";

import problemData from "./api/justifications1.json";

export default function StepJustificationsPage() {
  const [response, setResponse] = useState<FTML.ProblemResponse>();

  useEffect(() => {
    injectCss(problemData.css as FTML.CSS[]);
  }, []);

  const problemState: FTML.ProblemState = {
    type: "Interactive",
    current_response: response,
    solution: undefined,
  };

  return (
    <div>
      <FTMLFragment
        fragment={{
          type: "HtmlString",
          html: problemData.html,
          uri: problemData.uri,
        }}
        problemStates={new Map([[problemData.uri, problemState]])}
        onProblemResponse={(next) => {
          console.log("Received problem response:", next);
          setResponse(next);
        }}
        allowHovers={false}
      />
      <br/>
      <hr/>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
}
