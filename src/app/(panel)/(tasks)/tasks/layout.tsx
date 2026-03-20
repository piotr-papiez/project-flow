import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/auth";

import type { ReactNode } from "react";

type TasksLayoutPropsType = {
    children: ReactNode
};

export default async function TasksLayout({ children }: TasksLayoutPropsType) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) redirect("/signin");

    return (
        <>
            {children}
        </>
    );
}