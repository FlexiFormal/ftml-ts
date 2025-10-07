/* tslint:disable */
/* eslint-disable */
export function render_fragment(to: HTMLElement, context: LeptosContext | null | undefined, config: any, fragment: FragmentOptions): LeptosMountHandle;
export function apply_config(config: any, to: HTMLElement, context?: LeptosContext | null): LeptosMountHandle;
export function top(e: HTMLElement, then: any, config: any): LeptosMountHandle;
export function render_document(to: HTMLElement, context: LeptosContext | null | undefined, config: any, document: DocumentOptions): LeptosMountHandle;
export function inject_css(css: Css[]): void;
export function get_current_uri(context: LeptosContext): string;
export function initialize(url?: string | null, log_level?: LogLevel | null): void;
export function print_cache(): void;
export function clear_cache(): void;
export enum HighlightStyle {
  Colored = 0,
  Subtle = 1,
  Off = 2,
  None = 3,
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
export enum ThemeType {
  Light = 0,
  Dark = 1,
}
/**
 * The `ReadableStreamType` enum.
 *
 * *This API requires the following crate features to be activated: `ReadableStreamType`*
 */
type ReadableStreamType = "bytes";
export type DocumentOptions = { type: "FromBackend"; uri: DocumentUri } | { type: "HtmlString"; html: string; uri: DocumentUri | undefined };

export type FragmentOptions = { type: "FromBackend"; uri: DocumentElementUri } | { type: "HtmlString"; html: string; uri: DocumentElementUri | undefined };

export function init(): Promise<void>;

export type LogLevel = "TRACE" | "DEBUG" | "INFO" | "WARN" | "ERROR";

export interface FtmlViewerConfig extends FtmlConfig {
    redirects?: [DocumentUri, string][];
    backendUrl?: string | undefined;
    logLevel?: LogLevel;
}


export type ProblemContinuation = (r:ProblemResponse) => void;


export type ProblemState = { type: "Interactive"; current_response: OrigResponse | undefined; solution: Solutions | undefined } | { type: "Finished"; current_response: OrigResponse | undefined } | { type: "Graded"; feedback: ProblemFeedback };

export type ProblemStates = Map<DocumentElementUri,ProblemState>;

export type SectionWrap = (u:DocumentElementUri, lvl:SectionLevel) => (LeptosContinuation | undefined);

export type ProblemWrap = (u:DocumentElementUri, sub_problem:boolean) => (LeptosContinuation | undefined);

export type OnSectionTitle = (u:DocumentElementUri, lvl:SectionLevel) => (LeptosContinuation | undefined);

export type ParagraphWrap = (u:DocumentElementUri, kind:ParagraphKind) => (LeptosContinuation | undefined);

export type SlideWrap = (u:DocumentElementUri) => (LeptosContinuation | undefined);


export interface FtmlConfig {
    allowHovers?:boolean;
    allowFullscreen?:boolean;
    allowFormalInfo?:boolean;
    allowNotationChanges?:boolean;
    chooseHighlightStyle?:boolean;
    showContent?:boolean;
    pdfLink?:boolean;
    documentUri?:DocumentUri;
    highlightStyle?:HighlightStyle;
    toc?:TocSource;
    tocProgress?:TocProgress[];
    autoexpandLimit?:LogicalLevel;
    sectionWrap?:SectionWrap;
    paragraphWrap?:ParagraphWrap;
    slideWrap?:SlideWrap;
    problemWrap?:ProblemWrap;
    onSectionTitle?:OnSectionTitle;
    problemStates?:ProblemStates;
    onProblemResponse?:ProblemContinuation;
}


/**
 * A section that has been \"covered\" at the specified timestamp; will be marked accordingly
 * in the TOC.
 */
export interface TocProgress {
    uri: DocumentElementUri;
    timestamp?: Timestamp | undefined;
}


export type LeptosContinuation = (e:HTMLDivElement,o:LeptosContext) => void;


export interface DocumentMeta {
    uri: DocumentUri | undefined;
    language: Language | undefined;
}

export type TocSource = "None" | "Extract" | { Ready: TocElem[] } | "Get";

export type LogicalLevel = { type: "None" } | ({ type: "Section" } & SectionLevel) | { type: "Paragraph" } | { type: "BeamerSlide" };

export interface NestedModule {
    uri: SymbolUri;
    declarations: Declaration[];
}

export interface ModuleData {
    uri: ModuleUri;
    meta_module?: ModuleUri | undefined;
    signature?: Language | undefined;
    declarations: Declaration[];
}

export interface Choice {
    correct: boolean;
    verdict: string;
    feedback: string;
}

export type FillInSolOption = { Exact: { value: string; verdict: boolean; feedback: string } } | { NumericalRange: { from: number | undefined; to: number | undefined; verdict: boolean; feedback: string } } | { Regex: { regex: Regex; verdict: boolean; feedback: string } };

export interface ChoiceBlock {
    multiple: boolean;
    block_style: ChoiceBlockStyle;
    range: DocumentRange;
    styles: Id[];
    choices: Choice[];
}

export type ChoiceBlockStyle = "Block" | "Inline" | "Dropdown";

export type SolutionData = { Solution: { html: string; answer_class: Id | undefined } } | { ChoiceBlock: ChoiceBlock } | { FillInSol: FillInSol };

export interface FillInSol {
    width: number | undefined;
    opts: FillInSolOption[];
}

/**
 * Either a variable or a symbol reference
 */
export type VarOrSym = { Sym: SymbolUri } | { Var: Variable };

export interface MathStructure {
    uri: SymbolUri;
    elements: StructureDeclaration[];
    macroname?: Id | undefined;
}

export interface StructureExtension {
    uri: SymbolUri;
    target: SymbolUri;
    elements: StructureDeclaration[];
}

export type StructureDeclaration = ({ type: "Import" } & ModuleUri) | ({ type: "Symbol" } & Symbol) | ({ type: "Morphism" } & Morphism);

export interface Problem {
    uri: DocumentElementUri;
    range: DocumentRange;
    children?: DocumentElement[];
    data: ProblemData;
}

export interface AnswerClass {
    id: Id;
    feedback: string;
    kind: AnswerKind;
    description: string;
}

export type AnswerKind = ({ type: "Class" } & number) | ({ type: "Trait" } & number);

export type CognitiveDimension = "Remember" | "Understand" | "Apply" | "Analyze" | "Evaluate" | "Create";

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
}

