"use client";

// Next.js
import { useRouter } from "next/navigation";

// Radix
import { Dialog, Flex, IconButton } from "@radix-ui/themes";

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
            <Dialog.Content>
                <Flex justify="end">
                    <Dialog.Close className={styles["close-button"]}>
                        <IconButton size="2">
                            <Cross1Icon />
                        </IconButton>
                    </Dialog.Close>
                </Flex>
                <Flex justify="between" align="center">
                    <Dialog.Title>
                        Szczegóły zadania
                    </Dialog.Title>
                    
                </Flex>

                {children}


            </Dialog.Content>
        </Dialog.Root>
    );
}