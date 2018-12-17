"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DbEntity_1 = require("./base/DbEntity");
exports.UserSchema = Object.assign({}, DbEntity_1.DbSchema, { name: { type: String, required: true }, address: { type: String, required: true }, age: { type: String, required: true } });
