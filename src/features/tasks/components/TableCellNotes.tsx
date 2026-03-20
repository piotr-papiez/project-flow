"use client";

// Hooks
import { useState } from "react";

// Functions
import { saveFlowNote } from "@/features/auth/actions/save-flow-note.action";

// Radix
import {
    Box, Flex, HoverCard, Heading,
    Button, TextArea, Blockquote, Avatar
} from "@radix-ui/themes";

import { ReaderIcon, Pencil1Icon } from "@radix-ui/react-icons";

type TableCellNotesPropsType = {
    reactisTaskId: string
    notes: string,
};

export default function TableCellNotes({ reactisTaskId, notes }: TableCellNotesPropsType) {
    const [openCard, setOpenCard] = useState<boolean>(false);
    const [isNoteEditing, setIsNoteEditing] = useState<boolean>(false);
    const [noteValue, setNoteValue] = useState<string>(notes);

    function handleOpenCard(open: boolean): void {
        if (isNoteEditing) return;
        setOpenCard(open);
    }

    function handleStartNoteEdit() {
        setIsNoteEditing(true);
        setOpenCard(true);
    }

    function handleCancelNote() {
        setIsNoteEditing(false);
        setOpenCard(false);
        setNoteValue(notes);
    }

    async function handleSaveNote() {
        await saveFlowNote(reactisTaskId, noteValue);
        setIsNoteEditing(false);
        setOpenCard(false);
    }

    return (
        <HoverCard.Root
            open={openCard}
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
                        {notes}
                    </Box>
                </Flex>
            </HoverCard.Trigger>

            <HoverCard.Content >
                <Flex direction="column" gap="3">
                    <Heading size="4" as="h3">
                        Notatki
                    </Heading>

                    {!isNoteEditing && (
                        <>
                            <Blockquote>
                                <Box>{notes}</Box>
                            </Blockquote>

                            <Flex justify="end">
                                <Button
                                    onClick={handleStartNoteEdit}
                                    variant="soft">
                                    Edytuj
                                    <Pencil1Icon />
                                </Button>
                            </Flex>

                        </>
                    )}

                    {isNoteEditing && (
                        <>
                            <TextArea
                                value={noteValue}
                                onChange={event => setNoteValue(event.target.value)}
                                rows={6}
                            />
                            <Flex justify="end" align="center" gap="1">
                                <Button
                                    onClick={handleCancelNote}
                                    variant="soft"
                                    className="EditNotesCancelButton"
                                >
                                    Anuluj
                                </Button>
                                <Button
                                    onClick={handleSaveNote}
                                    variant="solid"
                                >
                                    Zapisz
                                </Button>
                            </Flex>
                        </>
                    )}
                </Flex>
            </HoverCard.Content>
        </HoverCard.Root>
    );
}