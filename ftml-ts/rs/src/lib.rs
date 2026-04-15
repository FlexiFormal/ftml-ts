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
    for mut c in css {
        if let Css::Link(lnk) = &mut c && 
        let Some(r) = lnk.strip_prefix("srv:") {
            *lnk = format!(
                    "{}{r}",
                    ftml_viewer::backend::BackendUrlRef
                )
                .into_boxed_str();
        }
        c.inject();
    }
}

#[wasm_bindgen::prelude::wasm_bindgen]
pub fn get_current_uri(context: &LeptosContext) -> NarrativeUri {
    context.with(ftml_dom::DocumentState::context_uri)
}

pub type Views = ftml_components::Views;

#[wasm_bindgen::prelude::wasm_bindgen]
pub fn initialize(url: Option<String>, log_level: Option<LogLevel>) {
    let log_level = log_level.unwrap_or(LogLevel::ERROR);
    if let Some(url) = url {
        ftml_viewer::backend::BackendUrlRef::set_url(&url);
    }
    ftml_viewer::init(log_level,&["ftml_ts"]);
}
