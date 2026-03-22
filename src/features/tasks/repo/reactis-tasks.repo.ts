// Cookies
import { getReactisUserIdCookie } from "@/features/auth/lib/reactis-user-id-cookie";

// Reactis client
import { reactisFetch } from "@/server/api/reactis/reactis.client";

// Types
import type {
    ReactisTaskDataType, ReactisTasksDataType,
    GetReactisTaskResponseType, GetReactisTasksResponseType
} from "@/types/reactis";

export async function getReactisTasks(): Promise<GetReactisTasksResponseType> {
    const reactisUserId = await getReactisUserIdCookie();

    if (!reactisUserId) {
        return {
            ok: false,
            message: "UNAUTHORIZED",
            status: 401
        };
    }

    const response = await reactisFetch<ReactisTasksDataType>(
        `/users/${reactisUserId}/get_tasks?limit=999`,
        {
            cache: "force-cache",
            next: {
                tags: ["tasks"]
            }
        }
    );

    return response;
}

export async function getTask(taskId: string): Promise<GetReactisTaskResponseType> {
    const response = await reactisFetch<ReactisTaskDataType>(`/tasks/${taskId}`);

    return response;
}