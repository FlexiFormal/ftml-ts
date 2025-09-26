import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FTML } from "@flexiformal/ftml";
import { FtmlConfig } from ".";

type LeptosContext = FTML.LeptosContext;

export const ReactLeptosContext = createContext<LeptosContext | undefined>(
    undefined,
);
interface Tunnel {
    element: Element;
    node: ReactNode;
    context: LeptosContext;
    id: string; // for React keys
}

export function toConfig(
    config: FtmlConfig,
    addTunnel: (
        element: Element,
        node: ReactNode,
        context: FTML.LeptosContext,
    ) => string,
): FTML.FtmlConfig {
    let cfg: FTML.FtmlConfig = {
        allowHovers: config.allowHovers,
        allowFullscreen: config.allowFullscreen,
        allowFormalInfo: config.allowFormalInfo,
        allowNotationChanges: config.allowNotationChanges,
        chooseHighlightStyle: config.chooseHighlightStyle,
        showContent: config.showContent,
        pdfLink: config.pdfLink,
        toc: config.toc,
        tocProgress: config.tocProgress,
        autoexpandLimit: config.autoexpandLimit,
        onProblemResponse: config.onProblemResponse,
        problemStates: config.problemStates,
    };
    const ost = config.onSectionTitle;
    if (ost) {
        cfg.onSectionTitle = (u, lvl) => {
            return (e, ctx) => {
                addTunnel(e, ost(u, lvl), ctx);
            };
        };
    }
    const sect = config.sectionWrap;
    if (sect) {
        cfg.sectionWrap = (u, lvl) => {
            return (e, ctx) => {
                const r = sect(u, lvl);
                if (r) {
                    addTunnel(e, r(elemToReact(e, ctx)), ctx);
                }
            };
        };
    }
    const para = config.paragraphWrap;
    if (para) {
        cfg.paragraphWrap = (u, knd) => {
            return (e, ctx) => {
                const r = para(u, knd);
                if (r) {
                    addTunnel(e, r(elemToReact(e, ctx)), ctx);
                }
            };
        };
    }
    const slide = config.slideWrap;
    if (slide) {
        cfg.slideWrap = (u) => {
            return (e, ctx) => {
                const r = slide(u);
                if (r) {
                    addTunnel(e, r(elemToReact(e, ctx)), ctx);
                }
            };
        };
    }
    const problem = config.problemWrap;
    if (problem) {
        cfg.problemWrap = (u, sub) => {
            return (e, ctx) => {
                const r = problem(u, sub);
                if (r) {
                    addTunnel(e, r(elemToReact(e, ctx)), ctx);
                }
            };
        };
    }
    return cfg;
}

export function elemToReact(
    elem: HTMLDivElement,
    ctx: FTML.LeptosContext,
): ReactNode {
    const chs = Array.from(elem.childNodes);
    chs.forEach((c) => elem.removeChild(c));
    return <ElemToReact elems={chs} ctx={ctx} />;
}

const ElemToReact: React.FC<{
    elems: ChildNode[];
    ctx: FTML.LeptosContext;
}> = ({ elems, ctx }) => {
    const ref = useRef<HTMLDivElement>(null);
    const done = useRef<boolean>(false);
    useEffect(() => {
        if (ref.current && !done.current) {
            done.current = true;
            ref.current.replaceChildren(...elems);
        }
    }, []);
    return (
        <ReactLeptosContext.Provider value={ctx}>
            <div ref={ref} style={{ display: "contents" }} />
        </ReactLeptosContext.Provider>
    );
};

export function useLeptosTunnel() {
    const [tunnel, setTunnel] = useState<Tunnel | undefined>(undefined);

    const addTunnel = (
        element: Element,
        node: ReactNode,
        context: LeptosContext,
    ) => {
        const id = Math.random().toString(36).slice(2);
        setTunnel({ element, node, id, context });
        return id; // Return id for later removal
    };

    const removeTunnel = () => {
        setTunnel(undefined);
    };

    const TunnelRenderer = () =>
        tunnel ? (
            createPortal(
                <ReactLeptosContext.Provider value={tunnel.context}>
                    {tunnel.node}
                </ReactLeptosContext.Provider>,
                tunnel.element,
                tunnel.id,
            )
        ) : (
            <></>
        );

    useEffect(() => {
        return () => {
            if (tunnel) {
                //try{tunnel.context.cleanup();} catch (e){console.log("Error cleaning up leptos context:",e)}
            }
        };
    });

    return {
        addTunnel,
        removeTunnel,
        TunnelRenderer,
    };
}

export function useLeptosTunnels() {
    const [tunnels, setTunnels] = useState<Tunnel[]>([]);

    const addTunnel = (
        element: Element,
        node: ReactNode,
        context: LeptosContext,
    ) => {
        const id = Math.random().toString(36).slice(2);
        setTunnels((prev) => [...prev, { element, node, id, context }]);
        return id; // Return id for later removal
    };

    const removeTunnel = (id: string) => {
        setTunnels((prev) =>
            prev.filter((tunnel) => {
                if (tunnel.id === id) {
                    //try{tunnel.context.cleanup();} catch (e){console.log("Error cleaning up leptos context:",e)}
                }
                return tunnel.id !== id;
            }),
        );
    };

    const TunnelRenderer = () => (
        <>
            {tunnels.map((tunnel) =>
                createPortal(
                    <ReactLeptosContext.Provider value={tunnel.context}>
                        {tunnel.node}
                    </ReactLeptosContext.Provider>,
                    tunnel.element,
                    tunnel.id,
                ),
            )}
        </>
    );

    useEffect(() => {
        return () => {
            tunnels.forEach((tunnel) => {
                //try{tunnel.context.cleanup();} catch (e){console.log("Error cleaning up leptos context:",e)}
            });
        };
    });

    return {
        addTunnel,
        removeTunnel,
        TunnelRenderer,
    };
}
