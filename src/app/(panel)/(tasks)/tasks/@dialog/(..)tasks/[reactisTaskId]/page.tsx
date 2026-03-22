// Repo
import { getReactisTask, getReactisTaskComments } from "@/features/tasks/repo/reactis-tasks.repo";

// Components
import TaskDialog from "@/features/tasks/components/TaskDialog";

type TaskDialogPagePropsType = {
    params: Promise<{
        reactisTaskId: string
    }>;
}

export default async function TaskDialogPage({ params }: TaskDialogPagePropsType) {
    const { reactisTaskId } = await params;

    const response = await getReactisTask(reactisTaskId);

    if (!response.ok) return (
        <h2>Nie udało się wczytać zadania.</h2>
    );

    const task = response.data;

    const res = await getReactisTaskComments(reactisTaskId);
    if (!res.ok) return;

    return (
        <TaskDialog reactisTaskDetails={task} reactisTaskComments={res.data} />
    )
}