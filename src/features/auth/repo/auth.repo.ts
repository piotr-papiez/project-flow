// Next.js
import { getReactisUserIdCookie } from "../lib/reactis-user-id-cookie";

// Reactis client
import { reactisFetch } from "@/server/api/reactis/reactis.client";

// Types
import type {
    ReactisUserDataType, GetReactisUserResponseType
} from "@/types/reactis";

export async function getReactisUserData(): Promise<GetReactisUserResponseType> {
    const reactisUserId = await getReactisUserIdCookie();

    if (!reactisUserId) {
        return {
            ok: false,
            message: "UNAUTHORIZED",
            status: 401
        };
    }

    const response = await reactisFetch<ReactisUserDataType>(
        `/users/${reactisUserId}`,
        {
            cache: "force-cache",
            next: {
                tags: ["reactisUserData"]
            }
        }
    );

    return response;
}