export interface GradingNote {
    html: string;
    answer_classes?: AnswerClass[];
}

export interface Application {
    head: Term;
    arguments: Argument[];
    presentation?: VarOrSym | undefined;
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

/**
 * The type of FTML expressions.
 *
 * Similarly to
 * [<span style=\"font-variant:small-caps;\">OpenMath</span>](https://openmath.org),
 * FTML expressions are foundation-independent, but more expressive by hardcoding
 * [Theories-as-Types]()-like record \"types\".
 */
export type Term = { Symbol: { uri: SymbolUri; presentation: VarOrSym | undefined } } | { Var: { variable: Variable; presentation: VarOrSym | undefined } } | { Application: ApplicationTerm } | { Bound: BindingTerm } | { Field: RecordFieldTerm } | { Label: { name: UriName; df?: Term | undefined; tp?: Term | undefined } } | { Opaque: OpaqueTerm };

export type BindingTerm = Binding;

export type RecordFieldTerm = RecordField;

export type ApplicationTerm = Application;

export type OpaqueTerm = Opaque;

export interface Opaque {
    node: OpaqueNode;
    terms?: Term[];
}

export interface Binding {
    head: Term;
    arguments: BoundArgument[];
    presentation?: VarOrSym | undefined;
}

export type Css = { Link: string } | { Inline: string } | { Class: { name: string; css: string } };

export interface Section {
    range: DocumentRange;
    uri: DocumentElementUri;
    title: string | undefined;
    children: DocumentElement[];
}

export type SectionLevel = { type: "Part" } | { type: "Chapter" } | { type: "Section" } | { type: "Subsection" } | { type: "Subsubsection" } | { type: "Paragraph" } | { type: "Subparagraph" };

export type DocumentKind = "Article" | "Fragment" | { Exam: { date: Timestamp; course: Id; retake: boolean; num: number; term: Id } } | { Homework: { date: Timestamp; course: Id; num: number; term: Id } } | { Quiz: { date: Timestamp; course: Id; num: number; term: Id } };

/**
 * An entry in a table of contents. Either:
 * 1. a section; the title is assumed to be an HTML string, or
 * 2. an inputref to some other document; the URI is the one for the
 *    inputref itself; not the referenced Document. For the TOC,
 *    which document is inputrefed is actually irrelevant.
 */
export type TocElem = { type: "Section"; title: string | undefined; uri: DocumentElementUri; id: string; children: TocElem[] } | { type: "SkippedSection"; children: TocElem[] } | { type: "Inputref"; uri: DocumentUri; title: string | undefined; id: string; children: TocElem[] } | { type: "Paragraph"; styles: Id[]; kind: ParagraphKind } | { type: "Slide" };

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

export interface DocumentStyles {
    counters: DocumentCounter[];
    styles: DocumentStyle[];
}

export interface DocumentStyle {
    kind: ParagraphKind;
    name: Id | undefined;
    counter: Id | undefined;
}

export type ArgumentMode = "Simple" | "Sequence" | "BoundVariable" | "BoundVariableSequence";

export type BoundArgument = { Simple: Term } | { Sequence: MaybeSequence<Term> } | { Bound: Variable } | { BoundSeq: MaybeSequence<Variable> };

export type Argument = { Simple: Term } | { Sequence: MaybeSequence<Term> };

export type MaybeSequence<T> = { One: T } | { Seq: T[] };

export type Variable = { Name: { name: Id; notated?: Id | undefined } } | { Ref: { declaration: DocumentElementUri; is_sequence?: boolean | undefined } };

export type Declaration = { NestedModule: NestedModule } | { Import: ModuleUri } | { Symbol: Symbol } | { MathStructure: MathStructure } | { Morphism: Morphism } | { Extension: StructureExtension };

export interface Assignment {
    original: SymbolUri;
    morphism: SymbolUri;
    definiens?: Term | undefined;
    refined_type?: Term | undefined;
    new_name?: SimpleUriName | undefined;
    macroname?: Id | undefined;
}

export interface Morphism {
    uri: SymbolUri;
    domain: ModuleUri;
    total: boolean;
    elements: Assignment[];
}

export interface DocumentRange {
    start: number;
    end: number;
}

export interface DataRef {
    start: number;
    end: number;
}

export interface DocDataRef {
    start: number;
    end: number;
    in_doc: DocumentUri;
}

export interface VariableDeclaration {
    uri: DocumentElementUri;
    data: VariableData;
}

export interface VariableData {
    arity: ArgumentSpec;
    macroname: Id | undefined;
    role: Id[];
    tp: Term | undefined;
    df: Term | undefined;
    bind: boolean;
    assoctype: AssocType | undefined;
    reordering: Id | undefined;
    argument_types?: Term[];
    return_type?: Term | undefined;
    is_seq: boolean;
}

export type SlideElement = { type: "Slide"; html: string; uri: DocumentElementUri } | { type: "Paragraph"; html: string; uri: DocumentElementUri } | { type: "Inputref"; uri: DocumentUri } | { type: "Section"; uri: DocumentElementUri; title: string | undefined; children: SlideElement[] };

export type DocumentElement = { UseModule: ModuleUri } | { Module: { range: DocumentRange; module: ModuleUri; children?: DocumentElement[] } } | { MathStructure: { range: DocumentRange; structure: SymbolUri; children?: DocumentElement[] } } | { Extension: { range: DocumentRange; extension: SymbolUri; target: SymbolUri; children?: DocumentElement[] } } | { Morphism: { range: DocumentRange; morphism: SymbolUri; children?: DocumentElement[] } } | { SymbolDeclaration: SymbolUri } | { ImportModule: ModuleUri } | { Section: Section } | { SkipSection: DocumentElement[] } | { Paragraph: LogicalParagraph } | { Problem: Problem } | { Slide: { range: DocumentRange; uri: DocumentElementUri; title?: string | undefined; children: DocumentElement[] } } | { DocumentReference: { uri: DocumentElementUri; target: DocumentUri } } | { Notation: NotationReference } | { VariableDeclaration: VariableDeclaration } | { VariableNotation: VariableNotationReference } | { Definiendum: { range: DocumentRange; uri: SymbolUri } } | { SymbolReference: { range: DocumentRange; uri: SymbolUri; notation?: Id | undefined } } | { VariableReference: { range: DocumentRange; uri: DocumentElementUri; notation?: Id | undefined } } | { Term: DocumentTerm };

export interface DocumentTerm {
    uri: DocumentElementUri;
    term: Term;
}

export type ParagraphOrProblemKind = { type: "Definition" } | { type: "Example" } | ({ type: "Problem" } & CognitiveDimension) | ({ type: "SubProblem" } & CognitiveDimension);

export interface QuizProblem {
    html: string;
    title_html?: string | undefined;
    uri: DocumentElementUri;
    total_points?: number | undefined;
    preconditions?: [CognitiveDimension, SymbolUri][];
    objectives?: [CognitiveDimension, SymbolUri][];
}

export type QuizElement = { type: "Section"; title: string; elements?: QuizElement[] } | ({ type: "Problem" } & QuizProblem) | { type: "Paragraph"; html: string };

export interface Quiz {
    css?: Css[];
    title?: string | undefined;
    elements?: QuizElement[];
    solutions?: [DocumentElementUri,string][];
    answer_classes?: [DocumentElementUri,AnswerClass[]][];
}

export interface ProblemFeedbackJson {
    correct: boolean;
    solutions: string[];
    data: CheckedResult[];
    score_fraction: number;
}

export interface ProblemResponse {
    uri: DocumentElementUri;
    responses: ProblemResponseType[];
}

/**
 * Either a list of booleans (multiple choice), a single integer (single choice),
 * or a string (fill-in-the-gaps)
 */
export type ProblemResponseType = { type: "MultipleChoice"; value: boolean[] } | { type: "SingleChoice"; value: number | undefined } | { type: "Fillinsol"; value: string };

export interface BlockFeedback {
    is_correct: boolean;
    verdict_str: string;
    feedback: string;
}

export type FillinFeedbackKind = { Exact: string } | { NumRange: { from: number | undefined; to: number | undefined } } | { Regex: string };

export type CheckedResult = { type: "SingleChoice"; selected: number | undefined; choices: BlockFeedback[] } | { type: "MultipleChoice"; selected: boolean[]; choices: BlockFeedback[] } | { type: "FillinSol"; matching: number | undefined; text: string; options: FillinFeedback[] };

export interface FillinFeedback {
    is_correct: boolean;
    feedback: string;
    kind: FillinFeedbackKind;
}

export type Regex = string;

export interface LogicalParagraph {
    kind: ParagraphKind;
    uri: DocumentElementUri;
    formatting: ParagraphFormatting;
    title: string | undefined;
    range: DocumentRange;
    styles: Id[];
    children: DocumentElement[];
    fors: [SymbolUri, Term | undefined][];
}

export type ParagraphKind = "Definition" | "Assertion" | "Paragraph" | "Proof" | "SubProof" | "Example";

export type ParagraphFormatting = "Block" | "Inline" | "Collapsed";

export interface OpaqueNode {
    tag: Id;
    attributes?: [Id, string][];
    children?: AnyOpaque[];
}

export type AnyOpaque = { Term: number } | { Node: OpaqueNode } | { Text: string };

export type Timestamp = number;

export type ArgumentSpec = ArgumentMode[];

export type AssocType = "LeftAssociativeBinary" | "RightAssociativeBinary" | "Conjunctive" | "PairwiseConjunctive" | "Prenex";

export interface Symbol {
    uri: SymbolUri;
    data: SymbolData;
}

export interface SymbolData {
    arity: ArgumentSpec;
    macroname?: Id | undefined;
    role: Id[];
    tp?: Term | undefined;
    df?: Term | undefined;
    return_type?: Term | undefined;
    argument_types?: Term[];
    assoctype?: AssocType | undefined;
    reordering?: Id | undefined;
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
}

export type NodeOrText = NotationNode | string;

export interface VariableNotationReference {
    variable: DocumentElementUri;
    uri: DocumentElementUri;
    notation: DataRef;
}

export type NotationComponent = { type: "Node"; tag: Id; attributes?: [Id, string][]; children?: NotationComponent[] } | { type: "Argument"; index: number; mode: ArgumentMode } | { type: "ArgSep"; index: number; mode: ArgumentMode; sep?: NotationComponent[] } | { type: "ArgMap"; index: number; segments?: NotationComponent[] } | ({ type: "MainComp" } & NotationNode) | ({ type: "Comp" } & NotationNode) | ({ type: "Text" } & string);

export type ArchiveId = string;

export type ArchiveUri = string;

export type UriName = string;

export type ModuleUri = string;

export type SymbolUri = string;

export type DomainUri = string;

export type NarrativeUri = string;

export type LeafUri = string;

export type Uri = string;

export type SimpleUriName = string;

export const UnknownDocument = "http://unknown.source?a=no/archive&d=unknown_document&l=en"

export type DocumentUri = string;

export type DocumentElementUri = string;

export type UriPath = string;

export type PathUri = string;

export type BaseUri = string;

export type Id = string;

export class IntoUnderlyingByteSource {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  pull(controller: ReadableByteStreamController): Promise<any>;
  start(controller: ReadableByteStreamController): void;
  cancel(): void;
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
  pull(controller: ReadableStreamDefaultController): Promise<any>;
  cancel(): void;
}
/**
 * Represents a leptos context; i.e. a node somewhere in the reactive graph
 */
export class LeptosContext {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  wasm_clone(): LeptosContext;
  /**
   * Cleans up the reactive system.
   */
  cleanup(): void;
}
export class LeptosMountHandle {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * unmounts the view and cleans up the reactive system.
   * Not calling this is a memory leak
   */
  unmount(): void;
}
export class ProblemFeedback {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  to_jstring(): string | undefined;
  static from_jstring(s: string): ProblemFeedback | undefined;
  to_json(): ProblemFeedbackJson;
  static from_json(arg0: ProblemFeedbackJson): ProblemFeedback;
  correct: boolean;
  score_fraction: number;
}
export class Solutions {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  to_jstring(): string | undefined;
  static from_jstring(s: string): Solutions | undefined;
  to_solutions(): SolutionData[];
  check_response(response: ProblemResponse): ProblemFeedback | undefined;
  static from_solutions(solutions: SolutionData[]): Solutions;
  default_feedback(): ProblemFeedback;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly apply_config: (a: number, b: number, c: number) => number;
  readonly get_current_uri: (a: number, b: number) => void;
  readonly initialize: (a: number, b: number, c: number) => void;
  readonly inject_css: (a: number, b: number) => void;
  readonly render_document: (a: number, b: number, c: number, d: number) => number;
  readonly render_fragment: (a: number, b: number, c: number, d: number) => number;
  readonly top: (a: number, b: number, c: number, d: number) => void;
  readonly clear_cache: () => void;
  readonly print_cache: () => void;
  readonly __wbg_leptoscontext_free: (a: number, b: number) => void;
  readonly __wbg_leptosmounthandle_free: (a: number, b: number) => void;
  readonly leptoscontext_cleanup: (a: number, b: number) => void;
  readonly leptoscontext_wasm_clone: (a: number) => number;
  readonly leptosmounthandle_unmount: (a: number, b: number) => void;
  readonly __wbg_intounderlyingbytesource_free: (a: number, b: number) => void;
  readonly __wbg_intounderlyingsource_free: (a: number, b: number) => void;
  readonly intounderlyingbytesource_autoAllocateChunkSize: (a: number) => number;
  readonly intounderlyingbytesource_cancel: (a: number) => void;
  readonly intounderlyingbytesource_pull: (a: number, b: number) => number;
  readonly intounderlyingbytesource_start: (a: number, b: number) => void;
  readonly intounderlyingbytesource_type: (a: number) => number;
  readonly intounderlyingsource_cancel: (a: number) => void;
  readonly intounderlyingsource_pull: (a: number, b: number) => number;
  readonly __wbg_intounderlyingsink_free: (a: number, b: number) => void;
  readonly intounderlyingsink_abort: (a: number, b: number) => number;
  readonly intounderlyingsink_close: (a: number) => number;
  readonly intounderlyingsink_write: (a: number, b: number) => number;
  readonly __wbg_solutions_free: (a: number, b: number) => void;
  readonly solutions_check_response: (a: number, b: number) => number;
  readonly solutions_default_feedback: (a: number) => number;
  readonly solutions_from_jstring: (a: number, b: number) => number;
  readonly solutions_from_solutions: (a: number, b: number) => number;
  readonly solutions_to_jstring: (a: number, b: number) => void;
  readonly solutions_to_solutions: (a: number, b: number) => void;
  readonly __wbg_get_problemfeedback_correct: (a: number) => number;
  readonly __wbg_get_problemfeedback_score_fraction: (a: number) => number;
  readonly __wbg_problemfeedback_free: (a: number, b: number) => void;
  readonly __wbg_set_problemfeedback_correct: (a: number, b: number) => void;
  readonly __wbg_set_problemfeedback_score_fraction: (a: number, b: number) => void;
  readonly problemfeedback_from_json: (a: number) => number;
  readonly problemfeedback_from_jstring: (a: number, b: number) => number;
  readonly problemfeedback_to_json: (a: number) => number;
  readonly problemfeedback_to_jstring: (a: number, b: number) => void;
  readonly __wbindgen_export_0: (a: number, b: number) => number;
  readonly __wbindgen_export_1: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: (a: number) => void;
  readonly __wbindgen_export_3: (a: number, b: number, c: number) => void;
  readonly __wbindgen_export_4: WebAssembly.Table;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_export_5: (a: number, b: number, c: number) => void;
  readonly __wbindgen_export_6: (a: number, b: number, c: number) => number;
  readonly __wbindgen_export_7: (a: number, b: number, c: number) => void;
  readonly __wbindgen_export_8: (a: number, b: number, c: number) => void;
  readonly __wbindgen_export_9: (a: number, b: number) => void;
  readonly __wbindgen_export_10: (a: number, b: number, c: number) => void;
  readonly __wbindgen_export_11: (a: number, b: number, c: number, d: number) => void;
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
