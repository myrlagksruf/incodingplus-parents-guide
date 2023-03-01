// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	interface ImportMetaEnv{
		readonly VITE_YM:string;
		readonly VITE_DB_HOST:string;
		readonly VITE_DB_PORT:string;
		readonly VITE_DB_BASE:string;
		readonly VITE_DB_USER:string;
		readonly VITE_DB_PASS:string;
		readonly VITE_AWS_ACCESS:string;
		readonly VITE_AWS_SECRET:string;
	}
}

export {};
