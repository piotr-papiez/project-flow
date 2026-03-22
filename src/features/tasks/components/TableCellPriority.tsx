"use client";

// Hooks
import { useState } from "react";

// Functions
import { updateFlowTaskPriority } from "@/features/tasks/actions/update-flow-priority.action";

// Radix
import { Select } from "@radix-ui/themes";

// Constants
import { PRIORITY_MAP, COLOR_MAP } from "../lib/priority-map";

// Types
type TableCellWithPriorityPropsType = {
    reactisTaskId: string
    currentPriorityValue: number
};

export default function TableCellPriority({ reactisTaskId, currentPriorityValue }: TableCellWithPriorityPropsType) {
    const [value, setValue] = useState<string>(String(currentPriorityValue));

    async function setPriority(value: string) {
        await updateFlowTaskPriority(reactisTaskId, +value);
        setValue(value);
    }

    return (
        <Select.Root
            value={value}
            onValueChange={setPriority}
            size={"1"}
        >
            <Select.Trigger
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