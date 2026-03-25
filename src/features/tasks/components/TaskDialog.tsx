"use client";

// Next.js
import { useRouter } from "next/navigation";

// Radix
import { Dialog, Flex, Heading, IconButton, VisuallyHidden } from "@radix-ui/themes";

import { Cross1Icon } from "@radix-ui/react-icons";

// Styles
import styles from "./TaskDialog.module.css";

// Types
import { ReactNode } from "react";

type TaskDialogPropsType = {
    children: ReactNode
};

export default function TaskDialog({
    children
}: TaskDialogPropsType) {
    const router = useRouter();

    function handleOpenChange(open: boolean) {
        if (!open) router.back();
    }

    return (
        <Dialog.Root open onOpenChange={handleOpenChange}>
            <Dialog.Content size="4" aria-describedby={undefined}>
                <Flex direction="column" gap="4">
                    <Flex justify="between" align="center">
                        <Heading size="4">Szczegóły zadania</Heading>

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