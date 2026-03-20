// Components
import TasksTable from "@/features/tasks/components/TasksTable";

// Functions
import { getReactisSettings } from "@/features/settings/services/reactis-settings.service";
import { mergeTasksData, getMergedTasks } from "@/features/tasks/services/tasks.service";

// Radix
import { Container } from "@radix-ui/themes";

export default async function TasksPage() {
    const settings = await getReactisSettings();

    await mergeTasksData();
    const response = await getMergedTasks();

    // if (!response) return (
    //     <h2>Nie udało się wczytać listy zadań.</h2>
    // );

    const count = response?.count ?? 0;
    const tasks = response?.data ?? [];

    return (
        <Container size="4" py="6" className="Container">
            <TasksTable count={count} tasks={tasks} />
        </Container>
        // {settings && (
        //     <div>
        //         <h3>UserID: {settings.reactisUserId}</h3>
        //         <h3>ApiKEY: {settings.reactisApiKey}</h3>
        //     </div>
        // )}
        // <h1>Ilość zadań: {tasks.count}</h1>
        // <SignOutButton />
        // {tasks.data.map(task => (
        //     <div key={task.id}>
        //         <h1>{task.flowStatus}</h1>
        //         <h1>{task.reactisTaskUrl}</h1>
        //         <h3>{task.id}</h3>
        //         <h2>{task.create_date}</h2>
        //         <div dangerouslySetInnerHTML={{ __html: task.name }}></div>
        //         <div dangerouslySetInnerHTML={{ __html: task.text }}></div>
        //     </div>
        // ))}
    );
}