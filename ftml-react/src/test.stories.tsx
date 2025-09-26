/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode, useState } from "react";
import {
    FTMLDocument,
    FTMLFragment,
    FTMLSetup,
    initialize,
    FTML as Base,
} from "./index";

export default {
    title: "Full Test",
};

await initialize("http://localhost:3000", "DEBUG");

export const Complete = () => {
    //console.log("Server URL according to leptos:", getServerUrl());
    const doc = {
        type: "FromBackend",
        uri: "http://mathhub.info?a=sTeX/MathTutorial&d=textbook&l=en",
        toc: "GET",
    } as Base.FTML.DocumentOptions;
    const frag1 = {
        type: "FromBackend",
        uri: "http://mathhub.info?a=sTeX/DemoExamples&d=problemtest&l=en&e=problem_1",
    } as Base.FTML.FragmentOptions;
    const frag2 = {
        type: "FromBackend",
        uri: "http://mathhub.info?a=sTeX/DemoExamples&d=problemtest&l=en&e=problem_3",
    } as Base.FTML.FragmentOptions;
    /*initialize("https://mathhub.info", "DEBUG").then(() => {
        console.log("initialized!");
        });*/
    return (
        <div
            className="NARF"
            style={{
                width: "100vw",
                height: "100vh",
                maxHeight: "100vh",
                overflow: "scroll",
            }}
        >
            <FTMLSetup>
                <h1>React & FTML</h1>
                <div className="card">
                    <Click />
                </div>
                <p>Here is a problem:</p>
                <div>
                    <FTMLFragment fragment={frag1} />
                </div>
                <p>
                    And here is one that logs every interaction to the console:
                </p>
                <div>
                    <FTMLFragment
                        fragment={frag2}
                        onProblemResponse={(e) => console.log(e)}
                    />
                </div>
                <p> And here is a full document:</p>
                <div>
                    <FTMLDocument
                        document={doc}
                        onSectionTitle={(uri, _lvl) => (
                            <SectionTitle sec={uri} />
                        )}
                        sectionWrap={(uri, lvl) => {
                            if (lvl.type === "Section") {
                                return (ch) => (
                                    <SectionWrap uri={uri}>{ch}</SectionWrap>
                                );
                            }
                        }}
                    />
                </div>
            </FTMLSetup>
        </div>
    );
};

const SectionTitle: React.FC<{ sec: string }> = ({ sec }) => {
    return (
        <div style={{ textAlign: "center" }}>
            <p>Here's a clicker thingy for {sec}:</p>
            <Click />
        </div>
    );
};

const Click: React.FC = () => {
    const [count, setCount] = useState(0);
    return (
        <>
            <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>
            <p>Foo Bar</p>
        </>
    );
};

const SectionWrap: React.FC<{ uri: string; children: ReactNode }> = ({
    uri,
    children,
}) => {
    return (
        <div
            style={{
                border: "1px solid red",
                margin: "1em 0",
                width: "calc(100%)",
            }}
        >
            <div style={{ textAlign: "center" }}>
                <p>This is the start of a section: {uri}!</p>
            </div>
            {children}
            <div style={{ textAlign: "center" }}>
                <p>This is the end of a section!</p>
            </div>
        </div>
    );
};
