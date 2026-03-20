import { auth } from "@/auth";
import { headers } from "next/headers";

import { Types } from "mongoose";

export async function getFlowUserId(): Promise<Types.ObjectId | null> {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user.id) return null;

    const flowUserId = new Types.ObjectId(session.user.id);

    return flowUserId;
}