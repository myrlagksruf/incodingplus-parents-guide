import { c as create_ssr_component, a as subscribe, e as escape } from "../../chunks/index2.js";
import { n as name } from "../../chunks/store.js";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: 'main.svelte-1ipz6i3.svelte-1ipz6i3{display:flex;flex-direction:column;align-items:center;overflow-y:auto;height:100vh;width:100%;box-sizing:border-box;max-width:1000px;margin:auto;background-color:white}main.svelte-1ipz6i3 .title.svelte-1ipz6i3{padding-top:4em;padding-bottom:5em;display:inline-block;user-select:none}main.svelte-1ipz6i3 .title .name.svelte-1ipz6i3{padding-top:0.3em}main.svelte-1ipz6i3 .logo-container.svelte-1ipz6i3{display:flex;align-items:center;margin-bottom:5em}main.svelte-1ipz6i3 .logo-container .logo.svelte-1ipz6i3{display:inline-block;width:10em;height:10em;background-image:url("/svelte-logo.svg");background-repeat:no-repeat;background-position:center}main.svelte-1ipz6i3 .logo-container .logo-title.svelte-1ipz6i3{font-size:2em;font-weight:900;user-select:none;color:rgb(75, 130, 195)}main.svelte-1ipz6i3 h1.svelte-1ipz6i3{margin:0;font-size:4rem}main.svelte-1ipz6i3 h2.svelte-1ipz6i3{margin:0;font-size:2.5rem}',
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $name, $$unsubscribe_name;
  $$unsubscribe_name = subscribe(name, (value) => $name = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  $$unsubscribe_name();
  return `<main class="${"svelte-1ipz6i3"}"><div class="${"title svelte-1ipz6i3"}"><h2 class="${"svelte-1ipz6i3"}">${escape(String(data.year).slice(2))}년 ${escape(String(data.month + 1).padStart(2, "0"))}월</h2>
        <h1 class="${"svelte-1ipz6i3"}">학부모 안내서</h1>
        <h2 class="${"name svelte-1ipz6i3"}">${escape($name)}</h2></div>
    <div class="${"logo-container svelte-1ipz6i3"}"><div class="${"logo svelte-1ipz6i3"}"></div>
        <div class="${"logo-title svelte-1ipz6i3"}">인코딩플러스<br>Incoding Plus</div></div>
    ${slots.default ? slots.default({}) : ``}
</main>`;
});
export {
  Layout as default
};
