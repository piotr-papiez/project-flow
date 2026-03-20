// Next.js
import NextLink from "next/link";

// Components
import SettingsTabNav from "@/features/settings/components/SettingsTabNav";

// Styles
import styles from "./layout.module.css";

// Types
import { ReactNode } from "react";

type SettingsLayoutPropsType = {
    children: ReactNode
};

// Radix
import {
    Container, Card, IconButton, Heading,
    Flex, Tooltip
} from "@radix-ui/themes";

import { ArrowLeftIcon } from "@radix-ui/react-icons";

export default function SettingsLayout({ children }: SettingsLayoutPropsType) {
    return (
        <Container size="4">
            <Card size="4" mt="6">
                <Flex gap="3" align="center" mb="5">
                    <Tooltip content="Wstecz" sideOffset={8}>
                        <IconButton variant="ghost" size="3" color="gray" asChild>
                            <NextLink href="/tasks">
                                <ArrowLeftIcon width="18" height="18" />
                            </NextLink>
                            
                        </IconButton>
                    </Tooltip>
                    <Heading size="5">
                        Ustawienia
                    </Heading>
                </Flex>
                <SettingsTabNav />
                {children}
            </Card>
        </Container>
    );
}