"use client";


// Actions
import { updateFlowNote } from "@/features/tasks/actions/update-flow-note.action";


// Components
import TiptapEditor from "./TiptapEditor";


// Types
import type { JSONContent } from "@tiptap/react";


type NoteEditorPropsType = {
    reactisTaskId: string
    note: JSONContent,
};


// Main function
export default function NoteEditor({ reactisTaskId, note }: NoteEditorPropsType) {
    const action = updateFlowNote.bind(null, reactisTaskId);


    return (
        <TiptapEditor
            action={action}
            reactisTaskId={reactisTaskId}
            variant="note"
        />
    );
}