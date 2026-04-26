"use client";

// Actions
import { addReactisTaskComment } from "@/features/tasks/actions/add-reactis-task-comment.action";

// Context
import { useRichContentEditorContext } from "@/features/tasks/context/rich-content-editor.context";

// Components
import RichContentEditor from "./RichContentEditor";

// Types
type CommentEditorPropsType = {
    reactisTaskId: string,
    reactisUserId: string
};

export default function CommentEditor({ reactisTaskId, reactisUserId }: CommentEditorPropsType) {
    const {
        onCommentDirtyChange,
        isCommentFocused,
        onCommentFocusChange
    } = useRichContentEditorContext();

    const action = addReactisTaskComment.bind(null, reactisTaskId, reactisUserId);

    return (
        <RichContentEditor
            version="comment"
            reactisTaskId={reactisTaskId}
            reactisUserId={reactisUserId}
            context={{
                onDirtyChange: onCommentDirtyChange,
                isFocused: isCommentFocused,
                onFocusChange: onCommentFocusChange
            }}
            action={action}
        />
    );
}