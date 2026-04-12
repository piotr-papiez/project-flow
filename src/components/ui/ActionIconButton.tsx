"use client";

// Radix
import { IconButton, Tooltip } from "@radix-ui/themes";

// Styles
import styles from "./Button.module.css";

// Types
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ActionIconButtonPropsType = {
    version: "solid" | "soft" | "gray" | "outline" | "ghost",
    radius: "none" | "small" | "medium" | "large" | "full",
    tooltip: string,
    children: ReactNode
} & ComponentPropsWithoutRef<typeof IconButton>;

export default function ActionIconButton({
    version, radius, tooltip, className, children, ...props
}: ActionIconButtonPropsType) {
    return (
        <Tooltip content={tooltip}>
            <IconButton
                className={`${styles[version]} ${className ?? undefined}`}
                radius={radius}
                {...props}
            >
                {children}
            </IconButton>
        </Tooltip>
    );
}