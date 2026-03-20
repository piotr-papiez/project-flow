import { model, models, InferSchemaType } from "mongoose";
import { ReactisSettingsSchema } from "../schemas/flow-settings.schema";

import type { Model } from "mongoose";

export type ReactisSettingsType = InferSchemaType<typeof ReactisSettingsSchema>;

export const ReactisSettings: Model<ReactisSettingsType> =
    (models["ReactisSettings"] as Model<ReactisSettingsType>)
    || model<ReactisSettingsType>("ReactisSettings", ReactisSettingsSchema, "reactis_settings");