"use client";

// Radix
import {
    Flex,
    Text,
    Tooltip,
    IconButton,
    VisuallyHidden,
    Dialog
} from "@radix-ui/themes";

import { OpenInNewWindowIcon, Cross1Icon } from "@radix-ui/react-icons";

// Types
type TaskDialogHeaderPropsType = {
    reactisTaskId: string,
    reactisTaskUrl?: string
};

// Styles
import styles from "./TaskDialog.module.css";

export default function TaskDialogHeaderBar({
    reactisTaskId,
    reactisTaskUrl
}: TaskDialogHeaderPropsType) {
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

                {reactisTaskUrl && (
                    <Tooltip content="Otwórz w Reactis">
                        <IconButton
                            variant="soft"
                            size="1"
                            color="gray"
                            radius="large"
                            className={styles["external-link-button"]}
                            asChild
                        >
                            <a
                                href={reactisTaskUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
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
    );
}