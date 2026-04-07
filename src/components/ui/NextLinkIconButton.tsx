// Next.js
import NextLink from "next/link";

// Radix
import { IconButton, Tooltip } from "@radix-ui/themes";

// Styles
import styles from "./LinkIconButton.module.css";

// Types
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type LinkIconButtonPropsType = {
    variant: "solid" | "soft" | "outline" | "ghost",
    tooltip: string,
    children: ReactNode
} & ComponentPropsWithoutRef<typeof NextLink>;

export default function NextLinkIconButton({
    variant, tooltip, children, ...props
}: LinkIconButtonPropsType) {
    return (
        <Tooltip content={tooltip}>
            <IconButton
                className={styles[variant]}
                radius="large"
                asChild
            >
                <NextLink {...props}>
                    {children}
                </NextLink>
            </IconButton>
        </Tooltip>
    );
}