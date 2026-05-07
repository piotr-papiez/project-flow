import { model, models, InferSchemaType } from "mongoose";
import { FlowTaskSchema } from "../schemas/flow-task.schema";

import type { Model } from "mongoose";
import type { JSONContent } from "@tiptap/react";

type FlowTaskSchemaType = InferSchemaType<typeof FlowTaskSchema>;

export type FlowTaskDataType = Omit<FlowTaskSchemaType, "flowNotes"> & { flowNotes: JSONContent};

export const FlowTask: Model<FlowTaskDataType> =
    (models["FlowTask"] as Model<FlowTaskDataType>)
    || model<FlowTaskDataType>("FlowTask", FlowTaskSchema);