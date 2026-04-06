"use client";

// Next.js
import { useRouter } from "next/navigation";

// Components
import TaskDialogHeaderBar from "./TaskDialogHeaderBar";

// Radix
import { Dialog, Flex, Button, Text } from "@radix-ui/themes";
import { CheckIcon } from "@radix-ui/react-icons";

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