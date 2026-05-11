import { FTML } from "@flexiformal/ftml";
import { contentToc } from "@flexiformal/ftml-backend";
import { FTMLDocument } from "@flexiformal/ftml-react";
import { useEffect, useState } from "react";

function Notes() {
  const [toc, setToc] = useState<FTML.TocElem[] | undefined>(undefined);
  const notesUri =
    "http://mathhub.info?a=courses/FAU/AI/course&p=course/notes&d=notes1&l=en";

  useEffect(() => {
    setToc(undefined);
    contentToc({ uri: notesUri }).then(
      ([_css, _, toc] = [[], { type: "Part" }, []]) => {
        setToc(toc);
      },
    );
  }, [notesUri]);
  if (!toc) return <div>Loading...</div>;
  return (
    <div>
      <h1>Notes</h1>
      <FTMLDocument
        key={notesUri}
        document={{ type: "FromBackend", uri: notesUri }}
        toc={{ Ready: toc }}
      />
    </div>
  );
}

export default Notes;
