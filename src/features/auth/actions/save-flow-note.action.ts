"use server";

import { revalidatePath } from "next/cache";

import { setFlowNote } from "@/features/tasks/repo/flow-tasks.repo";

export async function saveFlowNote(reactisTaskId: string, note: string): Promise<void> {
    await setFlowNote(reactisTaskId, note);

    revalidatePath("/tasks");
}