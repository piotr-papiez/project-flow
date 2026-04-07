// React.js
import { Suspense } from "react";

// Components
import TaskDialogContainer from "@/features/tasks/components/dialog/TaskDialogContainer";
import TaskDialogSkeleton from "@/features/tasks/components/dialog/TaskDialogSkeleton";
import TaskDialogMainInfo from "@/features/tasks/components/dialog/TaskDialogMainInfo";
import TaskDialogSegmentsController from "@/features/tasks/components/dialog/TaskDialogSegmentsController";

// Radix
import { Flex, Button, Text } from "@radix-ui/themes";
import { CheckIcon } from "@radix-ui/react-icons";

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
                <Flex direction="column" gap="5">
                    <TaskDialogMainInfo
                        mergedTask={mergedTask}
                    />

                    <TaskDialogSegmentsController
                        mergedTask={mergedTask}
                        reactisComments={reactisComments}
                    />
                </Flex>

                {/* <Flex justify="end" gap="2">
                    <Button variant="soft" size="3">
                        <Text size="2">
                            Udostępnij
                        </Text>
                    </Button>

                    <Button size="3" style={{ padding: "0 16px 0 8px" }}>
                        <Flex align="center" gap="1">
                            <CheckIcon width="22" height="22" />
                            <Text size="2">
                                Zakończ zadanie
                            </Text>
                        </Flex>
                    </Button>
                </Flex> */}

            </Suspense>
        </TaskDialogContainer>
    );
}