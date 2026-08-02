"use client";

// Components
import NativeLinkIconButton from "@/components/ui/NativeLinkIconButton";
import NextLinkIconButton from "@/components/ui/NextLinkIconButton";
import ActionIconButton from "@/components/ui/ActionIconButton";


// Next.js
import NextLink from "next/link";


// Radix
import {
    Flex,
    Text,
    Tooltip,
    IconButton
} from "@radix-ui/themes";

import {
    OpenInNewWindowIcon,
    ArrowLeftIcon,
    EnterFullScreenIcon,
    Share1Icon
} from "@radix-ui/react-icons";

// Types
type TaskDialogHeaderPropsType = {
    reactisTaskId: string,
    reactisTaskUrl: string
};

// Styles
import styles from "./TaskPage.module.css";

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
            <Flex gap="4" align="center">
                <Tooltip content="Wstecz" sideOffset={8}>
                    <IconButton variant="ghost" size="3" color="gray" asChild>
                        <NextLink href="/tasks">
                            <ArrowLeftIcon width="18" height="18" />
                        </NextLink>
                    </IconButton>
                </Tooltip>

                <Flex gap="2" align="center">
                    <Text
                        className={styles["task-prefix"]}
                        size="2"
                    >
                        Zadanie <Text className={styles["task-id"]}>{reactisTaskId}</Text>
                    </Text>

                    <NativeLinkIconButton
                        href={reactisTaskUrl}
                        version="ghost"
                        radius="large"
                        tooltip="Otwórz w Reactis"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <OpenInNewWindowIcon width="14" height="14" />
                    </NativeLinkIconButton>
                </Flex>
            </Flex>


            <Flex gap="1">
                <NextLinkIconButton
                    href={`${flowTaskUrl}/share`}
                    version="ghost"
                    radius="large"
                    tooltip="**Wkrótce** Udostępnij tę kartę"
                >
                    <Share1Icon width="14" height="14" />
                </NextLinkIconButton>

                {/* <NativeLinkIconButton
                    href={flowTaskUrl}
                    version="ghost"
                    radius="large"
                    tooltip="Otwórz w pełnym oknie"
                >
                    <EnterFullScreenIcon width="14" height="14" />
                </NativeLinkIconButton> */}
            </Flex>
        </Flex>
    );
}