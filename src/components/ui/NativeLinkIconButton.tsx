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
} & ComponentPropsWithoutRef<"a">;

export default function NativeLinkIconButton({
    variant, tooltip, children, ...props
}: LinkIconButtonPropsType) {
    return (
        <Tooltip content={tooltip}>
            <IconButton
                className={styles[variant]}
                radius="large"
                asChild
            >
                <a {...props}>
                    {children}
                </a>
            </IconButton>
        </Tooltip>
    );
}