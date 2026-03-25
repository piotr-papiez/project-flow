"use client";

// Hooks
import { useEffect, useState, useTransition } from "react";

// Functions
import { updateFlowTaskStatus } from "@/features/tasks/actions/update-flow-status.action";

// Radix
import { Select } from "@radix-ui/themes";

// Styles
import styles from "./TableCellStatusAndPriority.module.css";

// Constants
import { LABEL_MAP, COLOR_MAP } from "../lib/status-map";

// Types
type TableCellWithStatusPropsType = {
    reactisTaskId: string,
    currentStatusValue: number
};

export default function TableCellStatus({
    reactisTaskId,
    currentStatusValue
}: TableCellWithStatusPropsType) {
    const [value, setValue] = useState<string>(String(currentStatusValue));
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        setValue(String(currentStatusValue));
    }, [currentStatusValue]);

    function handleStatusChange(newValue: string) {
        const prevValue = value;

        setValue(newValue);

        startTransition(async () => {
            try {
                await updateFlowTaskStatus(reactisTaskId, +newValue);
            } catch (error) {
                setValue(prevValue);
            }
        });
    }

    return (
        <Select.Root
            value={value}
            onValueChange={handleStatusChange}
            size={"1"}
        >
            <Select.Trigger
                className={isPending ? styles["status-pending"] : undefined}
                variant="soft"
                radius="full"
                color={COLOR_MAP[+value]}
            />

            <Select.Content
                variant="soft"
                color="gray"
                position="popper"
            >
                {Object.entries(LABEL_MAP).map(([value, label]) => (
                    <Select.Item key={value} value={value}>{label}</Select.Item>
                ))}
            </Select.Content>
        </Select.Root >
    );
}