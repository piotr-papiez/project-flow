import {
    findReactisSettingsByFlowUserId,
    findReactisApiKeyByFlowUserId
} from "../repo/flow-settings.repo";

import { getFlowUserId } from "@/features/auth/services/auth.service";

import type { ReactisSettingsType } from "../models/flow-settings.model";

export async function getReactisSettings(): Promise<ReactisSettingsType | null> {
    const flowUserId = await getFlowUserId();
    if (!flowUserId) return null;

    const response = await findReactisSettingsByFlowUserId(flowUserId);
    if (!response.ok) return null;

    const settings = response.data;

    return settings;
}

export async function getReactisApiKey(): Promise<string | null> {
    const flowUserId = await getFlowUserId();
    if (!flowUserId) return null;

    const response = await findReactisApiKeyByFlowUserId(flowUserId);
    if (!response) return null;

    const reactisApiKey = response;

    return reactisApiKey;
}