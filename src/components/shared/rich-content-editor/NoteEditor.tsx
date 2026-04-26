"use client";

// Actions
import { updateFlowNote } from "@/features/tasks/actions/update-flow-note.action";

// Context
import { useRichContentEditorContext } from "@/features/tasks/context/rich-content-editor.context";

// Components
import RichContentEditor from "./RichContentEditor";

// Types
type NoteEditorPropsType = {
    savedNote?: string,
    reactisTaskId: string
};

export default function NoteEditor({ savedNote, reactisTaskId }: NoteEditorPropsType) {
    const {
        onNoteDirtyChange,
        isNoteFocused,
        onNoteFocusChange
    } = useRichContentEditorContext();

    const action = updateFlowNote.bind(null, reactisTaskId);

    return (
        <RichContentEditor
            version="note"
            savedNote={savedNote}
            reactisTaskId={reactisTaskId}
            context={{
                onDirtyChange: onNoteDirtyChange,
                isFocused: isNoteFocused,
                onFocusChange: onNoteFocusChange
            }}
            action={action}
        />
    );
}