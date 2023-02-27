import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess:preprocess(),
	kit: {
		adapter: adapter({runtime:'nodejs18.x'}),
		prerender:{
			crawl:true,
			entries:[
				"/5a81fb60-0832-4f56-9aa8-72788c85983b"
			]
		}
	},
};

export default config;
