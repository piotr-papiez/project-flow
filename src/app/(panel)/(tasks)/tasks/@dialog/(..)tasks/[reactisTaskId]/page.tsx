// React.js
import { Suspense } from "react";

// Components
import TaskDialogContainer from "@/features/tasks/components/dialog/TaskDialogContainer";
import TaskDialogSkeleton from "@/features/tasks/components/dialog/TaskDialogSkeleton";
import TaskDialogMainInfo from "@/features/tasks/components/dialog/TaskDialogMainInfo";
import TaskDialogSegmentsController from "@/features/tasks/components/dialog/TaskDialogSegmentsController";

// Radix
import { Flex } from "@radix-ui/themes";

// Services
import { getMergedTask } from "@/features/tasks/services/tasks.service";

// Repo
import { getReactisTaskComments } from "@/features/tasks/repo/reactis-tasks.repo";

// Utils
import { getReactisUserIdCookie } from "@/features/auth/lib/reactis-user-id-cookie";

type TaskDialogPagePropsType = {
    params: Promise<{
        reactisTaskId: string
    }>;
}

export default async function TaskDialogPage({ params }: TaskDialogPagePropsType) {
    const { reactisTaskId } = await params;

    const reactisUserId = await getReactisUserIdCookie();
    const reactisTaskUrl = `https://ncrm.netgraf.pl/task/user_list/${reactisUserId}/${reactisTaskId}`;

    const [mergedTaskResponse, reactisCommentsResponse] = await Promise.all([
        getMergedTask(reactisTaskId),
        getReactisTaskComments(reactisTaskId)
    ]);

    if (!mergedTaskResponse) {
        return (
            <div>
                Nie udało się pobrać szczegółów zadania
            </div>
        );
    }

    if (!reactisCommentsResponse.ok) {
        return (
            <div>
                Nie udało się pobrać komentarzy do zadania
            </div>
        )
    }

    const mergedTask = mergedTaskResponse;
    const reactisComments = reactisCommentsResponse.data;

    return (
        <TaskDialogContainer
            reactisTaskId={reactisTaskId}
            reactisTaskUrl={reactisTaskUrl}
        >
            <Suspense
                fallback={<TaskDialogSkeleton />}
            >
                <Flex direction="column" gap="6">
                <TaskDialogMainInfo
                    taskAuthor={mergedTask.author}
                    createDate={mergedTask.create_date}
                    deadline={mergedTask.deadline}
                    priority={mergedTask.flowPriority}
                    status={mergedTask.flowStatus}
                    reactisTaskId={mergedTask.reactisTaskId}
                    title={mergedTask.name}
                />

                <TaskDialogSegmentsController
                    mergedTask={mergedTask}
                    reactisComments={reactisComments}
                />
                </Flex>
            </Suspense>
        </TaskDialogContainer>
    );
}