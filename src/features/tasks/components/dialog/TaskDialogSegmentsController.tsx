"use client";

// Hooks
import { useState } from "react";

// Components
import TaskDialogDetails from "./TaskDialogDetails";

// Radix
import { Flex, SegmentedControl } from "@radix-ui/themes";

// Styles
import styles from "./TaskDialog.module.css";

// Types
import type { MergedTaskDataType } from "@/types/flow";
import type { ReactisTaskCommentsType } from "@/types/reactis";

type TaskDialogSegmentsControllerPropsType = {
    mergedTask: MergedTaskDataType,
    reactisComments: ReactisTaskCommentsType
};

type TaskSegmentType = "details" | "comments" | "more";

export default function TaskDialogSegmentsController({
    mergedTask,
    reactisComments
}: TaskDialogSegmentsControllerPropsType) {
    const [segment, setSegment] = useState<TaskSegmentType>("details");

    return (
        <Flex direction="column" gap="4">
            <SegmentedControl.Root 
                size="1"
                radius="large"
                value={segment}
                onValueChange={value => setSegment(value as TaskSegmentType)}
                className={styles["segments-item"]}
            >
                <SegmentedControl.Item value="details">Szczegóły</SegmentedControl.Item>
                <SegmentedControl.Item value="comments">Komentarze</SegmentedControl.Item>
                <SegmentedControl.Item value="more">Więcej</SegmentedControl.Item>
            </SegmentedControl.Root>

            {segment === "details" && (
                <TaskDialogDetails
                    mergedTask={mergedTask}
                    reactisComments={reactisComments}
                />
            )}

            {segment === "comments" && (
                <p>asd</p>
            )}

            {segment === "more" && (
                <p>asdverv</p>
            )}
        </Flex>
    );
}