import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db } from "./db/mongodb.client";

const secret = process.env.BETTER_AUTH_SECRET;
const baseURL = process.env.BETTER_AUTH_URL;

if (!secret) throw new Error("Missing BETTER_AUTH_SECRET");
if (!baseURL) throw new Error("Missing BETTER_AUTH_URL");

const mongoConnection = await db();

export const auth = betterAuth({
    baseURL,
    secret,
    database: mongodbAdapter(mongoConnection),
    emailAndPassword: { enabled: true, minPasswordLength: 6 },
    plugins: [nextCookies()]
});