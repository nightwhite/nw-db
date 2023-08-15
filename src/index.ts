import { Db, MongoAccessor, getDb } from 'database-proxy';
import * as mongodb_uri from 'mongodb-uri';
import * as mongodb from 'mongodb'

/**
 * 创建数据库实例
 * @param uri 数据库连接 URI
 * @returns 数据库实例
 * @throws 如果未提供有效的 URI，则抛出错误
 */
async function createDb(uri?: string): Promise<Db> {
  if (!uri) {
    throw new Error('Database URI is required');
  }

  const { database } = mongodb_uri.parse(uri);
  const accessor = new MongoAccessor(database!, uri);

  try {
    await accessor.init();
    console.log('db connected');
  } catch (error) {
    console.error(error);
    setTimeout(() => process.exit(101), 0);
  }

  return getDb(accessor);
}

interface MongoDriverObject {
  client: mongodb.MongoClient
  db: mongodb.Db
}

/**
 * 创建原生数据库实例
 * @param uri 数据库连接 URI
 * @returns 数据库实例 client 和 db
 * @throws 如果未提供有效的 URI，则抛出错误
 */
async function createMongo(uri?: string): Promise<MongoDriverObject> {
  if (!uri) {
    throw new Error('Database URI is required');
  }

  const { database } = mongodb_uri.parse(uri);
  const accessor = new MongoAccessor(database!, uri);

  try {
    await accessor.init();
    console.log('db connected');
  } catch (error) {
    console.error(error);
    setTimeout(() => process.exit(101), 0);
  }

  return {
    client: accessor.conn,
    db: accessor.db,
  };
}

export {
  createDb,
  createMongo
};