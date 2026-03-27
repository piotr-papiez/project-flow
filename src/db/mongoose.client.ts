import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

declare global {
    var _mongooseConnPromise: Promise<typeof mongoose> | undefined;
}

export async function db(): Promise<typeof mongoose> {
    if (!uri) throw new Error("Missing MONGODB_URI");

    const state = mongoose.connection.readyState;

    if (state === 1) return mongoose;

    if (state === 2 && global._mongooseConnPromise) {
        return global._mongooseConnPromise;
    }

    global._mongooseConnPromise = mongoose.connect(uri, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 10000
    });

    try {
        await global._mongooseConnPromise;
        return mongoose;
    } catch (error) {
        global._mongooseConnPromise = undefined;
        throw error;
    }
}

// declare global {
//     var _mongooseClient: typeof mongoose | undefined;
//     var _mongoosePromise: Promise<typeof mongoose> | undefined;
// }

// export const mongooseClient =
//     global._mongooseClient ?? (global._mongooseClient = mongoose);

// export const mongoosePromise =
//     global._mongoosePromise ?? (global._mongoosePromise = mongooseClient.connect(uri, { bufferCommands: false }));

// export function db() {
//     return mongoosePromise;
// }