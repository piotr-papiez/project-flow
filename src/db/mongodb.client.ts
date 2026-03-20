import { MongoClient } from "mongodb";

import type { Db } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Missing MONGODB_URI");

declare global {
    var _mongoClient: MongoClient | undefined;
    var _mongoClientPromise: Promise<MongoClient> | undefined;
    var _mongoDbPromise: Promise<Db> | undefined;
}

export const mongoClient =
    global._mongoClient ?? (global._mongoClient = new MongoClient(uri));

export const mongoClientPromise =
    global._mongoClientPromise ?? (global._mongoClientPromise = mongoClient.connect());

export const mongoDbPromise =
    global._mongoDbPromise ?? (global._mongoDbPromise = mongoClientPromise.then(client => client.db()));

export async function db() {
    return mongoDbPromise;
}