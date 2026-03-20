import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Missing MONGODB_URI");

declare global {
    var _mongooseClient: typeof mongoose | undefined;
    var _mongoosePromise: Promise<typeof mongoose> | undefined;
}

export const mongooseClient =
    global._mongooseClient ?? (global._mongooseClient = mongoose);

export const mongoosePromise =
    global._mongoosePromise ?? (global._mongoosePromise = mongooseClient.connect(uri, { bufferCommands: false }));

export function db() {
    return mongoosePromise;
}