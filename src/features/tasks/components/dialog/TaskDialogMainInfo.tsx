// Components
import TaskAuthorAvatar from "../shared/TaskAuthorAvatar";
import TaskDialogDates from "./TaskDialogDates";
import TaskDialogTitle from "./TaskDialogTitle";
import StatusBadge from "../shared/StatusBadge";
import PriorityBadge from "../shared/PriorityBadge";

// Radix
import { Text, Flex, Grid } from "@radix-ui/themes";

// Types
import type { MergedTaskDataType } from "@/types/flow";

type TaskDialogMainInfoPropsType = {
    mergedTask: MergedTaskDataType,
};

export default function TaskDialogMainInfo({
    mergedTask
}: TaskDialogMainInfoPropsType) {
    return (
        <Flex direction="column" gap="3">
            <Grid columns="1fr auto" gap="3">
                <Flex gap="4" align="center">
                    <TaskAuthorAvatar reactisTaskAuthor={mergedTask.author} />
                    <TaskDialogDates
                        createDate={mergedTask.create_date}
                        deadline={mergedTask.deadline}
                    />
                </Flex>

                <Flex gap="4">
                    <Flex gap="1" align="center">
                        <Text size="2">Priorytet:</Text>
                        <PriorityBadge
                            currentPriorityValue={mergedTask.flowPriority as number}
                            reactisTaskId={mergedTask.reactisTaskId as string}
                        />
                    </Flex>

                    <Flex gap="1" align="center">
                        <Text size="2">Status:</Text>
                        <StatusBadge
                            currentStatusValue={mergedTask.flowStatus as number}
                            reactisTaskId={mergedTask.reactisTaskId as string}
                        />
                    </Flex>
                </Flex>

                <TaskDialogTitle title={mergedTask.name} />
            </Grid>
        </Flex>
    );
}