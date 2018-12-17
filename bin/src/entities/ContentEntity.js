"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DbEntity_1 = require("./base/DbEntity");
exports.ContentSchema = Object.assign({}, DbEntity_1.DbSchema, { title: { type: String, require: true, }, description: { type: String, require: true, }, content: { type: String, require: true, }, active: { type: Number, require: true, }, image: { type: String, require: true, }, userId: { type: String, require: true, } });
