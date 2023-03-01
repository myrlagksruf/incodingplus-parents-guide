export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","svelte-logo.svg","svelte-logo2.svg"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.393468e5.js","imports":["_app/immutable/entry/start.393468e5.js","_app/immutable/chunks/index.dd362075.js","_app/immutable/chunks/singletons.5292542f.js","_app/immutable/chunks/index.cf08de6d.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.e1ef33bd.js","imports":["_app/immutable/entry/app.e1ef33bd.js","_app/immutable/chunks/index.dd362075.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js'),
			() => import('../output/server/nodes/4.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/ef16c9c7-3f4e-409e-9199-2b832e3946b7",
				pattern: /^\/ef16c9c7-3f4e-409e-9199-2b832e3946b7\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: () => import('../output/server/entries/endpoints/ef16c9c7-3f4e-409e-9199-2b832e3946b7/_server.ts.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
