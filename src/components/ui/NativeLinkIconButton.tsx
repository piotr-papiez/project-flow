// Radix
import { IconButton, Tooltip } from "@radix-ui/themes";

// Styles
import styles from "./LinkIconButton.module.css";

// Types
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type LinkIconButtonPropsType = {
    variant: "solid" | "soft" | "outline" | "ghost",
    radius: "none" | "small" | "medium" | "large" | "full",
    tooltip: string,
    children: ReactNode
} & ComponentPropsWithoutRef<"a">;

export default function NativeLinkIconButton({
    variant, radius, tooltip, children, ...props
}: LinkIconButtonPropsType) {
    return (
        <Tooltip content={tooltip}>
            <IconButton
                className={styles[variant]}
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