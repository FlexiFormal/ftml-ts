/* tslint:disable */
/* eslint-disable */
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
export interface Instance {
    semester: string;
    instructors?: string[] | undefined;
    TAs?: string[] | undefined;
    leadTAs?: string[] | undefined;
}

export type ArchiveIndex = { type: "library"; archive: ArchiveId; title: string; teaser?: string | undefined; thumbnail?: string | undefined } | { type: "book"; title: string; authors: string[]; file: DocumentUri; teaser?: string | undefined; thumbnail?: string | undefined } | { type: "paper"; title: string; authors: string[]; file: DocumentUri; thumbnail?: string | undefined; teaser?: string | undefined; venue?: string | undefined; venue_url?: string | undefined } | { type: "course"; title: string; landing: DocumentUri; acronym: string | undefined; instructors: string[]; institution: string; instances: Instance[]; notes: DocumentUri; slides?: DocumentUri | undefined; thumbnail?: string | undefined; quizzes?: boolean; homeworks?: boolean; teaser?: string | undefined } | { type: "self-study"; title: string; landing: DocumentUri; notes: DocumentUri; acronym?: string | undefined; slides?: DocumentUri | undefined; thumbnail?: string | undefined; teaser?: string | undefined };

export type Institution = { type: "university"; title: string; place: string; country: string; url: string; acronym: string; logo: string } | { type: "school"; title: string; place: string; country: string; url: string; acronym: string; logo: string };

export type SearchResult = { Document: DocumentUri } | { Paragraph: { uri: DocumentElementUri; fors: SymbolUri[]; def_like: boolean; kind: SearchResultKind } };

export interface QueryFilter {
    allow_documents?: boolean;
    allow_paragraphs?: boolean;
    allow_definitions?: boolean;
    allow_examples?: boolean;
    allow_assertions?: boolean;
    allow_problems?: boolean;
    definition_like_only?: boolean;
}

export type SearchResultKind = "Document" | "Paragraph" | "Definition" | "Example" | "Assertion" | "Problem";

export interface Project {
    id: number;
    name: string;
    path_with_namespace: string;
    http_url_to_repo: string;
    default_branch: string | undefined;
}

export interface Branch {
    name: string;
    default: boolean;
    commit: Commit;
}

export interface TreeEntry {
    name: string;
    path: string;
    type: DirOrFile;
}

export type DirOrFile = "tree" | "blob";

export interface Commit {
    id: string;
    created_at: string;
    parent_ids: string[];
    title: string;
    message: string;
    author_name: string;
}

export interface FileStateSummary {
    new: number;
    stale: number;
    deleted: number;
    up_to_date: number;
    last_built: Timestamp;
    last_changed: Timestamp;
}

export interface DirectoryData {
    rel_path: string;
    summary?: FileStateSummary | undefined;
}

export interface ArchiveData {
    id: ArchiveId;
    git?: string | undefined;
    summary?: FileStateSummary | undefined;
}

export interface FileData {
    rel_path: string;
    format: string;
}

export interface ArchiveGroupData {
    id: ArchiveId;
    summary?: FileStateSummary | undefined;
}

export type Css = { Link: string } | { Inline: string } | { Class: { name: string; css: string } };

export type Regex = string;

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

export interface VariableDeclaration {
    uri: DocumentElementUri;
    data: VariableData;
}

export interface OpaqueNode {
    tag: Id;
    attributes?: [Id, string][];
    children?: AnyOpaque[];
}

export type AnyOpaque = { Term: number } | { Node: OpaqueNode } | { Text: string };

export type ArgumentSpec = ArgumentMode[];

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

export type AssocType = "LeftAssociativeBinary" | "RightAssociativeBinary" | "Conjunctive" | "PairwiseConjunctive" | "Prenex";

export interface Symbol {
    uri: SymbolUri;
    data: SymbolData;
}

export type QuizElement = { type: "Section"; title: string; elements?: QuizElement[] } | ({ type: "Problem" } & QuizProblem) | { type: "Paragraph"; html: string };

export interface QuizProblem {
    html: string;
    title_html?: string | undefined;
    uri: DocumentElementUri;
    total_points?: number | undefined;
    preconditions?: [CognitiveDimension, SymbolUri][];
    objectives?: [CognitiveDimension, SymbolUri][];
}

export interface Quiz {
    css?: Css[];
    title?: string | undefined;
    elements?: QuizElement[];
    solutions?: [DocumentElementUri,string][];
    answer_classes?: [DocumentElementUri,AnswerClass[]][];
}

export interface NotationReference {
    symbol: SymbolUri;
    uri: DocumentElementUri;
    notation: DataRef;
}

export type NotationComponent = { type: "Node"; tag: Id; attributes?: [Id, string][]; children?: NotationComponent[] } | { type: "Argument"; index: number; mode: ArgumentMode } | { type: "ArgSep"; index: number; mode: ArgumentMode; sep?: NotationComponent[] } | { type: "ArgMap"; index: number; segments?: NotationComponent[] } | ({ type: "MainComp" } & NotationNode) | ({ type: "Comp" } & NotationNode) | ({ type: "Text" } & string);

