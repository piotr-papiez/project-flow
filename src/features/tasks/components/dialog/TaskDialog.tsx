"use client";

// Next.js
import { useRouter } from "next/navigation";

// Radix
import {
    Dialog, Flex, Text, IconButton,
    VisuallyHidden, Tooltip
} from "@radix-ui/themes";

import { Cross1Icon, OpenInNewWindowIcon } from "@radix-ui/react-icons";

// Styles
import styles from "./TaskDialog.module.css";

// Types
import { ReactNode } from "react";

type TaskDialogPropsType = {
    reactisTaskId: string,
    reactisTaskUrl?: string,
    children: ReactNode
};

export default function TaskDialog({
    reactisTaskId,
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
                maxWidth="688px"
                style={{ outline: "2px solid var(--gray-5" }}
                aria-describedby={undefined}
            >
                <Flex direction="column" gap="4">
                    <Flex justify="between" align="center" pb="3" style={{ borderBottom: "1px solid var(--gray-6)" }}>
                        <Flex gap="2" align="center">
                            <Text
                                className={styles["task-prefix"]}
                                size="2"
                            >
                                Zadanie <Text className={styles["task-id"]}>{reactisTaskId}</Text>
                            </Text>

                            {reactisTaskUrl && (
                                <Tooltip content="Otwórz w Reactis">
                                    <IconButton variant="soft" size="1" color="gray" radius="large" className={styles["external-link-button"]} asChild>
                                        <a href={reactisTaskUrl} target="_blank" rel="noopener noreferrer">
                                            <OpenInNewWindowIcon width="12" height="12" />
                                        </a>
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Flex>

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