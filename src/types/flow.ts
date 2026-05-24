import type { ReactisTaskDataType } from "./reactis";
import type { FlowTaskDataType } from "@/features/tasks/models/flow-task.model";

export type MergedTaskDataType =
    ReactisTaskDataType & FlowTaskDataType;
    // & Partial<FlowTaskDataType>
    // & Required<Pick<FlowTaskDataType, "flowNotes">>;