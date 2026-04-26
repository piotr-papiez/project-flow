"use server";

// Next.js
import { revalidatePath } from "next/cache";

// Repo
import { postReactisTaskComment } from "../repo/reactis-tasks.repo";

export type PostReactisTaskCommentActionStateType = {
    ok: boolean,
    error: string | null,
    content: string | null
};

export async function addReactisTaskComment(
    reactisTaskId: string,
    reactisUserId: string,
    prevState: PostReactisTaskCommentActionStateType,
    formData: FormData
): Promise<PostReactisTaskCommentActionStateType> {
    const comment = formData.get("comment");

    if (typeof comment !== "string") return {
        ok: false,
        error: "INVALID_NOTE",
        content: null
    }

    try {
        await postReactisTaskComment(reactisTaskId, reactisUserId, comment);

        revalidatePath("/tasks");

        return {
            ok: true,
            error: null,
            content: null
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            error: "SAVING_FAILED",
            content: null
        }
    }
}