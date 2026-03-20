import { Schema } from "mongoose";

export const FlowTaskSchema = new Schema({
    reactisUserId: {
        type: String,
        index: true,
        required: true
    },
    reactisTaskId: {
        type: String,
        unique: true,
        required: true
    },
    flowStatus: {
        type: Number,
        required: true,
        index: true
    },
    flowPriority: {
        type: Number,
        required: true,
        index: true
    },
    reactisTaskUrl: {
        type: String,
        required: true
    },
    docsDraftUrl: {
        type: String
    },
    cmsUrl: {
        type: String
    },
    flowNotes: {
        type: String
    }
});