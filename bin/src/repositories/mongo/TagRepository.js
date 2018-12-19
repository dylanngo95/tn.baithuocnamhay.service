"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var TagRepository_1;
const BaseRepository_1 = require("./BaseRepository");
const TagEntity_1 = require("../../entities/TagEntity");
const ioc_1 = require("../../inversify/ioc");
const MongoDbConnection_1 = require("../../config/MongoDbConnection");
let TagRepository = TagRepository_1 = class TagRepository extends BaseRepository_1.BaseRepository {
    constructor(mongoDbConnection) {
        super();
        this.mongoDbConnection = mongoDbConnection;
        super.init('Tags', TagEntity_1.TagShema, mongoDbConnection);
    }
    getByContentId(contentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tags = yield this.documentModel.find({
                contentId: contentId
            });
            return new this.formatter(tags);
        });
    }
    getByCategoryId(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tags = yield this.documentModel.find({
                categoryId: categoryId
            });
            return new this.formatter(tags);
        });
    }
};
TagRepository = TagRepository_1 = __decorate([
    ioc_1.ProvideSingleton(TagRepository_1),
    __param(0, ioc_1.inject(MongoDbConnection_1.MongoDbConnection))
], TagRepository);
exports.TagRepository = TagRepository;
