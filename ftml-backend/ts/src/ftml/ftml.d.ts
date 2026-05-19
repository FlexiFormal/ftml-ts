/* tslint:disable */
/* eslint-disable */
/**
 * The `ReadableStreamType` enum.
 *
 * *This API requires the following crate features to be activated: `ReadableStreamType`*
 */

export type ReadableStreamType = "bytes";
/**
 * An entry in a table of contents. Either:
 * 1. a section; the title is assumed to be an HTML string, or
 * 2. an inputref to some other document; the URI is the one for the
 *    inputref itself; not the referenced Document. For the TOC,
 *    which document is inputrefed is actually irrelevant.
 */
export type TocElem = { type: "Section"; title?: string | undefined; uri: DocumentElementUri; id: string; children?: TocElem[] } | { type: "SkippedSection"; children?: TocElem[] } | { type: "Inputref"; uri: DocumentUri; title?: string | undefined; id: string; children?: TocElem[] } | { type: "Paragraph"; styles?: Id[]; kind: ParagraphKind } | { type: "Slide" };

/**
 * Either a list of booleans (multiple choice), a single integer (single choice),
 * or a string (fill-in-the-gaps)
 */
export type ProblemResponseType = { type: "MultipleChoice"; value?: boolean[] } | { type: "SingleChoice"; value?: number | undefined } | { type: "Fillinsol"; value: string };

/**
 * Either a variable or a symbol reference
 */
export type VarOrSym = { Sym: SymbolUri } | { Var: Variable };

/**
 * The type of FTML expressions.
 *
 * Similarly to
 * [<span style=\"font-variant:small-caps;\">OpenMath</span>](https://openmath.org),
 * FTML expressions are foundation-independent, but more expressive by hardcoding
 * [Theories-as-Types]()-like record \"types\".
 */
export type Term = { Symbol: { uri: SymbolUri; presentation: VarOrSym | undefined } } | { Var: { variable: Variable; presentation: VarOrSym | undefined } } | { Application: ApplicationTerm } | { Bound: BindingTerm } | { Field: RecordFieldTerm } | { Label: { name: UriName; df?: Term | undefined; tp?: Term | undefined } } | { Opaque: OpaqueTerm } | { Number: Numeric };

/**
 * Wrapper for [`OrderedFloat`] for serialization reasons
 */
export type Float = number;

/**
 * Wrapper for [`OrderedFloat`] for serialization reasons
 */
export type Float64 = number;

export const UnknownDocument = "http://unknown.source?a=no/archive&d=unknown_document&l=en"

export interface AnswerClass {
    id: Id;
    feedback: string;
    kind: AnswerKind;
    description: string;
}

export interface Application {
    head: Term;
    arguments: Argument[];
    presentation?: VarOrSym | undefined;
}

export interface ArchiveData {
    id: ArchiveId;
    git?: string | undefined;
    summary?: FileStateSummary | undefined;
}

export interface ArchiveGroupData {
    id: ArchiveId;
    summary?: FileStateSummary | undefined;
}

export interface Assignment {
    original: SymbolUri;
    morphism: SymbolUri;
    definiens?: Term | undefined;
    refined_type?: Term | undefined;
    new_name?: SimpleUriName | undefined;
    macroname?: Id | undefined;
    source?: SourceRange;
}

export interface Binding {
    head: Term;
    arguments: BoundArgument[];
    presentation?: VarOrSym | undefined;
}

export interface BlockFeedback {
    is_correct: boolean;
    verdict_str: string;
    feedback: string;
}

export interface Branch {
    name: string;
    default: boolean;
    commit: Commit;
}

export interface Choice {
    correct: boolean;
    verdict: string;
    feedback: string;
}

export interface ChoiceBlock {
    multiple: boolean;
    block_style: ChoiceBlockStyle;
    range: DocumentRange;
    styles?: Id[];
    choices?: Choice[];
}

