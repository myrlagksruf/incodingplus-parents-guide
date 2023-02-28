import type { iHome } from "$lib/pg";
import json from '$lib/parse.json';
export class OrderClass{
    private static _subjectOrder:{[key:string]:number} = {
        'Web<br>Programming':0,
        'JS':1,
        '국어':2,
        '수학':3,
        'JS Level Up':4,
        'JS Level Up 2':5,
        'JS Advanced':6,
        'JS Advanced 2':7,
    };

    private static _courseOrder:{[key:string]:number} = {
        'HTML/CSS 입문':0,
        'HTML/CSS 응용':1,
        'JS 따라해보기':2,
        'JS Basic':3,
        'JS Intermediate':4,
        '진법' : 1,
        '경우의 수': 2
    }

    private static _homeworkOrder:{[key:string]:{i:number,p?:number,n?:number;o?:number}} = json;

    static getSubjectOrder(val:string){
        let index = this._subjectOrder[val] ?? Infinity;
        return index;
    }

    static getCourseOrder(val:string){
        let index = this._courseOrder[val] ?? Infinity;
        return index;
    }

    static getHomeworkOrder(val:string){
        let index = this._homeworkOrder[val] ?? {i:-1};
        return index;
    }
}

export const parse = (obj: iHome) => {
    const defaultFunc = (obj: iHome): [string, string, string] => {
        return [obj.과목, obj.수업명.match(/^\[(.+?)\]/)?.[1] ?? obj.과목, obj.수업명.match(/\[.+?\]\s*(.+)$/)?.[1] ?? obj.수업명];
    }
    const parseObj: [RegExp, (obj: iHome) => [string, string, string]][] = [
        [
            /^\[JS Only\] \d{2}\.JS/, (obj) => {
                const arr = obj.숙제명.match(/^\(JS Only\)\s*\((.+)\)\s*(\d+)\-\d+\.(.+)$/);
                if (arr) {
                    return ['JS', arr[1].slice(3), `${arr[2]}.${arr[3]}`]
                }
                return defaultFunc(obj);
            }], [
            /^\[코\s*딩\s*수\s*학\]/, (obj) => {
                const num = Number(obj.수업명.match(/\d+/)?.[0] ?? '0');
                if (num === 0) return defaultFunc(obj);
                let real = obj.수업명.match(/\d+_(\d+)_(.+)$/);
                let str = real ? `${real[1]}. ${real[2]}` : obj.수업명;
                switch (num) {
                    case 1: return [obj.과목, '진법', str];
                    case 2: return [obj.과목, '경우의 수', str];
                }
                return defaultFunc(obj);
            }
        ], [
            /^\[(HTML\/CSS|JS 따라해보기|JS Basic|JS Intermediate|JS Level Up|JS Advanced)/, obj => {
                const arr = defaultFunc(obj);
                arr[0] = 'Web<br>Programming';
                let index = OrderClass.getHomeworkOrder(obj.수업명);
                if(index.i !== -1){
                    arr[2] = `${String(index.o ?? 0).padStart(2, '0')}. ${arr[2]}`;
                }
                return arr;
            }
        ]
    ]
    for (let i of parseObj) {
        if (i[0].test(obj.수업명)) {
            return i[1](obj);
        }
    }
    return defaultFunc(obj);
}