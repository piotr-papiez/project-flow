"use client";

// React.js
import { useState } from "react";

// Next.js
import { useRouter } from "next/navigation";

// Context
import { useRichContentEditorContext } from "../../context/rich-content-editor.context";

// Components
import TaskDialogHeaderBar from "./TaskDialogHeaderBar";
import Alert from "@/components/shared/rich-content-editor/Alert";

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
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

    const router = useRouter();

    const { isNoteDirty, onNoteDirtyChange } = useRichContentEditorContext();

    function handleOpenDialogChange(open: boolean) {
        if (open) return;

        if (isNoteDirty) {
            setIsAlertOpen(true);
            return;
        }

        router.back();
    }

    function handleCancelAlert() {
        setIsAlertOpen(false);
    }

    function handleAcceptAlert() {
        setIsAlertOpen(false);
        onNoteDirtyChange(false);
        router.back();
    }

    return (
        <>
            <Dialog.Root open onOpenChange={handleOpenDialogChange}>
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
            </Dialog.Root>

            <Alert
                alertState={{
                    isAlertOpen,
                    onAlertOpenChange: setIsAlertOpen
                }}
                alertHandlers={{
                    handleCancelAlert,
                    handleAcceptAlert
                }}
            />
        </>
    );
}