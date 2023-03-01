import { DynamoDBClient, ExecuteStatementCommand, BatchExecuteStatementCommand } from "@aws-sdk/client-dynamodb";
import { v4 } from "uuid";
class Dynamo {
  static get getClient() {
    const _client = new DynamoDBClient({
      region: "ap-northeast-2",
      credentials: {
        accessKeyId: "AKIAQ34FF2CIZSAL6VOD",
        secretAccessKey: "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"
      }
    });
    return _client;
  }
  static async getAll(id = "") {
    const client = this.getClient;
    let command = new ExecuteStatementCommand({
      Statement: `select * from "incodingplus-parent"`
    });
    if (id) {
      command = new ExecuteStatementCommand({
        Statement: `select * from "incodingplus-parent" where "user_id" = ? or "user_id"='all'`,
        Parameters: [
          { S: String(id) }
        ]
      });
    }
    try {
      const res = await client.send(command);
      if (!res.Items)
        throw Error("Items 없음");
      const p = this.toObj(res);
      client.destroy();
      return p;
    } catch (err) {
      client.destroy();
      throw err;
    }
  }
  static async setAll(objs, del = []) {
    if (objs.length === 0 && del.length === 0)
      return;
    const client = this.getClient;
    let inserts = objs.filter((v) => !v.id);
    let updates = objs.filter((v) => v.id && !del.find((t) => t[0] === v.id));
    const command = new BatchExecuteStatementCommand({
      Statements: [
        ...inserts.map((v) => ({
          Statement: `insert into "incodingplus-parent" value {'id':?,'user_id':?, 'subject':?, 'course':?, 'homework':?, 'view':?}`,
          Parameters: [
            { S: v4() },
            { S: v.user_id },
            { S: v.subject },
            { S: v.course },
            { S: v.homework },
            { BOOL: v.view }
          ]
        })),
        ...updates.map((v) => ({
          Statement: `update "incodingplus-parent" set "subject"=? set "course"=? set "homework"=? set "view"=? where "id"=? and "user_id"=?`,
          Parameters: [
            { S: v.subject },
            { S: v.course },
            { S: v.homework },
            { BOOL: v.view },
            { S: v.id },
            { S: v.user_id }
          ]
        })),
        ...del.map((v) => ({
          Statement: 'delete from "incodingplus-parent" where "id"=? and "user_id"=?',
          Parameters: [
            { S: v[0] },
            { S: v[1] }
          ]
        }))
      ]
    });
    try {
      const res = await client.send(command);
      client.destroy();
      return res;
    } catch (err) {
      client.destroy();
      throw err;
    }
  }
  static toValue(value) {
    if ("S" in value && value.S) {
      return value.S;
    } else if ("N" in value && !isNaN(Number(value.N))) {
      return Number(value.N);
    } else if ("SS" in value || "NULL" in value) {
      return value.SS ?? [];
    } else if ("M" in value && value.M) {
      const result = {};
      let entries = Object.entries(value.M);
      for (let [key, val] of entries) {
        result[key] = this.toValue(val);
      }
      return result;
    } else if ("L" in value && value.L) {
      return value.L.map((v) => this.toValue(v));
    } else {
      return value[Object.keys(value)[0]];
    }
  }
  static toObj(output) {
    const arr = [];
    const recursive = (item) => {
      const result = {};
      const obj = Object.entries(item);
      for (let [key, value] of obj) {
        result[key] = this.toValue(value);
      }
      return result;
    };
    if ("Items" in output && output.Items) {
      for (let i of output.Items) {
        arr.push(recursive(i));
      }
      return arr;
    }
    return [];
  }
}
export {
  Dynamo as D
};
