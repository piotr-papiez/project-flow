// Radix
import { IconButton, Tooltip } from "@radix-ui/themes";

// Styles
import styles from "./Button.module.css";

// Types
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type LinkIconButtonPropsType = {
    version: "solid" | "soft" | "gray" | "outline" | "ghost",
    radius: "none" | "small" | "medium" | "large" | "full",
    tooltip: string,
    children: ReactNode
} & ComponentPropsWithoutRef<"a">;

export default function NativeLinkIconButton({
    version, radius, tooltip, children, ...props
}: LinkIconButtonPropsType) {
    return (
        <Tooltip content={tooltip}>
            <IconButton
                className={styles[version]}
                radius={radius}
                asChild
            >
                <a {...props}>
                    {children}
                </a>
            </IconButton>
        </Tooltip>
    );
}