export interface Commit {
    id: string;
    created_at: string;
    parent_ids: string[];
    title: string;
    message: string;
    author_name: string;
}

export interface ComponentVar {
    var: Variable;
    tp: Term | undefined;
    df: Term | undefined;
}

export interface DataRef {
    start: number;
    end: number;
}

export interface DirectoryData {
    rel_path: string;
    summary?: FileStateSummary | undefined;
}

export interface DocDataRef {
    start: number;
    end: number;
    in_doc: DocumentUri;
}

export interface DocumentCounter {
    name: Id;
    parent: SectionLevel | undefined;
}

export interface DocumentData {
    uri: DocumentUri;
    title?: string | undefined;
    elements?: DocumentElement[];
    styles: DocumentStyles;
    top_section_level: SectionLevel;
    kind: DocumentKind;
}

export interface DocumentRange {
    start: number;
    end: number;
}

export interface DocumentStyle {
    kind: ParagraphKind;
    name: Id | undefined;
    counter: Id | undefined;
}

export interface DocumentStyles {
    counters: DocumentCounter[];
    styles: DocumentStyle[];
}

export interface DocumentTerm {
    uri: DocumentElementUri;
    term: TermContainer;
    inferred_type?: MutableTerm;
}

export interface FileData {
    rel_path: string;
    format: string;
}

export interface FileStateSummary {
    new: number;
    stale: number;
    deleted: number;
    up_to_date: number;
    last_built: Timestamp;
    last_changed: Timestamp;
}

export interface FillInSol {
    width?: number | undefined;
    opts?: FillInSolOption[];
}

export interface FillinFeedback {
    is_correct: boolean;
    feedback: string;
    kind: FillinFeedbackKind;
}

export interface GradingNote {
    html: string;
    answer_classes?: AnswerClass[];
}

export interface Instance {
    semester: string;
    instructors?: string[] | undefined;
    TAs?: string[] | undefined;
    leadTAs?: string[] | undefined;
}

export interface LogicalParagraph {
    kind: ParagraphKind;
    uri: DocumentElementUri;
    formatting: ParagraphFormatting;
    range: DocumentRange;
    title?: string | undefined;
    styles?: Id[];
    premises?: Term[];
    binds_variables?: DocumentElementUri[];
    children?: DocumentElement[];
    fors?: [SymbolUri, TermContainer | undefined][];
    steps?: ParagraphStep[];
    source?: SourceRange;
}

export interface MathStructure {
    uri: SymbolUri;
    elements: StructureDeclaration[];
    macroname?: Id | undefined;
    source?: SourceRange;
}

export interface ModuleData {
    uri: ModuleUri;
    meta_module?: ModuleUri | undefined;
    signature?: Language | undefined;
    declarations: Declaration[];
    source?: SourceRange;
}

export interface Morphism {
    uri: SymbolUri;
    domain: ModuleUri;
    total: boolean;
    elements: Assignment[];
    source?: SourceRange;
}

export interface NestedModule {
    uri: SymbolUri;
    declarations: Declaration[];
    source?: SourceRange;
}

export interface Notation {
    precedence: number;
    id?: Id | undefined;
    argprecs?: number[];
    component: NotationComponent;
    op?: NotationNode | undefined;
}

export interface NotationNode {
    tag: Id;
    attributes?: [Id, string][];
    children?: NodeOrText[];
}

export interface NotationReference {
    symbol: SymbolUri;
    uri: DocumentElementUri;
    notation: DataRef;
    source?: SourceRange;
}

export interface Opaque {
    node: OpaqueNode;
    terms?: Term[];
}

export interface OpaqueNode {
    tag: Id;
    attributes?: [Id, string][];
    children?: AnyOpaque[];
}

export interface Problem {
    uri: DocumentElementUri;
    range: DocumentRange;
    children?: DocumentElement[];
    data: ProblemData;
}

