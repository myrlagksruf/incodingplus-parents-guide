import type { LayoutServerLoad } from './$types'

const YM = import.meta.env.VITE_YM ?? process.env.VITE_YM;
export const prerender = true;

const y = YM.match(/^\d+/)?.[0] ?? '2023';
const m = YM.match(/\d+$/)?.[0] ?? '0';

const date = new Date(Number(y), Number(m) - 1);

export const load:LayoutServerLoad = () => {
    return {
        year:date.getFullYear(),
        month:date.getMonth()
    }
}