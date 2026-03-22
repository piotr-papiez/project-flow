import { getReactisTask, getReactisTaskComments } from "@/features/tasks/repo/reactis-tasks.repo";

type TaskPagePropsType = {
    params: Promise<{
        reactisTaskId: string
    }>;
};

export default async function TaskPage({ params }: TaskPagePropsType) {
    const { reactisTaskId } = await params;

    const response = await getReactisTask(reactisTaskId);

    if (!response.ok) return (
        <h2>Nie udało się wczytać zadania.</h2>
    );

    const task = response.data;

    const res = await getReactisTaskComments(reactisTaskId);
    if (!res.ok) return;

    return (
        <div>
            <h1>{task.id}: {task.name}</h1>
            <div dangerouslySetInnerHTML={{ __html: task.text }} />
            <p>{task.deadline}</p>
            <div>
                {res.data.items.map(item => (
                    <h2 dangerouslySetInnerHTML={{ __html: item.text }} key={item.id} />
                ))}
            </div>
            <h2>{res.data.total_items}</h2>
        </div>
    );
}