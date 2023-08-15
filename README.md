# 依赖介绍

本依赖仅适用于 Laf！相同 K8S 集群下可以跨应用操作数据库。

如：laf.dev 的不同账号或者不同应用可以互相操作数据库

laf.dev 和 laf.run 的无法互通，他们不在一个 K8S 集群内！

# 使用方法

## 安装依赖

左下角添加 NPM 依赖，搜索 `nw-db`，并安装

## 获取原应用的数据库链接地址

新建一个云函数，打印数据库链接地址

`console.log(process.env.DB_URI)`

## 其他应用调用示例代码

```js
import cloud from '@lafjs/cloud'
import { createDb } from 'nw-db'

export default async function (ctx: FunctionContext) {
  // 填入上一步中获取的 uri 地址
  const uri = 'mongodb://sc64px:EuV9oK1F036zf89vGg8wb6WdqHqk7NiHN2xCig1iKB1y6vc5uoJSD7pbIIxk6h0t@mongodb-0.mongo.laf-system.svc.cluster.local:27017/sc64px?authSource=sc64px&replicaSet=rs0&w=majority' 

  const db2 = await createDb(uri)
  const res2 = await db2.collection("user").get()
  console.log(res2)

  const db = cloud.database()
  const res = await db.collection("user").get()
  console.log(res)
}
```
