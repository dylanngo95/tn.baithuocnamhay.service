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
};
TagRepository = TagRepository_1 = __decorate([
    ioc_1.ProvideSingleton(TagRepository_1),
    __param(0, ioc_1.inject(MongoDbConnection_1.MongoDbConnection))
], TagRepository);
exports.TagRepository = TagRepository;
