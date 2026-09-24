import { learningObjects } from "@flexiformal/ftml-backend";
import { useEffect, useState } from "react";

const SYMBOL_URI =
  "http://mathhub.info?a=courses/FAU/ElemStoch/course&p=course/sec&m=zaehlprinzipien&s=Variation%20mit%20Wiederholung";

const UNESCAPED_URI = SYMBOL_URI.replaceAll("%20", " ");

export default function LearningObjectsTest() {
  const [escapedResult, setEscapedResult] = useState("");
  const [unescapedResult, setUnescapedResult] = useState("");

  useEffect(() => {
    learningObjects({ uri: SYMBOL_URI }, true).then((result) => {
      setEscapedResult(JSON.stringify(result, null, 2));
    });

    learningObjects({ uri: UNESCAPED_URI }, true).then((result) => {
      setUnescapedResult(JSON.stringify(result, null, 2));
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Learning objects</h1>

      <h2>URI with %20</h2>
      <p>{SYMBOL_URI}</p>
      <pre>{escapedResult}</pre>

      <h2>URI with spaces</h2>
      <p>{UNESCAPED_URI}</p>
      <pre>{unescapedResult}</pre>
    </div>
  );
}
