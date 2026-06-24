import { FTMLDocument } from "@flexiformal/ftml-react";

  
function Notes() {
  const notesUri = "https://mathhub.info?a=courses/FAU/AI/course&p=course/notes&d=notes2&l=en"
  const gottos = [
  {
    uri:
      "http://mathhub.info?a=courses/FAU/AI/course&p=course/sec&d=resources&l=en&e=section",
    timestamp: 1776176100000,
  },
  {
    uri:
      "http://mathhub.info?a=courses/FAU/AI/course&p=probabilistic-reasoning/sec&d=probability-theory&l=en&e=section/section_1",
    timestamp: 1776233700000,
  },
  {
    uri:
      "http://mathhub.info?a=courses/FAU/AI/course&p=probabilistic-reasoning/sec&d=techniques&l=en&e=section/section_1",
    timestamp: 1776780900000,
  },
  {
    uri:
      "http://mathhub.info?a=courses/FAU/AI/course&p=probabilistic-reasoning/sec&d=BN-intro2&l=en&e=section",
    timestamp: 1776838500000,
  },
  {
    uri:
      "http://mathhub.info?a=courses/FAU/AI/course&p=probabilistic-reasoning/sec&d=BN-inference2&l=en&e=section",
    timestamp: 1777385700000,
  },
  {
    uri:
      "http://mathhub.info?a=courses/FAU/AI/course&p=rational-decisions/sec&d=simple-decisions-intro&l=en&e=section",
    timestamp: 1777443300000,
  },
  {
    uri:
      "http://mathhub.info?a=courses/FAU/AI/course&p=rational-decisions/sec&d=multi-attribute-utility&l=en&e=section",
    timestamp: 1777990500000,
  },
  {
    uri:
      "http://mathhub.info?a=courses/FAU/AI/course&p=probabilistic-reasoning/sec&d=time-uncertainty&l=en&e=section",
    timestamp: 1778048100000,
  },
  {
    uri:
      "http://mathhub.info?a=courses/FAU/AI/course&p=probabilistic-reasoning/sec&d=DBN&l=en&e=section",
    timestamp: 1778595300000,
  },
  {
    uri:
      "http://mathhub.info?a=courses/FAU/AI/course&p=rational-decisions/sec&d=POMDP&l=en&e=section",
    timestamp: 1778652900000,
  },
  {
    uri:
      "http://mathhub.info?a=courses/FAU/AI/course&p=rational-decisions/sec&d=POMDP-agent&l=en&e=section",
    timestamp: 1779200100000,
  },
  {
    uri:
      "http://mathhub.info?a=courses/FAU/AI/course&p=ml/sec&d=information-theory&l=en&e=section",
    timestamp: 1779257700000,
  },
  {
    uri: "http://mathhub.info?a=courses/FAU/AI/course&p=ml/sec&d=evaluation&l=en&e=section",
    timestamp: 1779862500000,
  },
  {
    uri:
      "http://mathhub.info?a=courses/FAU/AI/course&p=ml/sec&d=linear-regression&l=en&e=section/section_1",
    timestamp: 1780409700000,
  },
  {
    uri:
      "http://mathhub.info?a=courses/FAU/AI/course&p=ml/sec&d=neural-networks&l=en&e=section",
    timestamp: 1780467300000,
  },
  {
    uri:
      "http://mathhub.info?a=courses/FAU/AI/course&p=ml/sec&d=Bayesian-learning-approx&l=en&e=section",
    timestamp: 1781014500000,
  },
  {
    uri:
      "http://mathhub.info?a=courses/FAU/AI/course&p=ml/sec&d=active-learning&l=en&e=section",
    timestamp: 1781072100000,
  },
  {
    uri: "http://mathhub.info?a=courses/FAU/AI/course&p=ml/sec&d=ILP&l=en&e=section",
    timestamp: 1781619300000,
  },
  {
    uri: "http://mathhub.info?a=courses/FAU/AI/course&p=ml/sec&d=IR&l=en&e=section",
    timestamp: 1781676900000,
  },
  {
    uri:
      "http://mathhub.info?a=courses/FAU/AI/course&p=nlp/sec&d=nls-phenomena&l=en&e=section",
    timestamp: 1782224100000,
  },
  {
    uri: "http://mathhub.info?a=courses/FAU/AI/course&p=nlp/sec&d=pos&l=en&e=section",
    timestamp: 1782281700000,
  },
];
  return (
    <div>
      <h1>Notes</h1>
          <FTMLDocument
            key={notesUri}
            document={{ type: 'FromBackend', uri: notesUri }}
            toc="Get"
            tocProgress={gottos}
          />
    </div>
  );
}

export default Notes;