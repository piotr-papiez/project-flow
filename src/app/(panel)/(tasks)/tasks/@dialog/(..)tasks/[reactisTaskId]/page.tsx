// Auth
import { getReactisUserIdCookie } from "@/features/auth/lib/reactis-user-id-cookie";


// Components
import TaskDialogContainer from "@/features/tasks/components/dialog/TaskDialogContainer";
import TaskDialogHeading from "@/features/tasks/components/dialog/TaskDialogHeading";
import TaskDialogSegmentsController from "@/features/tasks/components/dialog/TaskDialogSegmentsController";
import TaskDialogSkeleton from "@/features/tasks/components/dialog/skeleton/TaskDialogSkeleton";


// Context
import { EditorProvider } from "@/features/tasks/context/editor.context";


// Radix
import { Flex } from "@radix-ui/themes";

// React.js
import { Suspense } from "react";


// Repo
import { getReactisTaskComments } from "@/features/tasks/repo/reactis-tasks.repo";


// Services
import { getMergedTask } from "@/features/tasks/services/tasks.service";


// Types
type TaskDialogPropsType = {
    params: Promise<{ reactisTaskId: string }>
};

// Main function
export default async function TaskDialogPage({
    params
}: TaskDialogPropsType) {
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
        );
    }


    const mergedTask = mergedTaskResponse;
    const reactisComments = reactisCommentsResponse.data;


    return (
        <EditorProvider>
            <TaskDialogContainer
                reactisTaskId={reactisTaskId}
                reactisTaskUrl={reactisTaskUrl}
                note={mergedTask.flowNotes}
            >
                <Suspense fallback={<TaskDialogSkeleton />}>
                    <Flex
                        direction="column"
                        gap="5"
                    >
                        <TaskDialogHeading mergedTask={mergedTask} />


                        <TaskDialogSegmentsController
                            mergedTask={mergedTask}
                            reactisComments={reactisComments}
                        />
                    </Flex>
                </Suspense>
            </TaskDialogContainer>
        </EditorProvider>
    );
}