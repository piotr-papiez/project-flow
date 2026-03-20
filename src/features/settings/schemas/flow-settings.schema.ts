import { Schema } from "mongoose";

export const ReactisSettingsSchema = new Schema({
    flowUserId: {
        type: Schema.Types.ObjectId,
        unique: true,
        required: true
    },
    reactisUserId: {
        type: String
    },
    reactisApiKey: {
        type: String
    }
});