"use server";

import { getFlowUserId } from "@/features/auth/services/auth.service";
import { upsertReactisSettingsByFlowUserId } from "../repo/reactis-settings.repo";
import { setReactisUserIdCookie } from "@/features/auth/lib/reactis-user-id-cookie";

type SaveReactisSettingsType = {};

export async function saveReactisSettings(prevState: SaveReactisSettingsType, formData: FormData): Promise<void> {
    const flowUserId = await getFlowUserId();
    if (!flowUserId) return;
    
    const reactisUserId = formData.get("reactis-user-id") as string;
    const reactisApiKey = formData.get("reactis-api-key") as string;

    const upsertedSettings = await upsertReactisSettingsByFlowUserId({ flowUserId, reactisUserId, reactisApiKey });
    if (!upsertedSettings.ok) return;

    const upsertedReactisUserId = upsertedSettings.data.reactisUserId ?? "";

    await setReactisUserIdCookie(upsertedReactisUserId);
}