"use client";


// React.js
import { useEffect, useState } from "react";


// Components
import Alert from "@/components/shared/tiptap-editor/Alert";
import NoteEditor from "@/components/shared/tiptap-editor/NoteEditor";


// Context
import { useEditorContext } from "@/features/tasks/context/editor.context";


// Radix
import {
    Box,
    Flex,
    HoverCard,
    Blockquote,
    Avatar,
    Heading,
    Text
} from "@radix-ui/themes";


// Types
import type { JSONContent } from "@tiptap/react";
import { ReaderIcon } from "@radix-ui/react-icons";


type NoteCardPropsType = {
    reactisTaskId: string,
    note: JSONContent
};


// Utils
import { tiptapJsonToHtml } from "@/features/tasks/utils/tiptap-types-converter";


// Main function
export default function NoteCard({ reactisTaskId, note }: NoteCardPropsType) {
    const [isCardOpened, setIsCardOpened] = useState(false);
    const [isAlertOpened, setIsAlertOpened] = useState(false);


    const {
        activeNotes,
        initActiveContent,
        removeActiveContent
    } = useEditorContext();


    const activeNote = activeNotes[reactisTaskId];
    const previewContent = activeNote?.initialContent ?? note;
    const htmlNote = tiptapJsonToHtml(previewContent);


    function handleOpenCard(open: boolean): void {
        if (open) {
            if (Object.keys(activeNotes).length > 0) {
                return;
            }

            initActiveContent("note", reactisTaskId, note);
            setIsCardOpened(true);
        }

        if (!open) {
            if (activeNote?.isFocused) {
                return;
            }

            if (activeNote?.isDirty) {
                setIsAlertOpened(true);
                return;
            }

            removeActiveContent("note", reactisTaskId);
            setIsCardOpened(false);
        }
    }


    function handleStay(): void {
        setIsAlertOpened(false);
    }


    function handleAbandonChanges(): void {
        removeActiveContent("note", reactisTaskId);
        setIsAlertOpened(false);
        setIsCardOpened(false);
    }


    return (
        <>
            <HoverCard.Root
                open={isCardOpened}
                onOpenChange={handleOpenCard}
                openDelay={600}
                closeDelay={600}
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
                            {note ? (
                                <span dangerouslySetInnerHTML={{ __html: htmlNote }} />
                            ) : (
                                <Text className="NoDetailsText">Brak notatki</Text>
                            )}
                        </Box>
                    </Flex>
                </HoverCard.Trigger>

                {isCardOpened && activeNote && (
                    <HoverCard.Content>
                        <Flex direction="column" gap="3">
                            <Heading size="4" as="h3">Notatki</Heading>

                            <Blockquote>
                                <NoteEditor
                                    note={note}
                                    reactisTaskId={reactisTaskId}
                                />
                            </Blockquote>
                        </Flex>
                    </HoverCard.Content>
                )}

            </HoverCard.Root>

            <Alert
                alertState={{
                    isAlertOpened,
                    onAlertOpenChange: setIsAlertOpened
                }}
                alertHandlers={{
                    handleStay,
                    handleAbandonChanges
                }}
            />
        </>
    );
}