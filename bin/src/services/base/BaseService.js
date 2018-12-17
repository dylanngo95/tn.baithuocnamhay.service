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
const ErrorHandler_1 = require("../../config/ErrorHandler");
const Constants_1 = require("../../config/Constants");
const inversify_1 = require("inversify");
const index_1 = require("../../entities/index");
class BaseService {
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne({ _id });
        });
    }
    getPaginated(page, limit, fields, sort, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (Math.max(1, page) - 1) * limit;
            let [count, docs] = yield Promise.all([
                this.repository.count(query),
                this.repository.find(skip, limit, sort, query)
            ]);
            const fieldArray = (fields || '').split(',').map(field => field.trim()).filter(Boolean);
            if (fieldArray.length)
                docs = docs.map(d => {
                    const attrs = {};
                    fieldArray.forEach(f => attrs[f] = d[f]);
                    return attrs;
                });
            return new index_1.PaginationModel({
                count,
                page,
                limit,
                docs,
                totalPages: Math.ceil(count / limit),
            });
        });
    }
    create(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.repository.create(entity);
            return this.getById(res._id);
        });
    }
    save(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.repository.save(entity);
            return this.getById(res._id);
        });
    }
    update(id, entity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.update(id, entity);
            return this.getById(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.repository.delete(id);
            if (!res.n)
                throw new ErrorHandler_1.ApiError(Constants_1.Constants.errorTypes.notFound);
        });
    }
}
exports.BaseService = BaseService;
inversify_1.decorate(inversify_1.injectable(), BaseService);
