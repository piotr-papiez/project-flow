// Services
import { getMergedTask } from "../services/tasks.service";

// Repo
import { getReactisTaskComments } from "@/features/tasks/repo/reactis-tasks.repo";

// Radix
import { Card, Flex, Box } from "@radix-ui/themes";

// Types
type TaskDialogContentPropsType = {
    reactisTaskId: string
};

export default async function TaskDialogContent({ reactisTaskId }: TaskDialogContentPropsType) {
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

    const mergedTask = mergedTaskResponse;
    const reactisComments = reactisCommentsResponse.ok
        ? reactisCommentsResponse.data
        : { items: [] };

    return (
        <>
            <div>
                <Card>
                    <Flex direction="column" gap="3">
                        <Box>{mergedTask.name}</Box>
                        <Box>{mergedTask.flowStatus}</Box>
                    </Flex>
                </Card>
                <div dangerouslySetInnerHTML={{ __html: mergedTask.text }} />

                {reactisComments.items.map(item => (
                    <div
                        key={item.id}
                        dangerouslySetInnerHTML={{ __html: item.text }}
                    />
                ))}
            </div>
        </>
    );
}