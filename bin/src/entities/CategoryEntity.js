"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DbEntity_1 = require("./base/DbEntity");
exports.CategorySchema = Object.assign({}, DbEntity_1.DbSchema, { index: {
        type: Number,
        require: true,
    }, name: {
        type: String,
        require: true,
    }, description: {
        type: String,
        require: true,
    }, active: {
        type: Number,
        require: true,
    } });
