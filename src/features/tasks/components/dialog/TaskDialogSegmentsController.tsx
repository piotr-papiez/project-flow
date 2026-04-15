"use client";

// Hooks
import { useState } from "react";

// Components
import TaskDialogDetails from "./TaskDialogDetails";
import TaskDialogComments from "./TaskDialogComments";
import TaskDialogNotes from "./TaskDialogNotes";

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

type TaskSegmentType = "details" | "comments" | "knowledge" | "notes";

export default function TaskDialogSegmentsController({
    mergedTask,
    reactisComments
}: TaskDialogSegmentsControllerPropsType) {
    const [segment, setSegment] = useState<TaskSegmentType>("details");

    return (
        <Flex direction="column" gap="4" style={{ height: "100%" }}>
            <SegmentedControl.Root
                size="1"
                radius="large"
                value={segment}
                onValueChange={value => setSegment(value as TaskSegmentType)}
                className={styles["segments-item"]}
            >
                <SegmentedControl.Item value="details">Szczegóły</SegmentedControl.Item>
                <SegmentedControl.Item value="comments">Komentarze</SegmentedControl.Item>
                {/* <SegmentedControl.Item value="knowledge">Wiedza</SegmentedControl.Item> */}
                <SegmentedControl.Item value="notes">Notatki</SegmentedControl.Item>
            </SegmentedControl.Root>

            {segment === "details" && (
                <TaskDialogDetails
                    details={mergedTask.text}
                />
            )}

            {segment === "comments" && (
                <TaskDialogComments
                    comments={reactisComments}
                />
            )}

            {/* {segment === "knowledge" && (
                <p>asdverv</p>
            )} */}

            {segment === "notes" && (
                <TaskDialogNotes
                    notes={mergedTask.flowNotes}
                    
                    reactisTaskId={mergedTask.reactisTaskId}
                />
            )}
        </Flex>
    );
}