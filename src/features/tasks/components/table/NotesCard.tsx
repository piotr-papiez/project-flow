"use client";

// React.js
import { useState, useEffect } from "react";

// Components
import NoteEditor from "@/components/shared/rich-content-editor/NoteEditor";
import Alert from "@/components/shared/rich-content-editor/Alert";

// Utils
import { tiptapJsonToHtml } from "../../utils/tiptap-types-converter";

// Context
import { useRichContentEditorContext } from "../../context/rich-content-editor.context";

// Radix
import {
    Box, Flex, HoverCard, Heading,
    Blockquote, Avatar, Text
} from "@radix-ui/themes";

import { ReaderIcon } from "@radix-ui/react-icons";

// Types
import type { JSONContent } from "@tiptap/react";

type TableCellNotesPropsType = {
    reactisTaskId: string
    notes: JSONContent,
};

export default function TableCellNotes({ reactisTaskId, notes }: TableCellNotesPropsType) {
    const [isCardOpen, setIsCardOpen] = useState<boolean>(false);
    const [updatedNoteValue, setUpdatedNoteValue] = useState<JSONContent>(notes);
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

    const { isNoteFocused, isNoteDirty, onNoteDirtyChange } = useRichContentEditorContext();

    function handleOpenCard(open: boolean): void {
        if (isNoteFocused) return;

        if (isNoteDirty) {
            setIsAlertOpen(true);
            return;
        }

        setIsCardOpen(open);
    }

    function handleCancelAlert() {
        setIsAlertOpen(false);
    }

    function handleAcceptAlert() {
        setIsAlertOpen(false);
        setIsCardOpen(false);
        onNoteDirtyChange(false);
    }

    useEffect(() => {
        setUpdatedNoteValue(notes);
    }, [notes, isNoteFocused]);


    const htmlUpdatedNoteValue = tiptapJsonToHtml(updatedNoteValue);

    return (
        <>
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
                            style={{
                                maxWidth: 180,
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: "vertical"
                            }}
                        >
                            {updatedNoteValue ? (
                                <span dangerouslySetInnerHTML={{ __html: htmlUpdatedNoteValue }} />
                            ) : (
                                <Text className="NoDetailsText">Brak notatki</Text>
                            )}
                        </Box>
                    </Flex>
                </HoverCard.Trigger>

                <HoverCard.Content >
                    <Flex direction="column" gap="3">
                        <Heading size="4" as="h3">
                            Notatki
                        </Heading>

                        <>
                            <Blockquote>
                                <NoteEditor
                                    savedNote={updatedNoteValue}
                                    reactisTaskId={reactisTaskId}
                                />
                            </Blockquote>
                        </>
                    </Flex>
                </HoverCard.Content>
            </HoverCard.Root>

            <Alert
                alertState={{
                    isAlertOpen,
                    onAlertOpenChange: setIsAlertOpen
                }}
                alertHandlers={{
                    handleCancelAlert,
                    handleAcceptAlert
                }}
            />
        </>
    );
}