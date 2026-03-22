"use server";

// Next.js
import { revalidateTag } from "next/cache";

// Repo
import { setFlowNote } from "@/features/tasks/repo/flow-tasks.repo";

// Types
export type SaveFlowNoteActionStateType = {
    ok: boolean,
    error: string | null,
    savedNote: string | null
};

export async function saveFlowNote(
    reactisTaskId: string,
    prevState: SaveFlowNoteActionStateType,
    formData: FormData
): Promise<SaveFlowNoteActionStateType> {
    const note = formData.get("note");

    if (typeof note !== "string") return {
        ok: false,
        error: "INVALID_NOTE",
        savedNote: null
    };

    try {
        await setFlowNote(reactisTaskId, note);

        revalidateTag("tasks", "max");

        return {
            ok: true,
            error: null,
            savedNote: note
        };
    } catch (error) {
        return {
            ok: false,
            error: "SAVING_FAILED",
            savedNote: null
        };
    }
}