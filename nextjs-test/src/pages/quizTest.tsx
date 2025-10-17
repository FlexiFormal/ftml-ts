import { FTML } from "@flexiformal/ftml";
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

function UriProblemViewer({ quiz, uri }: { quiz: FTML.Quiz; uri: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState<FTML.ProblemResponse | undefined>(
    undefined
  );
  const [solution, setSolution] = useState<string | undefined>(undefined);
  const problemState = getProblemState(submitted, solution, response);

  if (!quiz.elements?.[0]) return <div>Loading...</div>;
  if (quiz.elements[0].type !== "Problem") return <div>Boom</div>;
  return (
    <div>
      <FTMLFragment
        key={uri}
        fragment={{ type: "HtmlString", html: quiz.elements[0].html, uri }}
        allowHovers={false} //isFrozen}
        problemStates={new Map([[uri, problemState]])}
        onProblemResponse={(response) => {
          setResponse(response);
        }}
      />
    </div>
  );
}

const OnFragmentPage = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [quiz, setQuiz] = useState<FTML.Quiz | undefined>(undefined);

  useEffect(() => {
    console.log("fetching quiz");
    fetch("/api/get-quiz")
      .then((response) => response.json())
      .then((data) => setQuiz(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const uri =
    "https://mathhub.info?a=courses/FAU/IWGS/course&p=legal/quiz&d=cc_cc-by-nd_compatibility&l=en&e=problem";

  if (!quiz) return <div>Loading...</div>;
  return <UriProblemViewer quiz={quiz} uri={uri} />;
};

export default OnFragmentPage;
