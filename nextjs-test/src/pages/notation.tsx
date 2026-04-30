import { FTMLDocument } from "@flexiformal/ftml-react";

function Notation() {
  const notesUri =
    "http://mathhub.info?a=courses/FAU/AI/course&p=course/notes&d=notes2&l=en";
  return (
    <div style={{ background: "white" }}>
      <h1>Notes</h1>
      <FTMLDocument
        key={notesUri}
        allowNotationChanges={true}
        document={{ type: "FromBackend", uri: notesUri }}
        toc="Get"
      />
    </div>
  );
}

export default Notation;