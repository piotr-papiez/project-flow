"use client";

// Next.js
import { useRouter } from "next/navigation";

// Components
import TaskDialogHeaderBar from "./TaskDialogHeaderBar";

// Radix
import { Dialog, Flex } from "@radix-ui/themes";

// Types
import { ReactNode } from "react";

type TaskDialogPropsType = {
    reactisTaskId?: string,
    reactisTaskUrl?: string,
    children: ReactNode
};

export default function TaskDialogContainer({
    reactisTaskId = "",
    reactisTaskUrl = "",
    children
}: TaskDialogPropsType) {
    const router = useRouter();

    function handleOpenChange(open: boolean) {
        if (!open) router.back();
    }

    return (
        <Dialog.Root open onOpenChange={handleOpenChange}>
            <Dialog.Content
                size="2"
                maxWidth="880px"
                maxHeight="86dvh"
                aria-describedby={undefined}
                onOpenAutoFocus={event => event.preventDefault()}
            >
                <Flex direction="column" gap="4">
                    <TaskDialogHeaderBar
                        reactisTaskId={reactisTaskId}
                        reactisTaskUrl={reactisTaskUrl}
                    />
                    {children}
                </Flex>
            </Dialog.Content>
        </Dialog.Root >
    );
}