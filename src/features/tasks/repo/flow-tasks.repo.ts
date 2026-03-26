// Cookies
import { getReactisUserIdCookie } from "@/features/auth/lib/reactis-user-id-cookie";

// Models
import { FlowTask } from "../models/flow-task.model";
import type { FlowTaskDataType } from "../models/flow-task.model";
import type { ReactisTaskDataType } from "@/types/reactis";

// Types
type GetFlowTaskResponseType =
    | { ok: true, task: FlowTaskDataType }
    | { ok: false, message: string, status: number };

type GetFlowTasksResponseType =
    | { ok: true, tasks: FlowTaskDataType[] }
    | { ok: false, message: string, status: number };

type UpsertFlowTasksResponseType =
    | { ok: true }
    | { ok: false, message: string, status: number };

type SetFlowStatusResponseType =
    | { ok: true }
    | { ok: false, message: string, status: number };

type SetFlowNoteResponseType =
    | { ok: true }
    | { ok: false, message: string, status: number };

export async function getFlowTask(
    reactisTaskId: string
): Promise<GetFlowTaskResponseType> {
    const reactisUserId = await getReactisUserIdCookie();

    if (!reactisUserId) return { ok: false, message: "UNAUTHORIZED", status: 401 };

    try {
        const response = await FlowTask.findOne({ reactisTaskId }).lean();
        if (!response) return { ok: false, message: "NOT_FOUND", status: 404 };

        const task = {
            ...response,
            _id: response._id.toString()
        };

        return { ok: true, task }
    } catch (error) {
        return { ok: false, message: "SERVER_ERROR", status: 500 };
    }
}

export async function getFlowTasks(): Promise<GetFlowTasksResponseType> {
    const reactisUserId = await getReactisUserIdCookie();

    if (!reactisUserId) return { ok: false, message: "UNAUTHORIZED", status: 401 };

    try {
        const response = await FlowTask.find({ reactisUserId }).lean();
        const tasks = response.map(task => ({
            ...task,
            _id: task._id.toString()
        }));

        return { ok: true, tasks };
    } catch (error) {
        return { ok: false, message: "SERVER_ERROR", status: 500 };
    }
}

export async function upsertFlowTasks(reactisTasks: ReactisTaskDataType[]): Promise<UpsertFlowTasksResponseType> {
    if (!reactisTasks.length) return { ok: true };

    const reactisUserId = await getReactisUserIdCookie();

    if (!reactisUserId) return { ok: false, message: "UNAUTHORIZED", status: 401 };

    try {
        const operations = reactisTasks.map(reactisTask => ({
            updateOne: {
                filter: { reactisTaskId: reactisTask.id },
                update: {
                    $setOnInsert: {
                        reactisUserId,
                        reactisTaskId: reactisTask.id,
                        flowStatus: 0,
                        flowPriority: 1,
                        reactisTaskUrl: `https://ncrm.netgraf.pl/task/user_list/${reactisUserId}/${reactisTask.id}`,
                        docsDraftUrl: "",
                        cmsUrl: "",
                        flowNotes: ""
                    }
                },
                upsert: true
            }
        }));

        const result = await FlowTask.bulkWrite(operations, { ordered: false });
        // if (result) console.log(result);

        return { ok: true };
    } catch (error) {
        return { ok: false, message: "SERVER_ERROR", status: 500 };
    }
}

export async function setFlowStatus(reactisTaskId: string, flowStatusValue: number): Promise<SetFlowStatusResponseType> {
    if (!reactisTaskId) return { ok: false, message: "TASK_ID_REQUIRED", status: 400 };

    try {
        const response = await FlowTask.updateOne(
            { reactisTaskId: reactisTaskId },
            { $set: { flowStatus: flowStatusValue } },
            { runValidators: true }
        );

        if (!response) return { ok: false, message: "TASK_NOT_UPDATED", status: 409 };
    } catch (error) {
        return { ok: false, message: "SERVER_ERROR", status: 500 };
    }

    return { ok: true };
}

export async function setFlowPriority(reactisTaskId: string, flowPriorityValue: number): Promise<SetFlowStatusResponseType> {
    if (!reactisTaskId) return { ok: false, message: "TASK_ID_REQUIRED", status: 400 };

    try {
        const response = await FlowTask.updateOne(
            { reactisTaskId: reactisTaskId },
            { $set: { flowPriority: flowPriorityValue } },
            { runValidators: true }
        );

        if (!response) return { ok: false, message: "TASK_NOT_UPDATED", status: 409 };
    } catch (error) {
        return { ok: false, message: "SERVER_ERROR", status: 500 };
    }

    return { ok: true };
}

export async function setFlowNote(reactisTaskId: string, note: string): Promise<SetFlowNoteResponseType> {
    if (!reactisTaskId) return { ok: false, message: "TASK_ID_REQUIRED", status: 400 };

    try {
        const response = await FlowTask.updateOne(
            { reactisTaskId: reactisTaskId },
            { $set: { flowNotes: note } },
            { runValidators: true }
        );

        if (!response) return { ok: false, message: "TASK_NOT_UPDATED", status: 409 };
    } catch (error) {
        return { ok: false, message: "SERVER_ERROR", status: 500 };
    }

    return { ok: true };
}