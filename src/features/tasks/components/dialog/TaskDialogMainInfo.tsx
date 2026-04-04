// Components
import TaskAuthorAvatar from "../shared/TaskAuthorAvatar";
import TaskDialogDates from "./TaskDialogDates";
import TaskDialogTitle from "./TaskDialogTitle";

// Radix
import { Flex } from "@radix-ui/themes";

// Types
import type { TaskAuthorType } from "@/types/reactis";

type TaskDialogMainInfoPropsType = {
    taskAuthor: TaskAuthorType,
    createDate: string,
    deadline: string,
    title: string
};

export default function TaskDialogMainInfo({
    taskAuthor, createDate, deadline, title
}: TaskDialogMainInfoPropsType) {
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
        </Flex>
    );
}