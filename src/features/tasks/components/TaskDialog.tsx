"use client";

// Next.js
import { useRouter } from "next/navigation";

// Radix
import { Dialog } from "@radix-ui/themes";

// Types
import { ReactisTaskDataType, ReactisTaskCommentsType } from "@/types/reactis";

type TaskDialogPropsType = {
    reactisTaskDetails: ReactisTaskDataType,
    reactisTaskComments: ReactisTaskCommentsType
};

export default function TaskDialog({
    reactisTaskDetails, reactisTaskComments
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
                <Dialog.Description>
                    <div dangerouslySetInnerHTML={{ __html: reactisTaskDetails.text }}></div>
                    {reactisTaskComments.items.map(item => (
                        <p key={item.id} dangerouslySetInnerHTML={{ __html: item.text }}></p>
                    ))}
                </Dialog.Description>
                <Dialog.Close>
                    <button>Zamknij</button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Root>
    );
}