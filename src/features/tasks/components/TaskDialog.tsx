"use client";

// Next.js
import { useRouter } from "next/navigation";

// Radix
import { Dialog, Flex, Text, IconButton, VisuallyHidden, Separator } from "@radix-ui/themes";

import { Cross1Icon } from "@radix-ui/react-icons";

// Styles
import styles from "./TaskDialog.module.css";

// Types
import { ReactNode } from "react";

type TaskDialogPropsType = {
    reactisTaskId: string,
    children: ReactNode
};

export default function TaskDialog({
    reactisTaskId,
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
                style={{ outline: "2px solid var(--gray-5" }}
                aria-describedby={undefined}
            >
                <Flex direction="column" gap="4">
                    <Flex justify="between" align="center" pb="3" style={{ borderBottom: "1px solid var(--gray-6)" }}>
                        <Text
                            className={styles["task-prefix"]}
                            size="2"
                        >
                            Zadanie <Text className={styles["task-id"]}>{reactisTaskId}</Text>
                        </Text>

                        <VisuallyHidden>
                            <Dialog.Title />
                        </VisuallyHidden>

                        <Dialog.Close className={styles["close-button"]}>
                            <IconButton size="2">
                                <Cross1Icon />
                            </IconButton>
                        </Dialog.Close>
                    </Flex>

                    {children}
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
}