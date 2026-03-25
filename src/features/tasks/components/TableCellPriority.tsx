"use client";

// Hooks
import { useEffect, useState, useTransition } from "react";

// Functions
import { updateFlowTaskPriority } from "@/features/tasks/actions/update-flow-priority.action";

// Radix
import { Select } from "@radix-ui/themes";

// Styles
import styles from "./TableCellStatusAndPriority.module.css";

// Constants
import { PRIORITY_MAP, COLOR_MAP } from "../lib/priority-map";

// Types
type TableCellWithPriorityPropsType = {
    reactisTaskId: string
    currentPriorityValue: number
};

export default function TableCellPriority({
    reactisTaskId,
    currentPriorityValue
}: TableCellWithPriorityPropsType) {
    const [value, setValue] = useState<string>(String(currentPriorityValue));
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        setValue(String(currentPriorityValue));
    }, [currentPriorityValue]);

    function handlePriorityChange(newValue: string) {
        const prevValue = value;

        setValue(newValue);

        startTransition(async () => {
            try {
                await updateFlowTaskPriority(reactisTaskId, +newValue);
            } catch (error) {
                setValue(prevValue);
            }
        });
    }

    return (
        <Select.Root
            value={value}
            onValueChange={handlePriorityChange}
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
                {Object.entries(PRIORITY_MAP).map(([value, label]) => (
                    <Select.Item key={value} value={value}>{label}</Select.Item>
                ))}
            </Select.Content>
        </Select.Root >
    );
}