export interface Notation {
    precedence: number;
    id?: Id | undefined;
    argprecs?: number[];
    component: NotationComponent;
    op?: NotationNode | undefined;
}

export interface VariableNotationReference {
    variable: DocumentElementUri;
    uri: DocumentElementUri;
    notation: DataRef;
}

export type NodeOrText = NotationNode | string;

export interface NotationNode {
    tag: Id;
    attributes?: [Id, string][];
    children?: NodeOrText[];
}

export type SolutionData = { Solution: { html: string; answer_class: Id | undefined } } | { ChoiceBlock: ChoiceBlock } | { FillInSol: FillInSol };

export interface FillInSol {
    width: number | undefined;
    opts: FillInSolOption[];
}

export interface ChoiceBlock {
    multiple: boolean;
    block_style: ChoiceBlockStyle;
    range: DocumentRange;
    styles: Id[];
    choices: Choice[];
}

export type FillInSolOption = { Exact: { value: string; verdict: boolean; feedback: string } } | { NumericalRange: { from: number | undefined; to: number | undefined; verdict: boolean; feedback: string } } | { Regex: { regex: Regex; verdict: boolean; feedback: string } };

export type ChoiceBlockStyle = "Block" | "Inline" | "Dropdown";

export interface Choice {
    correct: boolean;
    verdict: string;
    feedback: string;
}

export type Declaration = { NestedModule: NestedModule } | { Import: ModuleUri } | { Symbol: Symbol } | { MathStructure: MathStructure } | { Morphism: Morphism } | { Extension: StructureExtension };

export interface ModuleData {
    uri: ModuleUri;
    meta_module?: ModuleUri | undefined;
    signature?: Language | undefined;
    declarations: Declaration[];
}

export interface NestedModule {
    uri: SymbolUri;
    declarations: Declaration[];
}

export type SectionLevel = { type: "Part" } | { type: "Chapter" } | { type: "Section" } | { type: "Subsection" } | { type: "Subsubsection" } | { type: "Paragraph" } | { type: "Subparagraph" };

export interface Section {
    range: DocumentRange;
    uri: DocumentElementUri;
    title: string | undefined;
    children: DocumentElement[];
}

export interface DocumentStyle {
    kind: ParagraphKind;
    name: Id | undefined;
    counter: Id | undefined;
}

export interface DocumentData {
    uri: DocumentUri;
    title?: string | undefined;
    elements?: DocumentElement[];
    styles: DocumentStyles;
    top_section_level: SectionLevel;
    kind: DocumentKind;
}

export interface DocumentCounter {
    name: Id;
    parent: SectionLevel | undefined;
}

export interface DocumentStyles {
    counters: DocumentCounter[];
    styles: DocumentStyle[];
}

/**
 * An entry in a table of contents. Either:
 * 1. a section; the title is assumed to be an HTML string, or
 * 2. an inputref to some other document; the URI is the one for the
 *    inputref itself; not the referenced Document. For the TOC,
 *    which document is inputrefed is actually irrelevant.
 */
export type TocElem = { type: "Section"; title: string | undefined; uri: DocumentElementUri; id: string; children: TocElem[] } | { type: "SkippedSection"; children: TocElem[] } | { type: "Inputref"; uri: DocumentUri; title: string | undefined; id: string; children: TocElem[] } | { type: "Paragraph"; styles: Id[]; kind: ParagraphKind } | { type: "Slide" };

export type DocumentKind = "Article" | "Fragment" | { Exam: { date: Timestamp; course: Id; retake: boolean; num: number; term: Id } } | { Homework: { date: Timestamp; course: Id; num: number; term: Id } } | { Quiz: { date: Timestamp; course: Id; num: number; term: Id } };

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

export type OpaqueTerm = Opaque;

export interface Binding {
    head: Term;
    arguments: BoundArgument[];
    presentation?: VarOrSym | undefined;
}

export interface Application {
    head: Term;
    arguments: Argument[];
    presentation?: VarOrSym | undefined;
}

export type ApplicationTerm = Application;

export interface RecordField {
    record: Term;
    key: UriName;
    /**
     * does not count as a subterm
     */
    record_type?: Term | undefined;
    presentation?: VarOrSym | undefined;
}

export interface Opaque {
    node: OpaqueNode;
    terms?: Term[];
}

export type ParagraphFormatting = "Block" | "Inline" | "Collapsed";

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

export interface DocumentTerm {
    uri: DocumentElementUri;
    term: Term;
}

export type ParagraphOrProblemKind = { type: "Definition" } | { type: "Example" } | ({ type: "Problem" } & CognitiveDimension) | ({ type: "SubProblem" } & CognitiveDimension);

