"use client";

// Next.js
import NextLink from "next/link";

// Actions
import { signout } from "@/features/auth/actions/signout.action";

// Radix
import {
    Box, Container, Flex, Heading,
    Avatar, DropdownMenu, Text
} from "@radix-ui/themes";

import { GearIcon, ExitIcon } from "@radix-ui/react-icons";

// Styles
import styles from "./PanelHeader.module.css";

// Types
import type { ReactisUserDataType } from "@/types/reactis";

type PanelHeaderPropsType = {
    reactisUserData: ReactisUserDataType
};

export default function PanelHeader({ reactisUserData }: PanelHeaderPropsType) {
    console.log(reactisUserData);
    return (
        <Box className={styles["header-background"]} py="3">
            <Container size="4">
                <Flex justify="between" align="center">
                    <Heading
                        as="h1"
                        size="5"
                        asChild
                    >
                        <NextLink
                            href="/tasks"
                            className={styles["header-title"]}
                            prefetch
                        >
                            Dayglow
                        </NextLink>
                    </Heading>

                    <DropdownMenu.Root dir="ltr">
                        <Flex gap="2" align="center">
                            <Avatar fallback="PP" className={styles["avatar-button"]} />
                            <Flex direction="column" gap="0">
                                <DropdownMenu.Trigger className={styles["dropdown-trigger"]}>
                                    <Flex align="center" gap="2">
                                        <Text size="3">
                                            {`${reactisUserData.name} ${reactisUserData.surname}`}
                                        </Text>
                                        <DropdownMenu.TriggerIcon />
                                    </Flex>
                                </DropdownMenu.Trigger>

                                <Text size="1" className={styles["header-userposition"]}>
                                    {reactisUserData.group}
                                </Text>
                            </Flex>
                        </Flex>

                        <DropdownMenu.Content color="gray" variant="soft">
                            <DropdownMenu.Item asChild>
                                <NextLink
                                    href="/settings"
                                    className={styles["dropdown-link"]}
                                    prefetch
                                >
                                    <GearIcon />
                                    Ustawienia
                                </NextLink>
                            </DropdownMenu.Item>

                            <form action={signout}>
                                <DropdownMenu.Item
                                    asChild
                                >
                                    <button className={styles["dropdown-signout"]}>
                                        <ExitIcon />
                                        Wyloguj
                                    </button>
                                </DropdownMenu.Item>
                            </form>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Flex>
            </Container>
        </Box>
    );
}