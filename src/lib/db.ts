import { MongoClient, Db } from 'mongodb';
import { env } from '$env/dynamic/private';

let db: Db;

export async function connectToDatabase(): Promise<Db> {
  const client = new MongoClient(env.MONGO_URI as string);
  if (!db) {
    await client.connect();
    db = client.db();  // Esto es de tipo `Db`
  }
  
  return db;  // Tipado como `Db`
}