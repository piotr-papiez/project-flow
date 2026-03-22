// Next.js
import { redirect } from "next/navigation";
import { headers } from "next/headers";

// React.js
import type { ReactNode } from "react";

// Better auth
import { auth } from "@/auth";

// Types
type TasksLayoutPropsType = {
    children: ReactNode,
    dialog: ReactNode
};

export default async function TasksLayout({ children, dialog }: TasksLayoutPropsType) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) redirect("/signin");

    return (
        <>
            {children}
            {dialog}
        </>
    );
}