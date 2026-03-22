// Components
import TasksTable from "@/features/tasks/components/TasksTable";

// Functions
import { mergeTasksData, getMergedTasks } from "@/features/tasks/services/tasks.service";

// Radix
import { Container } from "@radix-ui/themes";

export default async function TasksPage() {
    await mergeTasksData();
    const response = await getMergedTasks();

    const count = response?.count ?? 0;
    const tasks = response?.data ?? [];

    return (
        <Container size="4" py="6" className="Container">
            <TasksTable count={count} tasks={tasks} />
        </Container>
    );
}