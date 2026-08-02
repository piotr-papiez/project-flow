"use client";

// Hooks
import { useState } from "react";

// Components
import DetailsSegment from "./segments/DetailsSegment";
import CommentsSegment from "./segments/CommentsSegment";
import NoteSegment from "./segments/NoteSegment";

// Radix
import { Flex, SegmentedControl } from "@radix-ui/themes";

// Styles
import styles from "./TaskPage.module.css";

// Types
import type { MergedTaskDataType } from "@/types/flow";
import type { ReactisTaskCommentsType } from "@/types/reactis";

type TaskDialogSegmentsControllerPropsType = {
    mergedTask: MergedTaskDataType,
    reactisComments: ReactisTaskCommentsType
};

type TaskSegmentType = "details" | "comments" | "knowledge" | "note";

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
                {/* <SegmentedControl.Item value="knowledge">Wiedza</SegmentedControl.Item> */}
                <SegmentedControl.Item value="note">Notatki</SegmentedControl.Item>
            </SegmentedControl.Root>

            {segment === "details" && (
                <DetailsSegment
                    details={mergedTask.text}
                />
            )}

            {segment === "comments" && (
                <CommentsSegment
                    comments={reactisComments}
                    reactisTaskId={mergedTask.reactisTaskId ?? ""}
                    reactisUserId={mergedTask.reactisUserId ?? ""}
                />
            )}

            {/* {segment === "knowledge" && (
                <p>asdverv</p>
            )} */}

            {segment === "note" && (
                <NoteSegment
                    note={mergedTask.flowNotes}
                    reactisTaskId={mergedTask.reactisTaskId}
                />
            )}
        </Flex>
    );
}