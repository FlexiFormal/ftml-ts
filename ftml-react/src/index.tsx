import * as Base from "@flexiformal/ftml";
export * as FTML from "@flexiformal/ftml";
import { ReactNode, useContext, useEffect, useRef } from "react";
import {
    useLeptosTunnel,
    useLeptosTunnels,
    ReactLeptosContext,
    toConfig,
} from "./leptos";

export const initialize = Base.initialize;

export function getCurrentUri(): Base.FTML.NarrativeUri | undefined {
    const context = useContext(ReactLeptosContext);
    if (context) {
        return Base.FTML.get_current_uri(context);
    }
}

export interface FtmlConfig {
    allowHovers?: boolean;
    allowFullscreen?: boolean;
    allowFormalInfo?: boolean;
    allowNotationChanges?: boolean;
    chooseHighlightStyle?: boolean;
    showContent?: boolean;
    pdfLink?: boolean;
    highlightStyle?: Base.FTML.HighlightStyle;
    toc?: Base.FTML.TocSource;
    autoexpandLimit?: Base.FTML.LogicalLevel;
    tocProgress?: Base.FTML.TocProgress[];
    sectionWrap?: (
        uri: Base.FTML.DocumentElementUri,
        lvl: Base.FTML.SectionLevel,
    ) => ((ch: ReactNode) => ReactNode) | undefined;
    paragraphWrap?: (
        uri: Base.FTML.DocumentElementUri,
        kind: Base.FTML.ParagraphKind,
    ) => ((ch: ReactNode) => ReactNode) | undefined;
    slideWrap?: (
        uri: Base.FTML.DocumentElementUri,
    ) => ((ch: ReactNode) => ReactNode) | undefined;
    problemWrap?: (
        uri: Base.FTML.DocumentElementUri,
        subProblem: boolean,
    ) => ((ch: ReactNode) => ReactNode) | undefined;
    onSectionTitle?: (
        uri: Base.FTML.DocumentElementUri,
        lvl: Base.FTML.SectionLevel,
    ) => ReactNode | undefined;
    problemStates?: Base.FTML.ProblemStates;
    onProblemResponse?: (r: Base.FTML.ProblemResponse) => void;
}

export interface FTMLSetupArgs extends FtmlConfig {
    children: ReactNode;
}

/**
 * Sets up Leptos' reactive system
 */
export const FTMLSetup: React.FC<FTMLSetupArgs> = (args) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const main = useLeptosTunnel();
    const { addTunnel, TunnelRenderer } = useLeptosTunnels();
    const context = useContext(ReactLeptosContext);

    useEffect(() => {
        if (!mountRef.current) return;
        if (context) {
            const handle = Base.FTML.apply_config(
                toConfig(args, addTunnel),
                mountRef.current,
                context,
            );
            return () => {
                handle.unmount();
            };
        } else {
            const handle = Base.ftmlSetup(
                mountRef.current,
                (e, o) => {
                    main.addTunnel(
                        e,
                        <>
                            {args.children}
                            <TunnelRenderer />
                        </>,
                        o,
                    );
                },
                toConfig(args, addTunnel),
            );
            return () => {
                handle.unmount();
            };
        }
    }, []);

    return (
        <>
            <div ref={mountRef} style={{ display: "contents" }} />
            <main.TunnelRenderer />
        </>
    );
};

/**
 * See {@link FTMLConfig} and {@link FTML.DocumentOptions}
 */
export interface FTMLDocumentArgs extends FtmlConfig {
    document: Base.FTML.DocumentOptions;
}

/**
 * render an FTML document
 */
export const FTMLDocument: React.FC<FTMLDocumentArgs> = (args) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const { addTunnel, TunnelRenderer } = useLeptosTunnels();
    const context = useContext(ReactLeptosContext);

    useEffect(() => {
        if (mountRef.current === null) return;
        const handle = Base.ftmlDocument(
            mountRef.current,
            args.document,
            context,
            toConfig(args, addTunnel),
        );
        return () => {
            handle.unmount();
        };
    }, []);
    return (
        <div style={{ textAlign: "start" }}>
            <div ref={mountRef} />
            <TunnelRenderer />
        </div>
    );
};

/**
 * See {@link FTMLConfig} and {@link Base.FTML.FragmentOptions}
 */
export interface FTMLFragmentArgs extends FtmlConfig {
    fragment: Base.FTML.FragmentOptions;
}

/**
 * render an FTML fragment
 */
export const FTMLFragment: React.FC<FTMLFragmentArgs> = (args) => {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const { addTunnel, TunnelRenderer } = useLeptosTunnels();
    const context = useContext(ReactLeptosContext);

    useEffect(() => {
        if (!mountRef.current) return;
        const handle = Base.ftmlFragment(
            mountRef.current,
            args.fragment,
            context,
            toConfig(args, addTunnel),
        );
        return () => {
            handle.unmount();
        };
    }, []);
    return (
        <div style={{ textAlign: "start" }}>
            <div ref={mountRef} />
            <TunnelRenderer />
        </div>
    );
};
