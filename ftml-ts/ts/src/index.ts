export * as FTML from "./ftml/ftml";
import * as FTML from "./ftml/ftml";

export type ProblemFeedback = FTML.ProblemFeedback;
export type Solutions = FTML.Solutions;

declare global {
    interface Window {
        FTML_SERVER_URL?: string;
    }
    var FTML_SERVER_URL: string | undefined;
}

export async function initialize(
    backendUrl?: string,
    logLevel?: FTML.LogLevel,
) {
    await FTML.init();
    FTML.initialize(backendUrl, logLevel);
    if (backendUrl) {
        if (typeof window !== 'undefined') {
            window.FTML_SERVER_URL = backendUrl;
        }
        if (globalThis !== undefined) globalThis.FTML_SERVER_URL = backendUrl;
    }
}

export function injectCss(css: FTML.Css[]) {
    FTML.inject_css(css);
}

export function ftmlSetup(
    to: HTMLElement,
    cont: (e: HTMLElement, c: FTML.LeptosContext) => void,
    config?: FTML.FtmlConfig,
): FTML.LeptosMountHandle {
    return FTML.top(to, cont, config);
}

export function ftmlDocument(
    to: HTMLElement,
    document: FTML.DocumentOptions,
    context?: FTML.LeptosContext,
    config?: FTML.FtmlConfig,
): FTML.LeptosMountHandle {
    return FTML.render_document(to, context, config, document);
}

export function ftmlFragment(
    to: HTMLElement,
    fragment: FTML.FragmentOptions,
    context?: FTML.LeptosContext,
    config?: FTML.FtmlConfig,
): FTML.LeptosMountHandle {
    return FTML.render_fragment(to, context, config, fragment);
}
