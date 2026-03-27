// Cookies
import { getReactisUserIdCookie } from "@/features/auth/lib/reactis-user-id-cookie";

// Reactis client
import { reactisFetch } from "@/server/api/reactis/reactis.client";

// Types
import type {
    ReactisTaskDataType, ReactisTasksDataType,
    GetReactisTaskResponseType, GetReactisTasksResponseType,
    ReactisTaskCommentsType, GetReactisTaskCommentsResponseType
} from "@/types/reactis";

export async function getReactisTask(
    reactisTaskId: string
): Promise<GetReactisTaskResponseType> {
    const response = await reactisFetch<ReactisTaskDataType>(`/tasks/${reactisTaskId}`);

    return response;
}

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
        `/users/${reactisUserId}/get_tasks?limit=999`
    );

    return response;
}

export async function getReactisTaskComments(
    reactisTaskId: string
): Promise<GetReactisTaskCommentsResponseType> {
    const response = await reactisFetch<ReactisTaskCommentsType>(`/taskcomments/${reactisTaskId}?limit=999`);

    return response;
}