export interface ProblemData {
    sub_problem: boolean;
    autogradable: boolean;
    points: number | undefined;
    minutes: number | undefined;
    solutions: DataRef;
    gnotes?: DataRef[];
    hints?: DataRef[];
    notes?: DataRef[];
    title: string | undefined;
    styles?: Id[];
    preconditions?: [CognitiveDimension, SymbolUri][];
    objectives?: [CognitiveDimension, SymbolUri][];
    source?: SourceRange;
}

export interface ProblemFeedbackJson {
    correct: boolean;
    solutions?: string[];
    data?: CheckedResult[];
    score_fraction: number;
}

export interface ProblemResponse {
    uri: DocumentElementUri;
    responses?: ProblemResponseType[];
}

export interface Project {
    id: number;
    name: string;
    path_with_namespace: string;
    http_url_to_repo: string;
    default_branch: string | undefined;
}

export interface Quiz {
    css?: Css[];
    title?: string | undefined;
    elements?: QuizElement[];
    solutions?: [DocumentElementUri,string][];
    answer_classes?: [DocumentElementUri,AnswerClass[]][];
}

export interface QuizProblem {
    html: string;
    title_html?: string | undefined;
    uri: DocumentElementUri;
    total_points?: number | undefined;
    preconditions?: [CognitiveDimension, SymbolUri][];
    objectives?: [CognitiveDimension, SymbolUri][];
}

export interface RecordField {
    record: Term;
    key: UriName;
    /**
     * does not count as a subterm
     */
    record_type?: Term | undefined;
    presentation?: VarOrSym | undefined;
}

export interface Section {
    range: DocumentRange;
    uri: DocumentElementUri;
    title?: string | undefined;
    children?: DocumentElement[];
    source?: SourceRange;
}

export interface Slide {
    range: DocumentRange;
    uri: DocumentElementUri;
    title?: string | undefined;
    children?: DocumentElement[];
    source?: SourceRange;
}

export interface SourcePos {
    line: number;
    col: number;
}

export interface SourceRange {
    start: SourcePos;
    end: SourcePos;
}

export interface StructureExtension {
    uri: SymbolUri;
    target: SymbolUri;
    elements: StructureDeclaration[];
    source?: SourceRange;
}

export interface Symbol {
    uri: SymbolUri;
    data: SymbolData;
}

export interface SymbolData {
    arity: ArgumentSpec;
    macroname?: Id | undefined;
    role?: Id[];
    tp?: TermContainer;
    df?: TermContainer;
    return_type?: Term | undefined;
    argument_types?: Term[];
    assoctype?: AssocType | undefined;
    reordering?: Permutation | undefined;
    source?: SourceRange;
}

export interface TermContainer {
    parsed: Term | undefined;
    presentation?: Term | undefined;
    checked?: Term | undefined;
    source?: SourceRange;
}

export interface TreeEntry {
    name: string;
    path: string;
    type: DirOrFile;
}

export interface VariableData {
    arity: ArgumentSpec;
    macroname?: Id | undefined;
    role?: Id[];
    tp?: TermContainer;
    df?: TermContainer;
    bind?: boolean;
    assoctype?: AssocType | undefined;
    reordering?: Permutation | undefined;
    argument_types?: Term[];
    return_type?: Term | undefined;
    is_seq?: boolean;
    sequence_range?: Term[];
    source?: SourceRange;
}

export interface VariableDeclaration {
    uri: DocumentElementUri;
    data: VariableData;
}

export interface VariableNotationReference {
    variable: DocumentElementUri;
    uri: DocumentElementUri;
    notation: DataRef;
    source?: SourceRange;
}

export type AnswerKind = { type: "Class"; value: number } | { type: "Trait"; value: number };

export type AnyOpaque = { Term: number } | { Node: OpaqueNode } | { Text: string };

export type ApplicationTerm = Application;

export type ArchiveId = string;