export type SlideElement = { type: "Slide"; html: string; uri: DocumentElementUri } | { type: "Paragraph"; html: string; uri: DocumentElementUri } | { type: "Inputref"; uri: DocumentUri } | { type: "Section"; uri: DocumentElementUri; title: string | undefined; children: SlideElement[] };

export type DocumentElement = { UseModule: ModuleUri } | { Module: { range: DocumentRange; module: ModuleUri; children?: DocumentElement[] } } | { MathStructure: { range: DocumentRange; structure: SymbolUri; children?: DocumentElement[] } } | { Extension: { range: DocumentRange; extension: SymbolUri; target: SymbolUri; children?: DocumentElement[] } } | { Morphism: { range: DocumentRange; morphism: SymbolUri; children?: DocumentElement[] } } | { SymbolDeclaration: SymbolUri } | { ImportModule: ModuleUri } | { Section: Section } | { SkipSection: DocumentElement[] } | { Paragraph: LogicalParagraph } | { Problem: Problem } | { Slide: { range: DocumentRange; uri: DocumentElementUri; title?: string | undefined; children: DocumentElement[] } } | { DocumentReference: { uri: DocumentElementUri; target: DocumentUri } } | { Notation: NotationReference } | { VariableDeclaration: VariableDeclaration } | { VariableNotation: VariableNotationReference } | { Definiendum: { range: DocumentRange; uri: SymbolUri } } | { SymbolReference: { range: DocumentRange; uri: SymbolUri; notation?: Id | undefined } } | { VariableReference: { range: DocumentRange; uri: DocumentElementUri; notation?: Id | undefined } } | { Term: DocumentTerm };

export interface BlockFeedback {
    is_correct: boolean;
    verdict_str: string;
    feedback: string;
}

export interface ProblemFeedbackJson {
    correct: boolean;
    solutions: string[];
    data: CheckedResult[];
    score_fraction: number;
}

export interface FillinFeedback {
    is_correct: boolean;
    feedback: string;
    kind: FillinFeedbackKind;
}

export interface ProblemResponse {
    uri: DocumentElementUri;
    responses: ProblemResponseType[];
}

export type CheckedResult = { type: "SingleChoice"; selected: number | undefined; choices: BlockFeedback[] } | { type: "MultipleChoice"; selected: boolean[]; choices: BlockFeedback[] } | { type: "FillinSol"; matching: number | undefined; text: string; options: FillinFeedback[] };

export type FillinFeedbackKind = { Exact: string } | { NumRange: { from: number | undefined; to: number | undefined } } | { Regex: string };

/**
 * Either a list of booleans (multiple choice), a single integer (single choice),
 * or a string (fill-in-the-gaps)
 */
export type ProblemResponseType = { type: "MultipleChoice"; value: boolean[] } | { type: "SingleChoice"; value: number | undefined } | { type: "Fillinsol"; value: string };

export type MaybeSequence<T> = { One: T } | { Seq: T[] };

export type Argument = { Simple: Term } | { Sequence: MaybeSequence<Term> };

export type ArgumentMode = "Simple" | "Sequence" | "BoundVariable" | "BoundVariableSequence";

export type BoundArgument = { Simple: Term } | { Sequence: MaybeSequence<Term> } | { Bound: Variable } | { BoundSeq: MaybeSequence<Variable> };

export type Variable = { Name: { name: Id; notated?: Id | undefined } } | { Ref: { declaration: DocumentElementUri; is_sequence?: boolean | undefined } };

export type StructureDeclaration = ({ type: "Import" } & ModuleUri) | ({ type: "Symbol" } & Symbol) | ({ type: "Morphism" } & Morphism);

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

export interface Morphism {
    uri: SymbolUri;
    domain: ModuleUri;
    total: boolean;
    elements: Assignment[];
}

export interface Assignment {
    original: SymbolUri;
    morphism: SymbolUri;
    definiens?: Term | undefined;
    refined_type?: Term | undefined;
    new_name?: SimpleUriName | undefined;
    macroname?: Id | undefined;
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

export interface DocumentRange {
    start: number;
    end: number;
}

export interface GradingNote {
    html: string;
    answer_classes?: AnswerClass[];
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
}

export type CognitiveDimension = "Remember" | "Understand" | "Apply" | "Analyze" | "Evaluate" | "Create";

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

/**
 * Either a variable or a symbol reference
 */
export type VarOrSym = { Sym: SymbolUri } | { Var: Variable };

export type Timestamp = number;

export type ArchiveUri = string;

export type ArchiveId = string;

export type SimpleUriName = string;

export type DocumentUri = string;

export const UnknownDocument = "http://unknown.source?a=no/archive&d=unknown_document&l=en"

export type NarrativeUri = string;

export type Uri = string;

export type LeafUri = string;

export type DomainUri = string;

export type UriName = string;

export type ModuleUri = string;

export type SymbolUri = string;

export type BaseUri = string;

export type DocumentElementUri = string;

export type UriPath = string;

export type PathUri = string;

export type Id = string;

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
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_export_3: (a: number, b: number, c: number) => void;
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
