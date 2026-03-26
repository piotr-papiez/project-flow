import { getReactisTask, getReactisTasks } from "../repo/reactis-tasks.repo";
import { getFlowTask, getFlowTasks, upsertFlowTasks } from "../repo/flow-tasks.repo";

import type { MergedTaskDataType } from "@/types/flow";

type MergedTasksDataType = {
    count: number,
    data: MergedTaskDataType[]
};

export async function getMergedTask(
    reactisTaskId: string
): Promise<MergedTaskDataType | null> {
    const [reactisResponse, flowResponse] = await Promise.all([
        getReactisTask(reactisTaskId),
        getFlowTask(reactisTaskId)
    ]);

    if (!reactisResponse.ok) return null;
    if (!flowResponse.ok) return null;

    const reactisTask = reactisResponse.data;
    const flowTask = flowResponse.task;

    const mergedTask = { ...reactisTask, ...flowTask };

    return mergedTask;
}

export async function getMergedTasks(): Promise<MergedTasksDataType | null> {
    const [reactisResponse, flowResponse] = await Promise.all([
        getReactisTasks(),
        getFlowTasks()
    ]);

    if (!reactisResponse.ok) return null;
    if (!flowResponse.ok) return null;

    const taskCount = reactisResponse.data.total_items;
    const reactisTasks = reactisResponse.data.items;
    const flowTasks = flowResponse.tasks;

    const flowTasksMap = new Map(
        flowTasks.map(flowTask => [String(flowTask.reactisTaskId), flowTask])
    );

    const mergedTasksList = reactisTasks.map(reactisTask => ({
        ...reactisTask,
        ...flowTasksMap.get(String(reactisTask.id))
    }));

    const mergedTasks = {
        count: taskCount,
        data: mergedTasksList
    };

    return mergedTasks;
}

export async function mergeTasksData() {
    const reactisResponse = await getReactisTasks();
    if (!reactisResponse.ok) return null;

    const reactisTasks = reactisResponse.data.items;

    const mergedTasksData = await upsertFlowTasks(reactisTasks);
    if (!mergedTasksData.ok) return null;

    return mergedTasksData;
}