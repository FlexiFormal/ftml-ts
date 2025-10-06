import * as Base from "./ftml/ftml";
export {
    DocumentUri,
    Language,
    SymbolUri,
    DocumentElementUri,
    Uri,
    Institution,
    ArchiveIndex,
    QueryFilter,
    SearchResult,
    SearchResultKind,
    ArchiveGroupData,
    ArchiveData,
    DirectoryData,
    FileData,
    ArchiveId,
    TocElem,
    Css,
    ParagraphOrProblemKind,
    Quiz,
    QuizElement,
    QuizProblem,
    SlideElement,
    SolutionData,
    ProblemResponse,
    ProblemFeedbackJson,
} from "./ftml/ftml";

declare global {
    interface Window {
        FTML_SERVER_URL?: string;
    }
    var FTML_SERVER_URL: string | undefined;
}

function getUrl(): string {
    if (typeof window !== 'undefined') {
        if (window.FTML_SERVER_URL) {
            return window.FTML_SERVER_URL;
        }
    }
    if (globalThis !== undefined) {
        if (globalThis.FTML_SERVER_URL) {
            return globalThis.FTML_SERVER_URL;
        }
    }
    return "https://mathhub.info";
}

export type DocumentUriParams =
    | { uri: Base.DocumentUri }
    | { a: string; rp: string }
    | { a: string; p?: string; d: string; l: Base.Language };

export type SymbolUriParams =
    | { uri: Base.SymbolUri }
    | { a: string; p?: string; m: string; s: string };

export type DocumentElementUriParams =
    | { uri: Base.DocumentElementUri }
    | { a: string; p?: string; d: string; l: Base.Language; e: string };

export type URIParams =
    | { uri: Base.Uri }
    | { a: string } // ArchiveUri
    | { a: string; rp: string } // DocumentUri
    | { a: string; p?: string; d: string; l?: Base.Language } // DocumentUri
    | { a: string; p?: string; d: string; l?: Base.Language; e: string } // DocumentElementUri
    | { a: string; p?: string; m: string; l?: Base.Language } // ModuleUri
    | { a: string; p?: string; m: string; l?: Base.Language; s: string }; // SymbolUri

/**
 * All institutions and `archive.json`-registered documents
 */
export async function index(): Promise<
    [Base.Institution[], Base.ArchiveIndex[]] | undefined
> {
    return await rawPostRequest("api/index", {});
}

/**
 * Full-text search for documents, assuming the given filter
 */
export async function searchDocs(
    query: string,
    filter: Base.QueryFilter,
    numResults: number,
): Promise<[number, Base.SearchResult][] | undefined> {
    return await rawPostRequest("api/search", {
        query: query,
        opts: filter,
        num_results: numResults,
    });
}

/**
 * Full-text search for (definitions of) symbols
 */
export async function searchSymbols(
    query: string,
    numResults: number,
): Promise<[Base.SymbolUri, [number, Base.SearchResult][]][] | undefined> {
    return await rawPostRequest("api/search_symbols", {
        query: query,
        num_results: numResults,
    });
}

/**
 * List all archives/groups in the given group (or at top-level, if undefined)
 */
export async function backendGroupEntries(
    in_entry?: string,
): Promise<[Base.ArchiveGroupData[], Base.ArchiveData[]] | undefined> {
    return await rawPostRequest("api/backend/group_entries", {
        in: in_entry,
    });
}

/**
 * List all directories/files in the given archive at path (or at top-level, if undefined)
 */
export async function backendArchiveEntries(
    archive: string,
    in_path?: string,
): Promise<[Base.DirectoryData[], Base.FileData[]] | undefined> {
    return await rawPostRequest("api/backend/archive_entries", {
        archive: archive,
        path: in_path,
    });
}

/**
 * SPARQL query
 */
export async function query(sparql: String): Promise<any> {
    return await rawPostRequest("api/backend/query", { query: sparql });
}

/**
 * Get all dependencies of the given archive (excluding meta-inf archives)
 */
export async function archiveDependencies(
    archives: Base.ArchiveId[],
): Promise<Base.ArchiveId[] | undefined> {
    return await rawPostRequest("api/backend/archive_dependencies", {
        archives: archives,
    });
}

/**
 * Return the TOC of the given document
 */
export async function contentToc(
    uri: DocumentUriParams,
): Promise<[Base.Css[], Base.TocElem[]] | undefined> {
    return await rawGetRequest("content/toc", uri);
}

/**
 * Get all learning objects for the given symbol; if problems === true, this includes Problems and Subproblems;
 * otherwise, only definitions and examples.
 */
export async function learningObjects(
    uri: SymbolUriParams,
    problems?: boolean,
): Promise<[[string, Base.ParagraphOrProblemKind]] | undefined> {
    const exc = problems ? problems : false;
    const sym =
        "uri" in uri
            ? { uri: uri.uri, problems: exc }
            : { a: uri.a, p: uri.p, m: uri.m, s: uri.s, problems: exc };
    return await rawGetRequest("content/los", sym);
}

/**
 * Get the quiz in the given document.
 */
export async function quiz(
    uri: DocumentUriParams,
): Promise<Base.Quiz | undefined> {
    return await rawGetRequest("content/quiz", uri);
}

/**
 * Return slides for the given document / section
 */
export async function slides(
    uri: URIParams,
): Promise<[Base.Css[], Base.SlideElement[]] | undefined> {
    return await rawGetRequest("content/slides", uri);
}

/**
 * Return a git[lab|hub] link for the source file containing the given element
 */
