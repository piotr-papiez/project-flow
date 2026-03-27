"use server";

// Next.js
import { revalidatePath } from "next/cache";

// Repo
import { setFlowNote } from "@/features/tasks/repo/flow-tasks.repo";

// Types
export type UpdateFlowNoteActionStateType = {
    ok: boolean,
    error: string | null,
    updatedNote: string | null
};

export async function updateFlowNote(
    reactisTaskId: string,
    prevState: UpdateFlowNoteActionStateType,
    formData: FormData
): Promise<UpdateFlowNoteActionStateType> {
    const note = formData.get("note");

    if (typeof note !== "string") return {
        ok: false,
        error: "INVALID_NOTE",
        updatedNote: null
    };

    try {
        await setFlowNote(reactisTaskId, note);

        revalidatePath("/tasks");

        return {
            ok: true,
            error: null,
            updatedNote: note
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            error: "SAVING_FAILED",
            updatedNote: null
        };
    }
}