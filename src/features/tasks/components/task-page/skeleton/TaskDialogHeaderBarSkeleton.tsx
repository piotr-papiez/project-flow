"use client";


// Components
import NativeLinkIconButton from "@/components/ui/NativeLinkIconButton";
import NextLinkIconButton from "@/components/ui/NextLinkIconButton";
import ActionIconButton from "@/components/ui/ActionIconButton";


// Radix
import {
    Dialog,
    Flex,
    Skeleton,
    Text,
    VisuallyHidden
} from "@radix-ui/themes";


import {
    OpenInNewWindowIcon,
    Cross1Icon,
    EnterFullScreenIcon,
    Share1Icon
} from "@radix-ui/react-icons";


// Styles
import styles from "../TaskDialog.module.css";


// Main function
export default function TaskDialogHeaderBarSkeleton() {
    return (
        <Flex
            justify="between"
            align="center"
            pb="3"
            className={styles["header-bar"]}
        >
            <Flex gap="2" align="center">
                <Flex gap="2">
                    <Skeleton>
                        <Text size="3">Zadanie</Text>
                    </Skeleton>
                    <Skeleton>
                        <Text size="3">Numer zadania</Text>
                    </Skeleton>
                </Flex>


                <Skeleton>
                    <NativeLinkIconButton
                        href="google.com"
                        version="ghost"
                        radius="large"
                        tooltip="Otwórz w Reactis"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <OpenInNewWindowIcon width="14" height="14" />
                    </NativeLinkIconButton>
                </Skeleton>
            </Flex>

            <VisuallyHidden>
                <Dialog.Title />
            </VisuallyHidden>

            <Flex gap="1">
                <Skeleton>
                    <NextLinkIconButton
                        href="google.com"
                        version="ghost"
                        radius="large"
                        tooltip="**Wkrótce** Udostępnij tę kartę"
                    >
                        <Share1Icon width="14" height="14" />
                    </NextLinkIconButton>
                </Skeleton>


                <Skeleton>
                    <NativeLinkIconButton
                        href="google.com"
                        version="ghost"
                        radius="large"
                        tooltip="Otwórz w pełnym oknie"
                    >
                        <EnterFullScreenIcon width="14" height="14" />
                    </NativeLinkIconButton>
                </Skeleton>

                <Dialog.Close>
                    <Skeleton>
                        <ActionIconButton
                            version="ghost"
                            radius="large"
                            tooltip="Zamknij"
                        >
                            <Cross1Icon width="14" height="14" />
                        </ActionIconButton>
                    </Skeleton>
                </Dialog.Close>
            </Flex>
        </Flex>
    );
}