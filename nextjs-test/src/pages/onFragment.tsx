import { FTMLDocument } from "@flexiformal/ftml-react";
import { ReactNode } from "react";

const SectionWrap: React.FC<{ uri: string; children: ReactNode }> = ({
  uri,
  children,
}) => {
  return (
    <div
      style={{ border: "1px solid red", margin: "1em 0", width: "fit-content" }}
    >
      <div style={{ textAlign: "center" }}>
        <p><b>This is the start of a section: {uri}!</b></p>
      </div>
      {children}
      <div style={{ textAlign: "center" }}>
        <p><b>This is the end of a section!</b></p>
      </div>
    </div>
  );
};

const OnFragmentPage = () => {
  const uri =
    "http://mathhub.info?a=courses/FAU/AI/course&p=course/notes&d=notes1&l=en";
  return (
    <div>
      <FTMLDocument
        document={{ type: "FromBackend", uri }}
        sectionWrap={(uri, _) => {
          return (ch) => <SectionWrap uri={uri} children={ch} />;
        }}
      />
    </div>
  );
};

export default OnFragmentPage;
