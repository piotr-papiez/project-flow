import { ReactisSettings } from "../models/flow-settings.model";
import { db } from "@/db/mongoose.client";

import { Types } from "mongoose";
import type { ReactisSettingsType } from "../models/flow-settings.model";

type UpsertFlowSettingsByUserIdType =
    | { ok: true, data: ReactisSettingsType }
    | { ok: false, message: "SERVER_ERROR" | "RESOURCE_NOT_UPDATED" };

type FindReactisSettingsByFlowUserIdType =
    | { ok: true, data: ReactisSettingsType }
    | { ok: false, message: "SERVER_ERROR" | "RESOURCE_NOT_FOUND" };

export async function upsertFlowSettingsByUserId(settings: ReactisSettingsType): Promise<UpsertFlowSettingsByUserIdType> {
    await db();
    
    const { flowUserId, ...rest } = settings;

    const flowSettings = Object.fromEntries(
        Object.entries(rest).filter(([_, value]) => value !== "")
    );

    try {
        const newSettings = await ReactisSettings.findOneAndUpdate(
            { flowUserId },
            { $setOnInsert: { flowUserId }, $set: flowSettings },
            { upsert: true, returnDocument: "after" }
        );

        if (!newSettings) return { ok: false, message: "RESOURCE_NOT_UPDATED" };

        return { ok: true, data: newSettings };

    } catch (error) {
        return { ok: false, message: "SERVER_ERROR" };
    }
}

export async function findReactisSettingsByFlowUserId(flowUserId: Types.ObjectId): Promise<FindReactisSettingsByFlowUserIdType> {
    await db();

    try {
        const settings = await ReactisSettings.findOne({ flowUserId: flowUserId }).select("-reactisApiKey").lean();
        if (!settings) return { ok: false, message: "RESOURCE_NOT_FOUND" };

        return { ok: true, data: settings };
    } catch (error) {
        return { ok: false, message: "SERVER_ERROR" };
    }
}

export async function findReactisUserIdByFlowUserId(flowUserId: Types.ObjectId): Promise<string | null> {
    await db();

    try {
        const response = await ReactisSettings.findOne({ flowUserId }).select("reactisUserId").lean();
        if (!response) return null;

        const { reactisUserId } = response;
        if (!reactisUserId) return null;

        return reactisUserId;
    } catch (error) {
        return null;
    }
}

export async function findReactisApiKeyByFlowUserId(flowUserId: Types.ObjectId): Promise<string | null> {
    await db();

    try {
        const response = await ReactisSettings.findOne({ flowUserId }).select("reactisApiKey").lean();
        if (!response) return null;

        const { reactisApiKey } = response;
        if (!reactisApiKey) return null;

        return reactisApiKey;
    } catch (error) {
        return null;
    }
}