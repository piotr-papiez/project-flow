"use server";

import { revalidateTag } from "next/cache";

import { setFlowPriority } from "@/features/tasks/repo/flow-tasks.repo";

export async function updateFlowTaskPriority(reactisTaskId: string, flowPriorityValue: number): Promise<void> {
    await setFlowPriority(reactisTaskId, flowPriorityValue);
    
    revalidateTag("tasks", "max");
}