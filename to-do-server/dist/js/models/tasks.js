"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["TO_DO", "IN_PROGRESS", "DONE"],
        default: 'TO_DO',
        required: false
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Task', taskSchema);
