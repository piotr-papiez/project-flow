"use server";

import { auth } from "@/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation";

import { deleteReactisUserIdCookie } from "../lib/reactis-user-id-cookie";

export async function signout(): Promise<void> {
    await auth.api.signOut({
        headers: await headers()
    });

    deleteReactisUserIdCookie();

    redirect("/signin");
}