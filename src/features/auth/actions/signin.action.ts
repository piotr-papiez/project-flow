"use server";

// Auth
import { auth } from "@/auth";

// Next.js
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Repo
import { findReactisUserIdByFlowUserId } from "@/features/settings/repo/reactis-settings.repo";

// Cookies
import { setReactisUserIdCookie } from "../lib/reactis-user-id-cookie";

// Types
import { Types } from "mongoose";

type LoginStateType = {};

export async function signin(prevState: LoginStateType, formData: FormData): Promise<void> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email || !password) return;

    const response = await auth.api.signInEmail({
        body: { email, password, rememberMe: true },
        headers: await headers(),
    });

    const { id } = response.user;
    if (!Types.ObjectId.isValid(id)) return;
    const flowUserId = new Types.ObjectId(id);

    const reactisUserId = await findReactisUserIdByFlowUserId(flowUserId);
    if (!reactisUserId) return;

    setReactisUserIdCookie(reactisUserId);

    redirect("/tasks");
}