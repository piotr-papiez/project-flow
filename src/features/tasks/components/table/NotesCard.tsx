"use client";

// Components
import RichContentEditor from "@/components/shared/rich-content-editor/RichContentEditor";

// Hooks
import { useState, useEffect } from "react";

// Radix
import {
    Box, Flex, HoverCard, Heading,
    Blockquote, Avatar
} from "@radix-ui/themes";

import { ReaderIcon } from "@radix-ui/react-icons";

type TableCellNotesPropsType = {
    reactisTaskId: string
    notes: string,
};

export default function TableCellNotes({ reactisTaskId, notes }: TableCellNotesPropsType) {
    const [isCardOpen, setIsCardOpen] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const [updatedNoteValue, setUpdatedNoteValue] = useState<string>(notes);

    function handleOpenCard(open: boolean): void {
        if (isFocused) return;
        setIsCardOpen(open);
    }

    useEffect(() => {
        setUpdatedNoteValue(notes);
    }, [notes, isFocused]);

    return (
        <HoverCard.Root
            open={isCardOpen}
            onOpenChange={handleOpenCard}
            openDelay={750}
            closeDelay={250}
        >
            <HoverCard.Trigger>
                <Flex align="center" gap="2">
                    <Avatar
                        size="1"
                        color="gray"
                        fallback={<ReaderIcon />}
                    />

                    <Box
                        dangerouslySetInnerHTML={{ __html: updatedNoteValue }}
                        style={{
                            maxWidth: 180,
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical"
                        }}
                    />
                </Flex>
            </HoverCard.Trigger>

            <HoverCard.Content >
                <Flex direction="column" gap="3">
                    <Heading size="4" as="h3">
                        Notatki
                    </Heading>

                    <>
                        <Blockquote>
                            <RichContentEditor
                                savedNotes={updatedNoteValue}
                                reactisTaskId={reactisTaskId}
                                editorState={{
                                    isFocused,
                                    onFocusChange: setIsFocused,
                                    isDirty,
                                    onDirtyChange: setIsDirty
                                }}
                            />
                        </Blockquote>
                    </>
                </Flex>
            </HoverCard.Content>
        </HoverCard.Root>
    );
}