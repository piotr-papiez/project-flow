"use client";

// Next.js
import { useRouter } from "next/navigation";

// Radix
import { Dialog } from "@radix-ui/themes";

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
                <Dialog.Title>
                    Szczegóły zadania
                </Dialog.Title>

                {children}

                <Dialog.Close>
                    <button>Zamknij</button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Root>
    );
}