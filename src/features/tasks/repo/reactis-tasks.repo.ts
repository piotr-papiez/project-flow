import { cookies } from "next/headers";

import { reactisFetch } from "@/server/api/reactis/reactis.client";

import type {
    ReactisTaskDataType, ReactisTasksDataType,
    GetReactisTaskResponseType, GetReactisTasksResponseType
} from "@/types/reactis";

export async function getReactisTasks(): Promise<GetReactisTasksResponseType> {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) return { ok: false, message: "UNAUTHORIZED", status: 401 };

    const response = await reactisFetch<ReactisTasksDataType>(`/users/${userId}/get_tasks?limit=999`);

    return response;
}

export async function getTask(taskId: string): Promise<GetReactisTaskResponseType> {
    const response = await reactisFetch<ReactisTaskDataType>(`/tasks/${taskId}`);

    return response;
}