import type { iComment, iHome } from "$lib/pg";
import json from '$lib/parse.json';
export class OrderClass{
    private static _subjectOrder:{[key:string]:number} = {
        '코딩':1,
        '국어':2,
        '수학':3,
    };

    private static _courseOrder:{[key:string]:number} = {
        'HTML/CSS 입문':0,
        'HTML/CSS 응용':1,
        'JS 따라해보기':2,
        'JS Basic':3,
        'JS Intermediate':4,
        'JS Level Up':5,
        'JS Level Up 2':6,
        'JS Advanced':7,
        'JS Advanced 2':8,
        '진법' : 1,
        '경우의 수': 2,
        '파이썬 입문':1,
        '파이썬 반복문':2,
        '파이썬':3,
    }
    private static _subjectToComment:{[key:string]:string[]} = {
        '코딩':['입시'],
        '국어':['독서', '국어']
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
    static parseComment(vals:iComment[], 과목:string){
        let comments = this._subjectToComment[과목];
        if(!this._subjectToComment[과목]) return [];
        let result:{
            과목:string;
            코멘트:string;
        }[] = [];
        for(let i of vals){
            let mat = i.코멘트.match(/\(([가-힣]+)/);
            if(!mat || !comments.includes(mat[1])) continue;
            // if(i.코멘트.split('\n')[0].search(/완[성료]/) === -1) continue;
            result.push({
                과목:mat[1],
                코멘트:i.코멘트
            });
        }
        return result;
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
                    return ['코딩', arr[1].slice(3), `${arr[2]}.${arr[3]}`]
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
            /^\[(HTML\/CSS|JS 따라해보기|JS Basic|JS Intermediate|JS Level Up|JS Advanced|파이썬)/, obj => {
                const arr = defaultFunc(obj);
                arr[0] = '코딩';
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