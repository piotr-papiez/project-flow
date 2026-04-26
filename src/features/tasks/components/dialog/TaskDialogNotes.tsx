// Components
import NoteEditor from "@/components/shared/rich-content-editor/NoteEditor";

// Radix
import {
    Flex, Blockquote
} from "@radix-ui/themes";

// Types
type TaskDialogNotesPropsType = {
    note?: string,
    reactisTaskId?: string
};

export default function TaskDialogNotes({
    note, reactisTaskId
}: TaskDialogNotesPropsType) {
    return (
        <Flex direction="column" gap="4" style={{ minHeight: "100%", maxHeight: "min(50dvh, 488px)" }}>
            <Blockquote>
                <Flex direction="column" gap="1">
                    <NoteEditor
                        savedNote={note}
                        reactisTaskId={reactisTaskId ?? ""}
                    />
                </Flex>
            </Blockquote>
        </Flex>
    );
}