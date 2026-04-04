// Components
import TaskAuthorAvatar from "../shared/TaskAuthorAvatar";
import TaskDialogDates from "./TaskDialogDates";
import TaskDialogTitle from "./TaskDialogTitle";
import StatusBadge from "../shared/StatusBadge";
import PriorityBadge from "../shared/PriorityBadge";

// Radix
import { Text, Flex } from "@radix-ui/themes";

// Types
import type { TaskAuthorType } from "@/types/reactis";

type TaskDialogMainInfoPropsType = {
    taskAuthor: TaskAuthorType,
    createDate: string,
    deadline: string,
    priority?: number,
    status?: number,
    reactisTaskId?: string,
    title: string
};

export default function TaskDialogMainInfo({
    taskAuthor, createDate, deadline, priority, status, reactisTaskId, title
}: TaskDialogMainInfoPropsType) {
    const tempPriority = priority ?? 1;
    const tempStatus = status ?? 1;
    const tempTaskId = reactisTaskId ?? "";

    return (
        <Flex direction="column" gap="3">
            <Flex gap="4" align="center">
                <TaskAuthorAvatar reactisTaskAuthor={taskAuthor} />

                <TaskDialogDates
                    createDate={createDate}
                    deadline={deadline}
                />
            </Flex>

            <TaskDialogTitle title={title} />

            <Flex gap="4">
                <Flex gap="1" align="center">
                    <Text size="2">Priorytet:</Text>
                    <PriorityBadge currentPriorityValue={tempPriority} reactisTaskId={tempTaskId} />
                </Flex>

                <Flex gap="1" align="center">
                    <Text size="2">Status:</Text>
                    <StatusBadge currentStatusValue={tempStatus} reactisTaskId={tempTaskId} />
                </Flex>
            </Flex>
        </Flex>
    );
}