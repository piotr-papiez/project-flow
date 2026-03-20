import { model, models, InferSchemaType } from "mongoose";
import { FlowTaskSchema } from "../schemas/flow-task.schema";

import type { Model } from "mongoose";

export type FlowTaskDataType = InferSchemaType<typeof FlowTaskSchema>;

export const FlowTask: Model<FlowTaskDataType> =
    (models["FlowTask"] as Model<FlowTaskDataType>)
    || model<FlowTaskDataType>("FlowTask", FlowTaskSchema);