"use client";

// Radix
import { IconButton, Tooltip } from "@radix-ui/themes";

// Styles
import styles from "./LinkIconButton.module.css";

// Types
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ActionIconButtonPropsType = {
    variant: "solid" | "soft" | "outline" | "ghost",
    radius: "none" | "small" | "medium" | "large" | "full",
    tooltip: string,
    children: ReactNode
} & ComponentPropsWithoutRef<typeof IconButton>;

export default function ActionIconButton({
    variant, radius, tooltip, children, ...props
}: ActionIconButtonPropsType) {
    return (
        <Tooltip content={tooltip}>
            <IconButton
                className={styles[variant]}
                radius={radius}
                {...props}
            >
                {children}
            </IconButton>
        </Tooltip>
    );
}