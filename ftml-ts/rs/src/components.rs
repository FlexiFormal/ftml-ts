use crate::{Views, inject_css};
use ftml_components::{SidebarPosition, config::FtmlConfig, utils::LocalCacheExt};
use ftml_dom::FtmlViews;
use ftml_uris::{DocumentElementUri, DocumentUri};
use leptos_react::{
    context::LeptosContext,
    functions::{FromJs, JsFunction2},
};

#[derive(tsify::Tsify, serde::Serialize, serde::Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
#[serde(tag = "type")]
pub enum DocumentOptions {
    FromBackend {
        uri: DocumentUri,
        // gottos,
    },
    HtmlString {
        html: Box<str>,
        uri: Option<DocumentUri>,
        // gottos,
    },
}

#[derive(tsify::Tsify, serde::Serialize, serde::Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
#[serde(tag = "type")]
pub enum FragmentOptions {
    FromBackend {
        uri: DocumentElementUri,
    },
    HtmlString {
        html: Box<str>,
        uri: Option<DocumentElementUri>,
    },
}

#[wasm_bindgen::prelude::wasm_bindgen]
pub fn apply_config(
    config: wasm_bindgen::JsValue,
    to: leptos::web_sys::HtmlElement,
    context: Option<LeptosContext>,
) -> leptos_react::context::LeptosMountHandle {
    let ret = || mount(to, config, || ());
    if let Some(ctx) = context {
        ctx.with(ret)
    } else {
        ret()
    }
}

#[wasm_bindgen::prelude::wasm_bindgen]
pub fn top(
    e: leptos::web_sys::HtmlElement,
    then: wasm_bindgen::JsValue,
    config: wasm_bindgen::JsValue,
) -> Result<leptos_react::context::LeptosMountHandle, String> {
    use leptos::prelude::*;
    let then = JsFunction2::<leptos::web_sys::HtmlElement, LeptosContext, ()>::from_js(then)
        .map_err(|e| e.to_string())?;
    Ok(mount(e, config, move || {
        let rf = NodeRef::new();
        rf.on_load(move |e: leptos::web_sys::HtmlDivElement| {
            if let Err(e) = then.call(
                &*e,
                &LeptosContext::from(Owner::current().expect("this is a bug")),
            ) {
                tracing::error!("error calling function {e}");
            }
        });
        view!(<div node_ref=rf/>)
    }))
}

#[wasm_bindgen::prelude::wasm_bindgen]
pub fn render_document(
    to: leptos::web_sys::HtmlElement,
    context: Option<LeptosContext>,
    config: wasm_bindgen::JsValue,
    document: DocumentOptions,
) -> leptos_react::context::LeptosMountHandle {
    let ret = move || {
        mount(to, config, move || {
            let (uri, html) = match document {
                DocumentOptions::FromBackend { uri } => (uri, None),
                DocumentOptions::HtmlString { html, uri } => (
                    uri.unwrap_or_else(|| DocumentUri::no_doc().clone()),
                    Some(html),
                ),
            };
            match html {
                None => {
                    let uricl = uri.clone();
                    leptos::either::Either::Left(
                        ftml_dom::utils::local_cache::LocalCache::with_or_toast::<
                            ftml_viewer::backend::GlobalBackend,
                            _,
                            _,
                            _,
                            _,
                        >(
                            move |c| c.get_document_html(uricl, None),
                            |(html, css, stripped)| {
                                inject_css(css.into_vec());
                                Views::setup_document(
                                    uri,
                                    SidebarPosition::Next,
                                    stripped,
                                    move || Views::render_ftml(html.into_string(), None),
                                )
                            },
                            || "error",
                        ),
                    )
                }
                Some(s) => leptos::either::Either::Right(Views::setup_document(
                    uri,
                    SidebarPosition::Next,
                    true,
                    move || Views::render_ftml(s.into_string(), None),
                )),
            }
        })
    };

    if let Some(ctx) = context {
        ctx.with(ret)
    } else {
        ret()
    }
}

#[wasm_bindgen::prelude::wasm_bindgen]
pub fn render_fragment(
    to: leptos::web_sys::HtmlElement,
    context: Option<LeptosContext>,
    config: wasm_bindgen::JsValue,
    fragment: FragmentOptions,
) -> leptos_react::context::LeptosMountHandle {
    let ret = move || {
        mount(to, config, move || match fragment {
            FragmentOptions::FromBackend { uri } => {
                let uricl = uri.clone();
                leptos::either::Either::Left(
                    ftml_dom::utils::local_cache::LocalCache::with_or_toast::<
                        ftml_viewer::backend::GlobalBackend,
                        _,
                        _,
                        _,
                        _,
                    >(
                        move |c| c.get_fragment(uricl.into(), None),
                        |(html, css, stripped)| {
                            inject_css(css.into_vec());
                            Views::render_fragment(
                                Some(uri.into()),
                                SidebarPosition::None,
                                stripped,
                                move || Views::render_ftml(html.into_string(), None),
                            )
                        },
                        || "error",
                    ),
                )
            }
            FragmentOptions::HtmlString { html, uri } => {
                leptos::either::Either::Right(Views::render_fragment(
                    uri.map(Into::into),
                    SidebarPosition::None,
                    true,
                    move || Views::render_ftml(html.into_string(), None),
                ))
            }
        })
    };
    if let Some(ctx) = context {
        ctx.with(ret)
    } else {
        ret()
    }
}

fn mount<V: leptos::IntoView + 'static>(
    to: leptos::web_sys::HtmlElement,
    config: wasm_bindgen::JsValue,
    then: impl FnOnce() -> V + Send + 'static,
) -> leptos_react::context::LeptosMountHandle {
    leptos_react::context::LeptosMountHandle::new(to, || {
        do_config(config);
        Views::maybe_top(then)
    })
}

fn do_config(config: wasm_bindgen::JsValue) {
    let config = if config.is_null() || config.is_undefined() {
        FtmlConfig::default()
    } else {
        match FtmlConfig::from_js(config) {
            Ok(c) => c,
            Err(e) => {
                for e in e.errors {
                    tracing::error!("{e}");
                }
                e.config
            }
        }
    };
    let _ = config.apply();
}
