import { getTask } from "@/features/tasks/repo/reactis-tasks.repo";

type PagePropsType = {
    params: { taskId: string };
};

export default async function TaskPage({ params }: PagePropsType) {
    const { taskId } = await params;

    const response = await getTask(taskId);

    if (!response.ok) return (
        <h2>Nie udało się wczytać zadania.</h2>
    );

    const task = response.data;

    return (
        <div>
            <h1>{task.id}: {task.name}</h1>
            <div dangerouslySetInnerHTML={{ __html: task.text }}></div>
            <p>{task.deadline}</p>
            {/* <p>{task.author}</p> */}
        </div>
    );
}