"use server";

// Next.js
import { revalidatePath } from "next/cache";

// Repo
import { setFlowNote } from "@/features/tasks/repo/flow-tasks.repo";

// Types
export type UpdateFlowNoteActionStateType = {
    ok: boolean,
    error: string | null,
    content: string | null
};

export async function updateFlowNote(
    reactisTaskId: string,
    prevState: UpdateFlowNoteActionStateType,
    formData: FormData
): Promise<UpdateFlowNoteActionStateType> {
    const stringNote = formData.get("note");

    if (typeof stringNote !== "string") return {
        ok: false,
        error: "INVALID_NOTE",
        content: null
    }

    try {
        const jsonNote = JSON.parse(stringNote)
        await setFlowNote(reactisTaskId, jsonNote);

        revalidatePath("/tasks");

        return {
            ok: true,
            error: null,
            content: jsonNote
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            error: "SAVING_FAILED",
            content: null
        };
    }
}