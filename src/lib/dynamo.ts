import { 
    AttributeValue,
    DynamoDBClient,
    ExecuteStatementCommand,
    BatchExecuteStatementCommand
} from '@aws-sdk/client-dynamodb';
import type {
    ExecuteStatementCommandOutput
} from '@aws-sdk/client-dynamodb';
import { v4 } from 'uuid';

export interface DyData{
    id:string;
    user_id:string;
    subject:string;
    course:string;
    homework:string;
    view:boolean;
}

export class Dynamo{
    static get getClient(){
        const _client = new DynamoDBClient({ 
            region: "ap-northeast-2",
            credentials:{
                accessKeyId:import.meta.env.VITE_AWS_ACCESS ?? process.env.VITE_AWS_ACCESS,
                secretAccessKey:import.meta.env.VITE_AWS_SECRET ?? process.env.VITE_AWS_SECRET
            }
        });
        return _client;
    }
    static async getAll(id = ''){
        const client = this.getClient;
        let command = new ExecuteStatementCommand({
            Statement:`select * from "incodingplus-parent"`,
        });
        if(id){
            command = new ExecuteStatementCommand({
                Statement:`select * from "incodingplus-parent" where "user_id" = ? or "user_id"='all'`,
                Parameters:[
                    { S : String(id) }
                ]
            });
        }
        try{
            const res = await client.send(command);
            if(!res.Items) throw Error('Items 없음');
            const p = this.toObj(res);
            client.destroy();
            return p as DyData[];
        } catch(err){
            client.destroy();
            throw err;
        }
    }
    static async setAll(objs:DyData[], del:[string, string][] = []){
        if(objs.length === 0 && del.length === 0) return;
        const client = this.getClient;
        let inserts = objs.filter(v => !v.id);
        let updates = objs.filter(v => v.id && !(del.find(t => t[0] === v.id)));
        const command = new BatchExecuteStatementCommand({
            Statements:[
                ...(inserts.map(v => ({
                    Statement:`insert into "incodingplus-parent" value {'id':?,'user_id':?, 'subject':?, 'course':?, 'homework':?, 'view':?}`,
                    Parameters:[
                        { S : v4() },
                        { S : v.user_id },
                        { S: v.subject },
                        { S: v.course },
                        { S: v.homework },
                        { BOOL: v.view },
                    ]
                }))),
                ...(updates.map(v => ({
                    Statement:`update "incodingplus-parent" set "subject"=? set "course"=? set "homework"=? set "view"=? where "id"=? and "user_id"=?`,
                    Parameters:[
                        { S: v.subject },
                        { S: v.course },
                        { S: v.homework },
                        { BOOL: v.view },
                        { S : v.id },
                        { S : v.user_id },
                    ]
                }))),
                ...(del.map(v => ({
                    Statement:'delete from "incodingplus-parent" where "id"=? and "user_id"=?',
                    Parameters:[
                        { S : v[0] },
                        { S : v[1] },
                    ]
                })))
            ]
        });
        try{
            const res = await client.send(command);
            client.destroy();
            return res;
        } catch(err){
            client.destroy();
            throw err;
        }
    }
    static toValue(value:AttributeValue):any{
        if('S' in value && value.S){
            return value.S;
        } else if('N' in value && !isNaN(Number(value.N))){
            return Number(value.N);
        } else if('SS' in value || 'NULL' in value){
            return value.SS ?? [];
        } else if('M' in value && value.M){
            const result:{[key:string]:any} = {};
            let entries = Object.entries(value.M) as [string, AttributeValue][];
            for(let [key, val] of entries){
                result[key] = this.toValue(val);
            }
            return result;
        } else if('L' in value && value.L){
            return value.L.map(v => this.toValue(v));
        } else {
            return value[Object.keys(value)[0] as keyof typeof value];
        }
    }
    static toObj<T extends object>(output:ExecuteStatementCommandOutput){
        const arr:T[] = [];
        const recursive = (item:Record<string, AttributeValue>) => {
            const result:{[key:string]:any} = {};
            const obj = Object.entries(item);
            for(let [key, value] of obj){
                result[key] = this.toValue(value);
            }
            return result as T;
        };
        if('Items' in output && output.Items) {
            for(let i of output.Items){
                arr.push(recursive(i));
            }
            return arr;
        }
        return [];
    }
}