// Models
import type { ReactisSettingsType } from "../models/flow-settings.model";


// Repo
import { compareReactisUserDataDuringIntegration } from "@/features/auth/repo/auth.repo";

import { upsertReactisSettingsByFlowUserId } from "../repo/reactis-settings.repo";

import {
    findReactisSettingsByFlowUserId,
    findReactisApiKeyByFlowUserId
} from "../repo/reactis-settings.repo";


// Services
import { getFlowUserId } from "@/features/auth/services/auth.service";


// Types
import type { UpsertReactisSettingsByUserIdType } from "../repo/reactis-settings.repo";

type GetReactisApiKeyResponseType =
    | { ok: true, apiKey: string }
    | { ok: false, message: "UNAUTHORIZED" | "API_KEY_NOT_FOUND", status: 401 | 404 };


export async function upsertReactisSettings(
    settings: ReactisSettingsType
): Promise<UpsertReactisSettingsByUserIdType> {
    if (!settings.reactisUserEmail) return {
        ok: false,
        message: "MISSING_EMAIL"
    }

    if (!settings.reactisUserId) return {
        ok: false,
        message: "MISSING_ID"
    }

    const reactisUserData = await compareReactisUserDataDuringIntegration(
        settings.reactisUserId,
        settings.reactisApiKey
    );

    if (!reactisUserData.ok) {
        if (reactisUserData.message === "API_KEY_NOT_FOUND") return {
            ok: false,
            message: "API_KEY_NOT_FOUND"
        }

        return {
            ok: false,
            message: "UNAUTHORIZED"
        }
    }

    if (settings.reactisUserEmail !== reactisUserData.data.email) {
        return {
            ok: false,
            message: "UNAUTHORIZED"
        };
    }

    const upsertedReactisSettings = await upsertReactisSettingsByFlowUserId(settings);

    return upsertedReactisSettings;
}


export async function getReactisSettings(): Promise<ReactisSettingsType | null> {
    const flowUserId = await getFlowUserId();
    if (!flowUserId) return null;

    const response = await findReactisSettingsByFlowUserId(flowUserId);
    if (!response.ok) return null;

    const settings = response.data;

    return settings;
}


export async function getReactisApiKey(): Promise<GetReactisApiKeyResponseType> {
    const flowUserId = await getFlowUserId();
    if (!flowUserId) return {
        ok: false,
        message: "UNAUTHORIZED",
        status: 401
    };

    const response = await findReactisApiKeyByFlowUserId(flowUserId);
    if (!response) return {
        ok: false,
        message: "API_KEY_NOT_FOUND",
        status: 404
    };

    const reactisApiKey = response;

    return { ok: true, apiKey: reactisApiKey }
}