import { contentToc } from "@flexiformal/ftml-backend";
import { FTMLDocument } from "@flexiformal/ftml-react";
import { useEffect } from "react";


const Test = () => {
  
  useEffect(() => {
    const notes = "http://mathhub.info?a=courses/FAU/AI/course&p=course/notes&d=notes1&l=en"
    if (!notes) return;

    contentToc({ uri: notes }).then(([css, toc] = [[], []]) => {
     
    });
   
  }, []);

  return (
    <div>
      <FTMLDocument
        document={{
          type: "FromBackend",
          uri: "https://mathhub.info?a=courses/FAU/AI/course&p=logic/sec&d=atp1&l=en",
        }}
      />
    </div>
  );
};

export default Test;