export async function sourceFile(uri: URIParams): Promise<string | undefined> {
    return await rawGetRequest("api/backend/source_file", uri);
}

/**
 * Batch grade an arrray of <solution,response[]> pairs.
 * Each of the responses will be graded against the corresponding solution, and the resulting
 * feedback returned at the same position. If *any* of the responses is malformed,
 * the whole batch will fail.
 * A SolutionData[] can be obtained from Solutions.to_solutions(). A ProblemFeedbackJson
 * can be turned into a "proper" ProblemFeedback using ProblemFeedback.from_json().
 */
export async function batchGrade(
    ...submissions: [
        Base.SolutionData[],
        (Base.ProblemResponse | undefined)[],
    ][]
): Promise<Base.ProblemFeedbackJson[][] | undefined> {
    return await rawPostJson("content/grade", {
        submissions: submissions,
    });
}
/**
 * Like batchGrade, but uses hex-encoded solutions
 */
export async function batchGradeHex(
    ...submissions: [string, (Base.ProblemResponse | undefined)[]][]
): Promise<Base.ProblemFeedbackJson[][] | undefined> {
    return await rawPostJson("content/grade_enc", {
        submissions: submissions,
    });
}

/**
 * Get the solution for the problem with the given URI. As string, so it can be
 * deserialized by the ts binding for the WASM datastructure
 */
export async function solution(
    uri: DocumentElementUriParams,
): Promise<string | undefined> {
    let r = await getRequestI("content/solution", uri);
    if (r) {
        return await r.text();
    }
}

export async function title(
    uri: URIParams,
): Promise<[Base.Css[], string] | undefined> {
    return await rawGetRequest("content/title", { uri: uri });
}

export async function contentDocument(
    uri: DocumentUriParams,
): Promise<[Base.DocumentUri, Base.Css[], string] | undefined> {
    return await rawGetRequest("content/document", uri);
}

export async function contentFragment(
    uri: URIParams,
): Promise<[Base.Css[], string] | undefined> {
    return await rawGetRequest("content/fragment", uri);
}

async function rawGetRequest<
    TRequest extends Record<string, unknown>,
    TResponse,
>(endpoint: string, request: TRequest): Promise<TResponse | undefined> {
    const response = await getRequestI(endpoint, request);
    if (response) {
        const j = await response.json();
        return j as TResponse;
    }
}

async function getRequestI<TRequest extends Record<string, unknown>>(
    endpoint: string,
    request: TRequest,
): Promise<Response | undefined> {
    const encodeParam = (v: unknown): string => {
        return encodeURIComponent(JSON.stringify(v));
    };
    const buildQueryString = (obj: unknown, prefix = ""): string[] => {
        const params: string[] = [];
        if (obj === null || obj === undefined) {
            return params;
        }
        if (Array.isArray(obj)) {
            if (prefix) {
                params.push(`${prefix}=${encodeParam(obj)}`);
            }
        } else if (typeof obj === "string") {
            params.push(`${prefix}=${encodeURIComponent(obj)}`);
        } else if (typeof obj === "object" && !(obj instanceof Date)) {
            if (prefix) {
                params.push(`${prefix}=${encodeParam(obj)}`);
            } else {
                for (const [key, value] of Object.entries(obj)) {
                    const newPrefix = prefix ? `${prefix}[${key}]` : key;
                    params.push(...buildQueryString(value, newPrefix));
                }
            }
        } else {
            const value = obj instanceof Date ? obj.toISOString() : obj;
            params.push(`${prefix}=${encodeParam(value)}`);
        }
        return params;
    };

    const queryString = buildQueryString(request).join("&");
    const backendUrl = getUrl();
    const url = `${backendUrl}/${endpoint}${queryString ? "?" + queryString : ""}`;
    console.log("Calling", url);
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    });
    if (response.ok) {
        return response;
    }
}

async function rawPostRequest<
    TRequest extends Record<string, unknown>,
    TResponse,
>(endpoint: string, request: TRequest): Promise<TResponse | undefined> {
    const response = await postRequestI(endpoint, request);
    if (response) {
        const j = await response.json();
        return j as TResponse;
    }
}

async function rawPostJson<TRequest extends Record<string, unknown>, TResponse>(
    endpoint: string,
    request: TRequest,
): Promise<TResponse | undefined> {
    const backendUrl = getUrl();
    const formData = JSON.stringify(request);
    const response = await fetch(`${backendUrl}/${endpoint}`, {
        method: "POST",
        body: formData,
    });

    if (response.ok) {
        const j = await response.json();
        return j as TResponse;
    }
}

async function postRequestI<TRequest extends Record<string, unknown>>(
    endpoint: string,
    request: TRequest,
): Promise<Response | undefined> {
    const backendUrl = getUrl();
    const formData = new URLSearchParams();
    const appendToForm = (obj: unknown, prefix = ""): void => {
        if (Array.isArray(obj)) {
            obj.forEach((v, i) => appendToForm(v, `${prefix}[${i}]`));
        } else if (obj instanceof Date) {
            formData.append(prefix, obj.toISOString());
        } else if (obj && typeof obj === "object" && !(obj instanceof File)) {
            for (const [key, value] of Object.entries(obj)) {
                const newPrefix = prefix ? `${prefix}[${key}]` : key;
                appendToForm(value, newPrefix);
            }
        } else if (obj !== undefined && obj !== null) {
            formData.append(prefix, String(obj));
        }
    };
    appendToForm(request);
    console.log(`Calling ${backendUrl}/${endpoint} with body`, formData);
    const response = await fetch(`${backendUrl}/${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
    });

    if (response.ok) {
        return response;
    }
}
