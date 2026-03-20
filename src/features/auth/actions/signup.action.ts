"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

type RegisterStateType = {};

export async function signup(prevState: RegisterStateType, formData: FormData): Promise<void> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) return;

    await auth.api.signUpEmail({
        body: {
            name: email.split("@")[0],
            email,
            password
        }
    });

    redirect("/tasks");
}