export type ArchiveIndex = { type: "library"; archive: ArchiveId; title: string; teaser?: string | undefined; thumbnail?: string | undefined } | { type: "book"; title: string; authors: string[]; file: DocumentUri; teaser?: string | undefined; thumbnail?: string | undefined } | { type: "paper"; title: string; authors: string[]; file: DocumentUri; thumbnail?: string | undefined; teaser?: string | undefined; venue?: string | undefined; venue_url?: string | undefined } | { type: "course"; title: string; landing: DocumentUri; acronym: string | undefined; authors?: string[]; institution: string | undefined; notes: DocumentUri; slides?: DocumentUri | undefined; thumbnail?: string | undefined; teaser?: string | undefined } | { type: "self-study"; title: string; landing: DocumentUri; notes: DocumentUri; authors?: string[]; acronym?: string | undefined; slides?: DocumentUri | undefined; thumbnail?: string | undefined; teaser?: string | undefined };

export type ArchiveUri = string;

export type Argument = { Simple: Term } | { Sequence: MaybeSequence<Term> };

export type ArgumentMode = "Simple" | "Sequence" | "BoundVariable" | "BoundVariableSequence";

export type ArgumentSpec = ArgumentMode[];

export type AssocType = "LeftAssociativeBinary" | "RightAssociativeBinary" | "Conjunctive" | "PairwiseConjunctive" | "Prenex";

export type BaseUri = string;

export type BindingTerm = Binding;

export type BoundArgument = { Simple: Term } | { Sequence: MaybeSequence<Term> } | { Bound: ComponentVar } | { BoundSeq: MaybeSequence<ComponentVar> };

export type CheckedResult = { type: "SingleChoice"; selected?: number | undefined; choices?: BlockFeedback[] } | { type: "MultipleChoice"; selected?: boolean[]; choices?: BlockFeedback[] } | { type: "FillinSol"; matching?: number | undefined; text: string; options?: FillinFeedback[] };

export type ChoiceBlockStyle = "Block" | "Inline" | "Dropdown";

export type CognitiveDimension = "Remember" | "Understand" | "Apply" | "Analyze" | "Evaluate" | "Create";

export type Css = { Link: string } | { Inline: string } | { Class: { name: string; css: string } };

export type Declaration = { NestedModule: NestedModule } | { Import: { uri: ModuleUri; source?: SourceRange } } | { Symbol: Symbol } | { MathStructure: MathStructure } | { Morphism: Morphism } | { Extension: StructureExtension } | { Rule: { id: Id; parameters: Term[]; source?: SourceRange } };

export type DirOrFile = "tree" | "blob";

export type DocumentElement = { UseModule: { uri: ModuleUri; source?: SourceRange } } | { Module: { range: DocumentRange; module: ModuleUri; children?: DocumentElement[] } } | { MathStructure: { range: DocumentRange; structure: SymbolUri; children?: DocumentElement[] } } | { Extension: { range: DocumentRange; extension: SymbolUri; target: SymbolUri; children?: DocumentElement[] } } | { Morphism: { range: DocumentRange; morphism: SymbolUri; children?: DocumentElement[] } } | { SymbolDeclaration: SymbolUri } | { ImportModule: ModuleUri } | { Section: Section } | { SkipSection: DocumentElement[] } | { Paragraph: LogicalParagraph } | { Problem: Problem } | { Slide: Slide } | { DocumentReference: { uri: DocumentElementUri; target: DocumentUri; source?: SourceRange } } | { Notation: NotationReference } | { VariableDeclaration: VariableDeclaration } | { VariableNotation: VariableNotationReference } | { Definiendum: { range: DocumentRange; uri: SymbolUri; source?: SourceRange } } | { SymbolReference: { range: DocumentRange; uri: SymbolUri; notation?: Id | undefined; source?: SourceRange } } | { VariableReference: { range: DocumentRange; uri: DocumentElementUri; notation?: Id | undefined; source?: SourceRange } } | { Term: DocumentTerm };

