"use client";


// Components
import Alert from "@/components/shared/tiptap-editor/Alert";
import TaskDialogHeaderBar from "./TaskDialogHeaderBar";


// Context
import { useEditorContext } from "../../context/editor.context";


// Next.js
import { useRouter } from "next/navigation";


// Radix
import { Dialog, Flex, VisuallyHidden } from "@radix-ui/themes";


// React.js
import { useEffect, useState } from "react";


// Types
import type { ReactNode } from "react";


import type { JSONContent } from "@tiptap/react";


type TaskDialogContainerPropsType = {
    reactisTaskId: string,
    reactisTaskUrl: string,
    note: JSONContent,
    children: ReactNode
};


// Main function
export default function TaskDialogContainer({
    reactisTaskId,
    reactisTaskUrl,
    note,
    children
}: TaskDialogContainerPropsType) {
    const [isAlertOpened, setIsAlertOpened] = useState(false);


    const router = useRouter();


    const {
        activeComments,
        activeNotes,
        initActiveContent,
        removeActiveContent
    } = useEditorContext();


    const activeComment = activeComments[reactisTaskId];
    const activeNote = activeNotes[reactisTaskId];


    useEffect(() => {
        initActiveContent("note", reactisTaskId, note);
    }, [reactisTaskId, reactisTaskUrl, note]);

    useEffect(() => {
        initActiveContent("comment", reactisTaskId);
    }, [reactisTaskId, reactisTaskUrl]);


    function handleOpenDialog(open: boolean): void {
        if (!open) {
            if (activeNote?.isFocused || activeComment?.isFocused) {
                return;
            }

            if (activeNote?.isDirty || activeComment?.isDirty) {
                setIsAlertOpened(true);
                return;
            }

            removeActiveContent("comment", reactisTaskId);
            removeActiveContent("note", reactisTaskId);
            router.back();
        }
    }


    function handleStay(): void {
        setIsAlertOpened(false);
    }


    function handleAbandonChanges(): void {
        removeActiveContent("comment", reactisTaskId);
        removeActiveContent("note", reactisTaskId);
        setIsAlertOpened(false);
        router.back();
    }


    return (
        <>
            <Dialog.Root
                onOpenChange={handleOpenDialog}
                open
            >
                <Dialog.Content
                    aria-describedby={undefined}
                    maxHeight="86dvh"
                    maxWidth="880px"
                    onOpenAutoFocus={event => event.preventDefault()}
                    size="2"
                >
                    <Flex direction="column" gap="4">
                        <TaskDialogHeaderBar
                            reactisTaskId={reactisTaskId}
                            reactisTaskUrl={reactisTaskUrl}
                        />

                        
                        <VisuallyHidden>
                            <Dialog.Description>Okno dialogowe szczegółów zadania</Dialog.Description>
                        </VisuallyHidden>


                        {children}
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>


            <Alert
                alertState={{
                    isAlertOpened,
                    onAlertOpenChange: setIsAlertOpened
                }}
                alertHandlers={{
                    handleAbandonChanges,
                    handleStay
                }}
            />
        </>
    );
}