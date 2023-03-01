export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","svelte-logo.svg","svelte-logo2.svg"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.2dad572d.js","imports":["_app/immutable/entry/start.2dad572d.js","_app/immutable/chunks/index.dd362075.js","_app/immutable/chunks/singletons.ef27b77d.js","_app/immutable/chunks/index.cf08de6d.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.975f7d89.js","imports":["_app/immutable/entry/app.975f7d89.js","_app/immutable/chunks/index.dd362075.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/3.js')
		],
		routes: [
			{
				id: "/ef16c9c7-3f4e-409e-9199-2b832e3946b7",
				pattern: /^\/ef16c9c7-3f4e-409e-9199-2b832e3946b7\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: () => import('../output/server/entries/endpoints/ef16c9c7-3f4e-409e-9199-2b832e3946b7/_server.ts.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
