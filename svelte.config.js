import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import fs from 'fs';
/** @type {string[]} */
let entries = [];
if(process.env.NODE_ENV === 'production'){
	let file = fs.readFileSync('./src/lib/data.json', {encoding:'utf-8'});
	entries = JSON.parse(file).map(v => `/${v[0]}`);
	console.log(entries);
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess:preprocess(),
	kit: {
		adapter: adapter({runtime:'nodejs18.x', regions:['icn1']}),
		prerender:{
			crawl:false,
			entries,
		},

	},
};

export default config;
