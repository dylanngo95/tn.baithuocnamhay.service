"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
exports.safeParse = (str, fallback = undefined) => {
    try {
        return JSON.parse(str);
    }
    catch (_a) {
        return fallback;
    }
};
exports.isId = (key) => key === 'id' || key === '_id' || /Id$/.test(key);
exports.cleanQuery = (query = '', customFormatter) => {
    if (typeof query !== 'string')
        return query instanceof Object ? query : {};
    const defaultFormatter = (key, value) => {
        if (exports.isId(key))
            return value;
        value = exports.safeParse(value, value);
        if (typeof value === 'string')
            return new RegExp(value, 'i');
        return value;
    };
    const parsedQuery = exports.safeParse(query, {});
    return Object.keys(parsedQuery)
        .map(key => [key, parsedQuery[key]])
        .reduce((fullQuery, queryChunk) => {
        const key = queryChunk[0];
        const value = (customFormatter || defaultFormatter)(key, queryChunk[1]);
        if (key && value !== undefined)
            fullQuery[key] = value;
        return fullQuery;
    }, {});
};
exports.parseMultiPartRequest = (request) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        multer().any()(request, undefined, (error) => __awaiter(this, void 0, void 0, function* () {
            if (error)
                reject(error);
            resolve();
        }));
    });
});
