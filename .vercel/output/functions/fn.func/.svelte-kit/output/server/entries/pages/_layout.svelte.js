import { c as create_ssr_component, a as subscribe, e as escape } from "../../chunks/index2.js";
import { n as name } from "../../chunks/store.js";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: 'main.svelte-1qfbfci.svelte-1qfbfci{display:flex;flex-direction:column;align-items:center;overflow-y:auto;height:100vh;width:100%;box-sizing:border-box;max-width:1000px;margin:auto;background-color:ghostwhite}main.svelte-1qfbfci .title.svelte-1qfbfci{padding-top:4em;padding-bottom:5em;display:inline-block}main.svelte-1qfbfci .title .name.svelte-1qfbfci{padding-top:0.3em}main.svelte-1qfbfci .logo-container.svelte-1qfbfci{display:flex;align-items:center;margin-bottom:5em}main.svelte-1qfbfci .logo-container .logo.svelte-1qfbfci{display:inline-block;width:10em;height:10em;background-image:url("/svelte-logo.svg")}main.svelte-1qfbfci .logo-container .logo-title.svelte-1qfbfci{font-size:2em;font-weight:900;color:rgb(75, 130, 195)}main.svelte-1qfbfci h1.svelte-1qfbfci{margin:0;font-size:4rem}main.svelte-1qfbfci h2.svelte-1qfbfci{margin:0;font-size:2.5rem}',
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
  return `<main class="${"svelte-1qfbfci"}"><div class="${"title svelte-1qfbfci"}"><h2 class="${"svelte-1qfbfci"}">${escape(String(data.year).slice(2))}년 ${escape(String(data.month + 1).padStart(2, "0"))}월</h2>
        <h1 class="${"svelte-1qfbfci"}">학부모 안내서</h1>
        <h2 class="${"name svelte-1qfbfci"}">${escape($name)} 학생</h2></div>
    <div class="${"logo-container svelte-1qfbfci"}"><div class="${"logo svelte-1qfbfci"}"></div>
        <div class="${"logo-title svelte-1qfbfci"}">인코딩플러스<br>Incoding Plus</div></div>
    ${slots.default ? slots.default({}) : ``}
</main>`;
});
export {
  Layout as default
};
