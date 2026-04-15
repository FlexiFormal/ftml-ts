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
    leptos::logging::log!("ftml version: {VERSION}");
    ftml_viewer::init(log_level,&["ftml_ts"]);
}

static VERSION: &str = {
    // annoyingly explicit to remain const
    const fn string_eq(a:&str,b:&str) -> bool {
        let mut i = 0;
        while i < b.len() {
            let ca = a.as_bytes()[i];
            let cb = b.as_bytes()[i];
            if ca != cb {return false}
            i += 1;
        }
        true
    }
    const fn drop_n(s:&mut &str,mut curr:usize) {
        loop {
            if let Some((_,n)) = s.split_at_checked(curr) {
                *s = n.trim_ascii_start();
                return
            }
            curr += 1;
        }
    }
    const VERSION : &str = "\"version\"";
    let mut pkg = include_str!("../../ts/package.json");
    while !string_eq(pkg,VERSION) {
        drop_n(&mut pkg,1);
    }
    drop_n(&mut pkg,VERSION.len());
    assert!(pkg.as_bytes()[0] == b':');
    drop_n(&mut pkg,1);
    assert!(pkg.as_bytes()[0] == b'"');
    drop_n(&mut pkg,1);
    let mut i = 0;
    while pkg.as_bytes()[i] != b'"' {
        i += 1;
    }
    let Some((ret,_)) = pkg.split_at_checked(i) else {
        panic!("failed to parse package.json");
    };
    ret
};