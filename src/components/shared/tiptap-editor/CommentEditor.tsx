"use client";


// Actions
import { addReactisTaskComment } from "@/features/tasks/actions/add-reactis-task-comment.action";


// Components
import TiptapEditor from "./TiptapEditor";


// Types
type CommentEditorPropsType = {
    reactisTaskId: string,
    reactisUserId: string
};


// Main function
export default function CommentEditor({
    reactisTaskId,
    reactisUserId
}: CommentEditorPropsType) {
    const action = addReactisTaskComment.bind(null, reactisTaskId, reactisUserId);


    return (
        <TiptapEditor
            variant="comment"
            reactisTaskId={reactisTaskId}
            action={action}
        />
    );
}