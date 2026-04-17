"use client";

// React.js
import { useState } from "react";

// Components
import RichContentEditor from "@/components/shared/rich-content-editor/RichContentEditor";

// Radix
import {
    Flex, Blockquote
} from "@radix-ui/themes";

// Types
type TaskDialogMorePropsType = {
    notes?: string,
    reactisTaskId?: string
};

export default function TaskDialogMore({
    notes, reactisTaskId
}: TaskDialogMorePropsType) {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isDirty, setIsDirty] = useState<boolean>(false);

    return (
        <Flex direction="column" gap="4" style={{ minHeight: "100%", maxHeight: "min(50dvh, 488px)" }}>
            <Blockquote>
                <Flex direction="column" gap="1">
                    <RichContentEditor
                        savedNotes={notes}
                        reactisTaskId={reactisTaskId}
                        editorState={{
                            isFocused,
                            onFocusChange: setIsFocused,
                            isDirty,
                            onDirtyChange: setIsDirty
                        }}
                    />
                </Flex>
            </Blockquote>
        </Flex>
    );
}