export type DocumentElementUri = string;

export type DocumentKind = "Article" | "Fragment" | { Exam: { date: Timestamp; course: Id; retake: boolean; num: number; term: Id | undefined } } | { Homework: { date: Timestamp; course: Id; num: number; term: Id | undefined } } | { Quiz: { date: Timestamp; course: Id; num: number; term: Id | undefined } };

export type DocumentUri = string;

export type DomainUri = string;

export type FillInSolOption = { Exact: { value: string; verdict: boolean; feedback: string } } | { NumericalRange: { from?: number | undefined; to?: number | undefined; verdict: boolean; feedback: string } } | { Regex: { regex: Regex; verdict: boolean; feedback: string } };

export type FillinFeedbackKind = { Exact: string } | { NumRange: { from: number | undefined; to: number | undefined } } | { Regex: string };

export type Id = string;

export type Institution = { type: "university"; title: string; place: string; country: string; url: string; acronym: string; logo: string } | { type: "school"; title: string; place: string; country: string; url: string; acronym: string; logo: string };

export type LeafUri = string;

export type MaybeSequence<T> = { One: T } | { Seq: T[] };

export type ModuleUri = string;

export type NarrativeUri = string;

export type NodeOrText = { type: "Node"; value: NotationNode } | { type: "Text"; value: string };

export type NotationComponent = { type: "Node"; tag: Id; attributes?: [Id, string][]; children?: NotationComponent[] } | { type: "Argument"; index: number; mode: ArgumentMode } | { type: "ArgSep"; index: number; mode: ArgumentMode; sep?: NotationComponent[] } | { type: "ArgMap"; index: number; segments?: NotationComponent[] } | { type: "MainComp"; node: NotationNode } | { type: "Comp"; node: NotationNode } | { type: "Text"; txt: string };

export type Numeric = { Int: number } | { Float: Float64 };

export type OpaqueTerm = Opaque;

export type ParagraphFormatting = "Block" | "Inline" | "Collapsed";

export type ParagraphKind = "Definition" | "Assertion" | "Paragraph" | "Proof" | "SubProof" | "Example";

export type ParagraphOrProblemKind = { type: "Definition" } | { type: "Example" } | ({ type: "Problem" } & CognitiveDimension) | ({ type: "SubProblem" } & CognitiveDimension);

export type ParagraphStep = { type: "ProofAssumption"; var_name?: DocumentElementUri | undefined; method?: [Term, SourceRange] | undefined; justification?: [Term, SourceRange] | undefined; arguments?: ([Term, SourceRange] | undefined)[]; yields?: [Term, SourceRange] | undefined } | { type: "ProofStep"; var_name?: DocumentElementUri | undefined; method?: [Term, SourceRange] | undefined; justification?: [Term, SourceRange] | undefined; arguments?: ([Term, SourceRange] | undefined)[]; yields?: [Term, SourceRange] | undefined } | { type: "ProofConclusion"; var_name?: DocumentElementUri | undefined; method?: [Term, SourceRange] | undefined; justification?: [Term, SourceRange] | undefined; arguments?: ([Term, SourceRange] | undefined)[]; yields?: [Term, SourceRange] | undefined } | { type: "Subproof"; uri: DocumentElementUri; var_name?: DocumentElementUri | undefined; method?: [Term, SourceRange] | undefined; justification?: [Term, SourceRange] | undefined; arguments?: ([Term, SourceRange] | undefined)[]; yields?: [Term, SourceRange] | undefined; steps?: Self[] } | { type: "EquationStep" };

export type ParagraphStepKind = "Assumption" | "ProofStep" | "Conclusion" | "EquationStep" | "SubProof";

export type PathUri = string;

export type Permutation = number[];

export type QuizElement = { type: "Section"; title: string; elements?: QuizElement[] } | ({ type: "Problem" } & QuizProblem) | { type: "Paragraph"; html: string };

