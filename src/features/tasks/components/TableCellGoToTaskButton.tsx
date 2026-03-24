// Radix
import { Tooltip, IconButton } from "@radix-ui/themes";
import { ChevronRightIcon } from "@radix-ui/react-icons";

// Next.js
import NextLink from "next/link";

// Styles
import styles from "./TableCellGoToTaskButton.module.css"

// Types
type TableCellGoToTaskButtonPropsType = {
    reactisTaskId?: string
};

export default function TableCellGoToTaskButton({
    reactisTaskId
}: TableCellGoToTaskButtonPropsType) {
    return (
        <Tooltip content="Przejdź do zadania">
            <IconButton
                variant="solid"
                size="3"
                mr="1"
                className={styles["go-to-task-button"]}
                asChild>
                <NextLink
                    href={`/tasks/${reactisTaskId}`}
                    prefetch={false}
                    scroll={false}
                >
                    <ChevronRightIcon />
                </NextLink>
            </IconButton>
        </Tooltip>
    );
}