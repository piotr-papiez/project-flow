"use server";

import { revalidatePath } from "next/cache";

import { setFlowPriority } from "@/features/tasks/repo/flow-tasks.repo";

export async function updateFlowTaskPriority(reactisTaskId: string, flowPriorityValue: number): Promise<void> {
    await setFlowPriority(reactisTaskId, flowPriorityValue);
    
    revalidatePath("/tasks");
}