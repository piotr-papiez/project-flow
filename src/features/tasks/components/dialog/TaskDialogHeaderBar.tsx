"use client";

// Components
import NativeLinkIconButton from "@/components/ui/NativeLinkIconButton";
import NextLinkIconButton from "@/components/ui/NextLinkIconButton";
import ActionIconButton from "@/components/ui/ActionIconButton";

// Radix
import {
    Flex,
    Text,
    VisuallyHidden,
    Dialog
} from "@radix-ui/themes";

import {
    OpenInNewWindowIcon,
    Cross1Icon,
    EnterFullScreenIcon,
    Share1Icon
} from "@radix-ui/react-icons";

// Types
type TaskDialogHeaderPropsType = {
    reactisTaskId: string,
    reactisTaskUrl: string
};

// Styles
import styles from "./TaskDialog.module.css";

export default function TaskDialogHeaderBar({
    reactisTaskId,
    reactisTaskUrl
}: TaskDialogHeaderPropsType) {
    const flowTaskUrl = `/tasks/${reactisTaskId}`;

    return (
        <Flex
            justify="between"
            align="center"
            pb="3"
            className={styles["header-bar"]}
        >
            <Flex gap="2" align="center">
                <Text
                    className={styles["task-prefix"]}
                    size="2"
                >
                    Zadanie <Text className={styles["task-id"]}>{reactisTaskId}</Text>
                </Text>

                <NativeLinkIconButton
                    href={reactisTaskUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="ghost"
                    tooltip="Otwórz w Reactis"
                >
                    <OpenInNewWindowIcon width="14" height="14" />
                </NativeLinkIconButton>
            </Flex>

            <VisuallyHidden>
                <Dialog.Title />
            </VisuallyHidden>

            <Flex gap="1">
                <NextLinkIconButton
                    href={`${flowTaskUrl}/share`}
                    variant="ghost"
                    tooltip="Udostępnij tę kartę"
                >
                    <Share1Icon width="14" height="14" />
                </NextLinkIconButton>

                <NativeLinkIconButton
                    href={flowTaskUrl}
                    variant="ghost"
                    tooltip="Otwórz w pełnym oknie"
                >
                    <EnterFullScreenIcon width="14" height="14" />
                </NativeLinkIconButton>

                <Dialog.Close>
                    <ActionIconButton
                        variant="ghost"
                        tooltip="Zamknij"
                    >
                        <Cross1Icon width="14" height="14" />
                    </ActionIconButton>
                </Dialog.Close>
            </Flex>
        </Flex>
    );
}