export type RecordFieldTerm = RecordField;

export type Regex = string;

export type SearchResult = { Document: DocumentUri } | { Paragraph: { uri: DocumentElementUri; fors: SymbolUri[]; def_like: boolean; kind: SearchResultKind } };

export type SearchResultKind = "Document" | "Paragraph" | "Definition" | "Example" | "Assertion" | "Problem";

export type SectionLevel = { type: "Part" } | { type: "Chapter" } | { type: "Section" } | { type: "Subsection" } | { type: "Subsubsection" } | { type: "Paragraph" } | { type: "Subparagraph" };

export type SimpleUriName = string;

export type SlideElement = { type: "Slide"; html: string; uri: DocumentElementUri } | { type: "Paragraph"; html: string; uri: DocumentElementUri } | { type: "Inputref"; uri: DocumentUri } | { type: "Section"; uri: DocumentElementUri; title?: string | undefined; children?: SlideElement[] };

export type SolutionData = { Solution: { html: string; answer_class?: Id | undefined } } | { ChoiceBlock: ChoiceBlock } | { FillInSol: FillInSol };

export type StructureDeclaration = { type: "Import"; uri: ModuleUri; source?: SourceRange } | ({ type: "Symbol" } & Symbol) | ({ type: "Morphism" } & Morphism) | { type: "Rule"; id: Id; parameters: Term[]; source?: SourceRange };

export type SymbolUri = string;

export type TermPath = SVec<number>;

export type Timestamp = number;

export type Uri = string;

export type UriName = string;

export type UriPath = string;

export type Variable = { Name: { name: Id; notated?: Id | undefined } } | { Ref: { declaration: DocumentElementUri; is_sequence?: boolean | undefined } };


export class IntoUnderlyingByteSource {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    cancel(): void;
    pull(controller: ReadableByteStreamController): Promise<any>;
    start(controller: ReadableByteStreamController): void;
    readonly autoAllocateChunkSize: number;
    readonly type: ReadableStreamType;
}

export class IntoUnderlyingSink {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    abort(reason: any): Promise<any>;
    close(): Promise<any>;
    write(chunk: any): Promise<any>;
}

export class IntoUnderlyingSource {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    cancel(): void;
    pull(controller: ReadableStreamDefaultController): Promise<any>;
}

/**
 * Represents supported languages in [`DocumentUri`](crate::DocumentUri)s
 *
 * This enum provides a ist of supported languages, their Unicode flag representations and SVG flag icons.
 */
export enum Language {
    /**
     * English language ([ISO 639-1](https://en.wikipedia.org/wiki/ISO_639): en)
     *
     * Default language variant. Uses the United Kingdom flag representation.
     */
    English = 0,
    /**
     * German language ([ISO 639-1](https://en.wikipedia.org/wiki/ISO_639): de)
     *
     * Uses the Germany flag representation.
     */
    German = 1,
    /**
     * French language ([ISO 639-1](https://en.wikipedia.org/wiki/ISO_639): fr)
     *
     * Uses the France flag representation.
     */
    French = 2,
    /**
     * Romanian language ([ISO 639-1](https://en.wikipedia.org/wiki/ISO_639): ro)
     *
     * Uses the Romania flag representation.
     */
    Romanian = 3,
    /**
     * Arabic language ([ISO 639-1](https://en.wikipedia.org/wiki/ISO_639): ar)
     *
     * Uses the United Arab Emirates flag representation.
     */
    Arabic = 4,
    /**
     * Bulgarian language ([ISO 639-1](https://en.wikipedia.org/wiki/ISO_639): bg)
     *
     * Uses the Bulgaria flag representation.
     */
    Bulgarian = 5,
    /**
     * Russian language ([ISO 639-1](https://en.wikipedia.org/wiki/ISO_639): ru)
     *
     * Uses the Russia flag representation.
     */
    Russian = 6,
    /**
     * Finnish language ([ISO 639-1](https://en.wikipedia.org/wiki/ISO_639): fi)
     *
     * Uses the Finland flag representation.
     */
    Finnish = 7,
    /**
     * Turkish language ([ISO 639-1](https://en.wikipedia.org/wiki/ISO_639): tr)
     *
     * Uses the Turkey flag representation.
     */
    Turkish = 8,
    /**
     * Slovenian language ([ISO 639-1](https://en.wikipedia.org/wiki/ISO_639): sl)
     *
     * Uses the Slovenia flag representation.
     */
    Slovenian = 9,
}

