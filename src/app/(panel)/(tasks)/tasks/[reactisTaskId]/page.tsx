// Auth
import { getReactisUserIdCookie } from "@/features/auth/lib/reactis-user-id-cookie";


// Components
import TaskPageContainer from "@/features/tasks/components/task-page/TaskPageContainer";
import TaskPageHeading from "@/features/tasks/components/task-page/TaskPageHeading";
import TaskPageSegmentsController from "@/features/tasks/components/task-page/TaskPageSegmentsController";


// Context
import { EditorProvider } from "@/features/tasks/context/editor.context";


// Radix
import { Container, Flex } from "@radix-ui/themes";


// Repo
import {
    getReactisTask,
    getReactisTaskComments,
} from "@/features/tasks/repo/reactis-tasks.repo";


// Services
import { getMergedTask } from "@/features/tasks/services/tasks.service";


// Types
type TaskPagePropsType = {
    params: Promise<{
        reactisTaskId: string;
    }>;
};


// Main function
export default async function TaskPage({ params }: TaskPagePropsType) {
    const { reactisTaskId } = await params;
    const reactisUserId = await getReactisUserIdCookie();
    const reactisTaskUrl = `https://ncrm.netgraf.pl/task/user_list/${reactisUserId}/${reactisTaskId}`;


    const [mergedTaskResponse, reactisCommentsResponse] = await Promise.all([
        getMergedTask(reactisTaskId),
        getReactisTaskComments(reactisTaskId),
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

    console.log(mergedTask);
    return (
        <EditorProvider>
            <Container py="6">
                <TaskPageContainer
                    reactisTaskId={reactisTaskId}
                    reactisTaskUrl={reactisTaskUrl}
                    note={mergedTask.flowNotes}
                >
                    <Flex
                        direction="column"
                        gap="5"
                        style={{
                            height: "100%",
                            minHeight: 0,
                            // overflow: "hidden"
                        }}
                    >
                        <TaskPageHeading mergedTask={mergedTask} />
                        <TaskPageSegmentsController
                            mergedTask={mergedTask}
                            reactisComments={reactisComments}
                        />
                    </Flex>
                </TaskPageContainer>
            </Container>
        </EditorProvider>
    );
}
