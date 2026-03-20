"use server";

import { getFlowUserId } from "@/features/auth/services/auth.service";
import { upsertFlowSettingsByUserId } from "../repo/flow-settings.repo";
import { setReactisUserIdCookie } from "@/features/auth/lib/reactis-user-id-cookie";

type SaveFlowSettingsType = {};

export async function saveFlowSettings(prevState: SaveFlowSettingsType, formData: FormData): Promise<void> {
    const flowUserId = await getFlowUserId();
    if (!flowUserId) return;
    
    const reactisUserId = formData.get("reactis-user-id") as string;
    const reactisApiKey = formData.get("reactis-api-key") as string;

    const upsertedSettings = await upsertFlowSettingsByUserId({ flowUserId, reactisUserId, reactisApiKey });
    if (!upsertedSettings.ok) return;

    const upsertedReactisUserId = upsertedSettings.data.reactisUserId ?? "";

    await setReactisUserIdCookie(upsertedReactisUserId);
}