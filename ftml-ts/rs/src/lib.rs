pub mod components;

use ftml_dom::utils::css::CssExt;
use ftml_ontology::utils::Css;
use ftml_uris::NarrativeUri;
use ftml_viewer::config::LogLevel;
use leptos_react::context::LeptosContext;

#[wasm_bindgen::prelude::wasm_bindgen(typescript_custom_section)]
const INIT: &str = "export function init(): Promise<void>;";

#[wasm_bindgen::prelude::wasm_bindgen]
pub fn inject_css(css: Vec<Css>) {
    for c in css {
        c.inject();
    }
}

#[wasm_bindgen::prelude::wasm_bindgen]
pub fn get_current_uri(context: &LeptosContext) -> NarrativeUri {
    context.with(ftml_dom::DocumentState::context_uri)
}

pub type Views = ftml_components::Views<ftml_viewer::backend::GlobalBackend>;

#[wasm_bindgen::prelude::wasm_bindgen]
pub fn initialize(url: Option<String>, log_level: Option<LogLevel>) {
    use tracing_subscriber::prelude::*;
    fn filter(lvl: LogLevel) -> tracing_subscriber::filter::Targets {
        let lvl: tracing::Level = lvl.into();
        tracing_subscriber::filter::Targets::new()
            .with_target("ftml_dom", lvl)
            .with_target("ftml_leptos", lvl)
            .with_target("ftml_core", lvl)
            .with_target("ftml_backend", lvl)
            .with_target("ftml_ts", lvl)
            .with_target("ssr_example", lvl)
            .with_target(
                "leptos_posthoc",
                tracing_subscriber::filter::LevelFilter::ERROR,
            )
    }
    console_error_panic_hook::set_once();
    let log_level = log_level.unwrap_or(LogLevel::ERROR);
    let _ = tracing_subscriber::registry()
        .with(tracing_wasm::WASMLayer::default())
        .with(filter(log_level))
        .try_init();
    if let Some(url) = url {
        ftml_viewer::backend::BackendUrlRef::set_url(&url);
    }
}
