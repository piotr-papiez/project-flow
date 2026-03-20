"use client";

// Next.js
import NextLink from "next/link";

// Hooks
import { usePathname } from "next/navigation";

// Radix
import { TabNav } from "@radix-ui/themes";

export default function SettingsTabNav() {
    const path = usePathname();

    return (
        <TabNav.Root mb="6">
            <TabNav.Link
                active={path === "/settings/account"}
                asChild
            >
                <NextLink href="/settings/account">
                    Konto
                </NextLink>
            </TabNav.Link>

            <TabNav.Link
                active={path === "/settings/reactis"}
                asChild
            >
                <NextLink href="/settings/reactis">
                    Reactis
                </NextLink>
            </TabNav.Link>
        </TabNav.Root>
    );
}