export class ProblemFeedback {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static from_json(arg0: ProblemFeedbackJson): ProblemFeedback;
    static from_jstring(s: string): ProblemFeedback | undefined;
    to_json(): ProblemFeedbackJson;
    to_jstring(): string | undefined;
    correct: boolean;
    score_fraction: number;
}

export class Solutions {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    check_response(response: ProblemResponse): ProblemFeedback | undefined;
    default_feedback(): ProblemFeedback;
    static from_jstring(s: string): Solutions | undefined;
    static from_solutions(solutions: SolutionData[]): Solutions;
    to_jstring(): string | undefined;
    to_solutions(): SolutionData[];
}

export function rdf_encode(s: string): string | undefined;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_get_problemfeedback_correct: (a: number) => number;
    readonly __wbg_get_problemfeedback_score_fraction: (a: number) => number;
    readonly __wbg_problemfeedback_free: (a: number, b: number) => void;
    readonly __wbg_set_problemfeedback_correct: (a: number, b: number) => void;
    readonly __wbg_set_problemfeedback_score_fraction: (a: number, b: number) => void;
    readonly __wbg_solutions_free: (a: number, b: number) => void;
    readonly problemfeedback_from_json: (a: number) => number;
    readonly problemfeedback_from_jstring: (a: number, b: number) => number;
    readonly problemfeedback_to_json: (a: number) => number;
    readonly problemfeedback_to_jstring: (a: number, b: number) => void;
    readonly solutions_check_response: (a: number, b: number) => number;
    readonly solutions_default_feedback: (a: number) => number;
    readonly solutions_from_jstring: (a: number, b: number) => number;
    readonly solutions_from_solutions: (a: number, b: number) => number;
    readonly solutions_to_jstring: (a: number, b: number) => void;
    readonly solutions_to_solutions: (a: number, b: number) => void;
    readonly rdf_encode: (a: number, b: number, c: number) => void;
    readonly __wbg_intounderlyingbytesource_free: (a: number, b: number) => void;
    readonly __wbg_intounderlyingsink_free: (a: number, b: number) => void;
    readonly __wbg_intounderlyingsource_free: (a: number, b: number) => void;
    readonly intounderlyingbytesource_autoAllocateChunkSize: (a: number) => number;
    readonly intounderlyingbytesource_cancel: (a: number) => void;
    readonly intounderlyingbytesource_pull: (a: number, b: number) => number;
    readonly intounderlyingbytesource_start: (a: number, b: number) => void;
    readonly intounderlyingbytesource_type: (a: number) => number;
    readonly intounderlyingsink_abort: (a: number, b: number) => number;
    readonly intounderlyingsink_close: (a: number) => number;
    readonly intounderlyingsink_write: (a: number, b: number) => number;
    readonly intounderlyingsource_cancel: (a: number) => void;
    readonly intounderlyingsource_pull: (a: number, b: number) => number;
    readonly __wasm_bindgen_func_elem_971: (a: number, b: number, c: number, d: number) => void;
    readonly __wasm_bindgen_func_elem_1037: (a: number, b: number, c: number, d: number) => void;
    readonly __wbindgen_export: (a: number, b: number) => number;
    readonly __wbindgen_export2: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_export3: (a: number) => void;
    readonly __wbindgen_export4: (a: number, b: number) => void;
    readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
    readonly __wbindgen_export5: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
