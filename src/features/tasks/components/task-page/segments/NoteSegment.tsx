// Components
import NoteEditor from "@/components/shared/tiptap-editor/NoteEditor";

// Radix
import {
    Flex, Blockquote
} from "@radix-ui/themes";

// Types
import type { JSONContent } from "@tiptap/react";

type NoteSegmentPropsType = {
    note: JSONContent,
    reactisTaskId?: string
};

export default function NoteSegment({
    note,
    reactisTaskId
}: NoteSegmentPropsType) {
    return (
        <Flex direction="column" gap="4" style={{ minHeight: "100%", maxHeight: "min(50dvh, 488px)" }}>
            <Blockquote>
                <Flex direction="column" gap="1">
                    <NoteEditor
                        note={note}
                        reactisTaskId={reactisTaskId!}
                    />
                </Flex>
            </Blockquote>
        </Flex>
    );
}