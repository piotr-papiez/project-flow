"use server";

import { revalidateTag } from "next/cache";

import { setFlowStatus } from "@/features/tasks/repo/flow-tasks.repo";

export async function updateFlowTaskStatus(reactisTaskId: string, flowStatusValue: number): Promise<void> {
    await setFlowStatus(reactisTaskId, flowStatusValue);
    
    revalidateTag("tasks", "max");
}