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
const mongoose_1 = require("mongoose");
const generalUtils_1 = require("../../utils/generalUtils");
const ErrorHandler_1 = require("../../config/ErrorHandler");
const Constants_1 = require("../../config/Constants");
const inversify_1 = require("inversify");
class BaseRepository {
    constructor() {
        this.formatter = Object;
    }
    init(modelName, schema, mongoDbConnection) {
        this.modelName = modelName;
        this.schema = schema;
        this.mongoDbConnection = mongoDbConnection;
        this.documentModel = this.mongoDbConnection.db.model(this.modelName, new mongoose_1.Schema(this.schema, { collection: this.modelName }));
    }
    create(model) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield this.documentModel.create(this.cleanToSave(model));
            return new this.formatter(document);
        });
    }
    save(model) {
        return __awaiter(this, void 0, void 0, function* () {
            const documentModel = yield new this.documentModel(model);
            const doc = yield documentModel.save();
            if (doc) {
                return Promise.resolve(new this.formatter(doc));
            }
            else {
                throw new ErrorHandler_1.ApiError(Constants_1.Constants.errorTypes.notFound);
            }
        });
    }
    update(_id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.documentModel.updateOne({ _id }, this.cleanToSave(model));
        });
    }
    delete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const number = yield this.documentModel.deleteOne({ _id });
            return number;
        });
    }
    find(skip = 0, limit = 100, sort, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const sortObject = generalUtils_1.cleanQuery(sort, this.sortQueryFormatter);
            return (yield this.documentModel
                .find(this.cleanWhereQuery(query))
                .sort(Object.keys(sortObject).map(key => [key, sortObject[key]]))
                .skip(skip)
                .limit(limit)).map(item => new this.formatter(item));
        });
    }
    findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield this.documentModel.findOne(query);
            if (!document)
                throw new ErrorHandler_1.ApiError(Constants_1.Constants.errorTypes.notFound);
            return new this.formatter(document);
        });
    }
    count(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.documentModel.estimatedDocumentCount(this.cleanWhereQuery(query));
        });
    }
    cleanToSave(entity) {
        const copy = new this.formatter(entity);
        const loop = (value) => {
            if (!value || typeof value !== 'object')
                return;
            /** formatting logic to save goes here */
            Object.keys(value).forEach(key => loop(value[key]));
        };
        loop(copy);
        return copy;
    }
    sortQueryFormatter(key, value) {
        if (value === 'asc')
            return 1;
        if (value === 'desc')
            return -1;
        return undefined; // just for static typing
    }
    cleanSort(sort) {
        return generalUtils_1.cleanQuery(sort, this.sortQueryFormatter);
    }
    cleanWhereQuery(query) {
        if (!query || typeof query === 'string')
            return generalUtils_1.cleanQuery(query);
        const newQuery = { $or: [] };
        Object.keys(query).forEach(key => {
            let value = query[key];
            if (!(value instanceof Array))
                newQuery[key] = value;
            else
                newQuery.$or = newQuery.$or.concat(value.map(item => ({ [key]: item })));
        });
        if (!newQuery.$or.length)
            delete newQuery.$or;
        return newQuery;
    }
}
exports.BaseRepository = BaseRepository;
inversify_1.decorate(inversify_1.injectable(), BaseRepository);
