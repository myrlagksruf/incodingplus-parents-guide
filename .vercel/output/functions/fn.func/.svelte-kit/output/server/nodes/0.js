import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
export const component = async () => (await import('../entries/pages/_layout.svelte.js')).default;
export const file = '_app/immutable/entry/_layout.svelte.bff07b4f.js';
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/entry/_layout.svelte.bff07b4f.js","_app/immutable/chunks/index.dd362075.js","_app/immutable/chunks/store.4ee234a6.js","_app/immutable/chunks/index.cf08de6d.js"];
export const stylesheets = ["_app/immutable/assets/_layout.4de02eec.css"];
export const fonts = [];
