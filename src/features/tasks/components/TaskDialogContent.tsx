// Repo
import {
    getReactisTask, getReactisTaskComments
} from "@/features/tasks/repo/reactis-tasks.repo";

// Radix
import { Dialog } from "@radix-ui/themes";

// Types
type TaskDialogContentPropsType = {
    reactisTaskId: string
};

export default async function TaskDialogContent({ reactisTaskId }: TaskDialogContentPropsType) {
    const [reactisTaskResponse, reactisCommentsResponse] = await Promise.all([
        getReactisTask(reactisTaskId),
        getReactisTaskComments(reactisTaskId)
    ]);

    if (!reactisTaskResponse.ok) {
        return (
            <div>
                Nie udało się pobrać szczegółów zadania
            </div>
        );
    }

    const reactisTask = reactisTaskResponse.data;
    const reactisComments = reactisCommentsResponse.ok
        ? reactisCommentsResponse.data
        : { items: [] };

    return (
        <>
            <Dialog.Description>
                <div>
                    <div dangerouslySetInnerHTML={{ __html: reactisTask.text }} />

                    {reactisComments.items.map(item => (
                        <div
                            key={item.id}
                            dangerouslySetInnerHTML={{ __html: item.text }}
                        />
                    ))}
                </div>
            </Dialog.Description>
        </>
    );
}