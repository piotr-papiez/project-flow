// Next.js
import { getReactisUserIdCookie } from "../lib/reactis-user-id-cookie";


// Reactis client
import { reactisFetch } from "@/server/api/reactis/reactis.client";


// Services
import { getReactisApiKey } from "@/features/settings/services/reactis-settings.service";


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

    const reactisApiKeyResponse = await getReactisApiKey();
    if (!reactisApiKeyResponse.ok) return reactisApiKeyResponse;

    const response = await reactisFetch<ReactisUserDataType>(
        `/users/${reactisUserId}`,
        reactisApiKeyResponse.apiKey,
        {
            cache: "force-cache",
            next: {
                tags: ["reactisUserData"]
            }
        }
    );

    return response;
}


export async function compareReactisUserDataDuringIntegration(
    reactisUserId: string,
    reactisApiKey: string | null | undefined
): Promise<GetReactisUserResponseType> {
    let apiKey: string;

    if (reactisApiKey) {
        apiKey = reactisApiKey;
    } else {
        const reactisApiKeyResponse = await getReactisApiKey();
        if (!reactisApiKeyResponse.ok) return reactisApiKeyResponse;
        apiKey = reactisApiKeyResponse.apiKey;
    }

    
    const response = await reactisFetch<ReactisUserDataType>(
        `/users/${reactisUserId}`,
        apiKey,
        {
            cache: "force-cache",
            next: {
                tags: ["reactisUserData"]
            }
        }
    );

    console.log("Odpowiedź serwera: ", response);
    return response;
}