"use client";

// Hooks
import { useState } from "react";

// Functions
import { updateFlowTaskStatus } from "@/features/tasks/actions/update-flow-status.action";

// Radix
import { Select } from "@radix-ui/themes";

// Constants
import { LABEL_MAP, COLOR_MAP } from "../lib/status-map";

// Types
type TableCellWithStatusPropsType = {
    reactisTaskId: string
    currentStatusValue: number
};

export default function TableCellStatus({ reactisTaskId, currentStatusValue }: TableCellWithStatusPropsType) {
    const [value, setValue] = useState<string>(String(currentStatusValue));

    async function setStatus(value: string) {
        await updateFlowTaskStatus(reactisTaskId, +value);
        setValue(value);
    }

    return (
        <Select.Root
            value={value}
            onValueChange={setStatus}
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
                {Object.entries(LABEL_MAP).map(([value, label]) => (
                    <Select.Item key={value} value={value}>{label}</Select.Item>
                ))}
            </Select.Content>
        </Select.Root >
    );
}