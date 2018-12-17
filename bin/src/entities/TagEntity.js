"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DbEntity_1 = require("./base/DbEntity");
exports.TagShema = Object.assign({}, DbEntity_1.DbSchema, { contentId: { type: String, require: true, }, categoryId: { type: String, require: true, } });
