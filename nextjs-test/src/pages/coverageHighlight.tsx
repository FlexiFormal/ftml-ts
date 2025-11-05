import { FTMLDocument } from "@flexiformal/ftml-react";

function CoverageHighlight() {
  const notesUri =
    "http://mathhub.info?a=courses/FAU/AI/course&p=course/notes&d=notes1&l=en";
  return (
    <div>
      <h1>Notes</h1>
      <FTMLDocument
        key={notesUri}
        document={{ type: "FromBackend", uri: notesUri }}
        toc={"Get"}
        tocProgress={[
          {
            uri: "http://mathhub.info?a=courses/FAU/AI/course&p=course/sec&d=getting-most&l=en&e=section",
            timestamp: 1760451300000,
          },
          {
            uri: "http://mathhub.info?a=courses/FAU/AI/course&p=intro/sec&d=whatisai&l=en&e=section",
            timestamp: 1760611782175,
          },
          {
            uri: "http://mathhub.info?a=courses/FAU/AI/course&p=intro/sec&d=agi&l=en&e=section",
            timestamp: 1761056100000,
          },
          {
            uri: "http://mathhub.info?a=courses/FAU/AI/course&p=prolog/sec&d=intro&l=en&e=section",
            timestamp: 1761664500000,
          },
          {
            uri: "http://mathhub.info?a=courses/FAU/AI/course&p=prolog/sec&d=prolog-features&l=en&e=section",
            timestamp: 1761808500000,
          },
          {
            uri: "http://mathhub.info?a=courses/FAU/AI/course&p=rational-agents/sec&d=rationality&l=en&e=section",
            timestamp: 1762269300000,
          },
        ]}
      />
    </div>
  );
}

export default CoverageHighlight;
