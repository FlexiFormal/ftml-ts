import { FTMLDocument, FTMLSetup } from "@flexiformal/ftml-react";

  
function Notes() {
  const notesUri = "http://mathhub.info?a=courses/FAU/AI/course&p=course/notes&d=notes1&l=en";
  return (
    <div>
      <h1>Notes</h1>
          <FTMLDocument
            key={notesUri}
            document={{ type: 'FromBackend', uri: notesUri }}
          />
    </div>
  );
}

export default Notes;