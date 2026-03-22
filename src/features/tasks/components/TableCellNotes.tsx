"use client";

// Hooks
import { useState, useEffect, useActionState } from "react";

// Functions
import { updateFlowNote } from "@/features/tasks/actions/update-flow-note.action";

// Radix
import {
    Box, Flex, HoverCard, Heading,
    Button, TextArea, Blockquote, Avatar
} from "@radix-ui/themes";

import { ReaderIcon, Pencil1Icon } from "@radix-ui/react-icons";

// Types
import type { UpdateFlowNoteActionStateType } from "@/features/tasks/actions/update-flow-note.action";

type TableCellNotesPropsType = {
    reactisTaskId: string
    notes: string,
};

// Constants
const initialState: UpdateFlowNoteActionStateType = {
    ok: false,
    error: null,
    updatedNote: null
};

export default function TableCellNotes({ reactisTaskId, notes }: TableCellNotesPropsType) {
    const [openCard, setOpenCard] = useState<boolean>(false);
    const [isNoteEditing, setIsNoteEditing] = useState<boolean>(false);
    const [updatedNote, setUpdatedNote] = useState<string>(notes);
    const [noteValue, setNoteValue] = useState<string>(notes);

    const actionWithTaskId = updateFlowNote.bind(null, reactisTaskId);
    const [state, formAction, isPending] = useActionState(actionWithTaskId, initialState);

    function handleOpenCard(open: boolean): void {
        if (isNoteEditing) return;
        setOpenCard(open);
    }

    function handleStartNoteEdit() {
        setIsNoteEditing(true);
        setOpenCard(true);
        setNoteValue(updatedNote);
    }

    function handleCancelNote() {
        setIsNoteEditing(false);
        setOpenCard(false);
        setNoteValue(updatedNote);
    }

    useEffect(() => {
        if (!state.ok || state.updatedNote === null) return;

        setUpdatedNote(state.updatedNote);
        setNoteValue(state.updatedNote);
        setIsNoteEditing(false);
        setOpenCard(false);
    }, [state]);

    useEffect(() => {
        setUpdatedNote(notes);

        if (!isNoteEditing) setNoteValue(notes);
    }, [notes, isNoteEditing]);

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
                        {updatedNote}
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
                                <Box>{updatedNote}</Box>
                            </Blockquote>

                            <Flex justify="end">
                                <Button
                                    onClick={handleStartNoteEdit}
                                    variant="soft"
                                >
                                    Edytuj
                                    <Pencil1Icon />
                                </Button>
                            </Flex>

                        </>
                    )}

                    {isNoteEditing && (
                        <form action={formAction}>
                            <Flex direction="column" gap="4">
                                <TextArea
                                    value={noteValue}
                                    onChange={event => setNoteValue(event.target.value)}
                                    rows={6}
                                    name="note"
                                />
                                <Flex justify="end" align="center" gap="1">
                                    <Button
                                        onClick={handleCancelNote}
                                        disabled={isPending}
                                        variant="soft"
                                        className="EditNotesCancelButton"
                                    >
                                        Anuluj
                                    </Button>
                                    <Button
                                        loading={isPending}
                                        type="submit"
                                        variant="solid"
                                    >
                                        Zapisz
                                    </Button>
                                </Flex>
                            </Flex>
                        </form>
                    )}
                </Flex>
            </HoverCard.Content>
        </HoverCard.Root>
    );
}