import { c as create_ssr_component, d as each, h as add_attribute, e as escape, i as null_to_empty } from "../../../chunks/index2.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '@charset "UTF-8";table.svelte-1qaqwvc.svelte-1qaqwvc{border-collapse:collapse}table.svelte-1qaqwvc tr td.svelte-1qaqwvc{text-align:center}table.svelte-1qaqwvc tr.button button.svelte-1qaqwvc{box-sizing:border-box;width:100%;height:100%}table.svelte-1qaqwvc tr.yes.svelte-1qaqwvc{background-color:rgba(255, 0, 0, 0.2)}table.svelte-1qaqwvc tr.yes button.svelte-1qaqwvc::before{content:"✓";color:green}table.svelte-1qaqwvc tr.no button.svelte-1qaqwvc::before{content:"✕";color:red}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let del = [];
  data.datas.sort((a, b) => {
    let x = data.parse.find((v) => v[0] === a.user_id) ?? ["all", "모든 학생"];
    let y = data.parse.find((v) => v[0] === b.user_id) ?? ["all", "모든 학생"];
    return x[1].localeCompare(y[1]);
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<table class="${"svelte-1qaqwvc"}"><tbody><tr><th>학생 이름</th>
            <th>과목</th>
            <th>코스</th>
            <th>숙제</th>
            <th>보기</th>
            <th>삭제</th></tr>
        ${each(data.datas, (info, ind) => {
    return `<tr${add_attribute("data-id", info.id, 0)} class="${escape(null_to_empty(del.find((v) => v[0] === info.id) ? "yes" : "no"), true) + " svelte-1qaqwvc"}"><td class="${"svelte-1qaqwvc"}"><select ${!!info.id ? "disabled" : ""}><option value="${"all"}">모든 학생</option>${each(data.parse, (v) => {
      return `<option${add_attribute("value", v[0], 0)}>${escape(v[1])}</option>`;
    })}</select></td>
                <td class="${"svelte-1qaqwvc"}"><input type="${"text"}"${add_attribute("value", info.subject, 0)}></td>
                <td class="${"svelte-1qaqwvc"}"><input type="${"text"}"${add_attribute("value", info.course, 0)}></td>
                <td class="${"svelte-1qaqwvc"}"><input type="${"text"}"${add_attribute("value", info.homework, 0)}></td>
                <td class="${"svelte-1qaqwvc"}"><input type="${"checkbox"}"${add_attribute("checked", info.view, 1)}></td>
                <td class="${"svelte-1qaqwvc"}"><button class="${"svelte-1qaqwvc"}"></button></td>
           </tr>`;
  })}
        <tr class="${"button"}"><td colspan="${"6"}" class="${"svelte-1qaqwvc"}"><button class="${"svelte-1qaqwvc"}">추가</button></td></tr>
        <tr class="${"button"}"><td colspan="${"6"}" class="${"svelte-1qaqwvc"}"><button class="${"svelte-1qaqwvc"}">적용</button></td></tr></tbody>
</table>`;
});
export {
  Page as default
};
