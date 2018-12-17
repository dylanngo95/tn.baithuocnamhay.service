"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.DbSchema = {
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    created: {
        type: mongoose.Schema.Types.Number,
        require: false,
        default: Date.now,
    },
    updated: {
        type: mongoose.Schema.Types.Number,
        require: false,
        default: Date.now
    },
    delete: {
        type: mongoose.Schema.Types.Boolean,
        require: false,
        default: false,
    }
};
