import "server-only";


// Types
import type { ReactisFetchResponseType } from "@/types/reactis";


export async function reactisFetch<T>(
    path: string,
    reactisApiKey: string,
    options: RequestInit = {}
): Promise<ReactisFetchResponseType<T>> {
    if (!reactisApiKey) return {
        ok: false,
        message: "UNAUTHORIZED",
        status: 401
    };

    try {
        const response = await fetch(`https://ncrm.netgraf.pl/api/v1${path}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                apiKey: reactisApiKey
            },
        });

        if (!response.ok) return {
            ok: false,
            message: "API_ERROR",
            status: 502
        };

        const data = await response.json();
        
        const sizeInByts = new TextEncoder().encode(
            JSON.stringify(data)
        ).length;
        console.log(sizeInByts);

        return {
            ok: true,
            data,
            status: response.status
        };
    } catch (error) {
        return {
            ok: false,
            message: "SERVER_ERROR",
            status: 500
        };
    }
}