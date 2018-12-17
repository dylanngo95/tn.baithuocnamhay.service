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
var CategoryRepository_1;
const BaseRepository_1 = require("./BaseRepository");
const ioc_1 = require("../../inversify/ioc");
const MongoDbConnection_1 = require("../../config/MongoDbConnection");
const CategoryEntity_1 = require("../../entities/CategoryEntity");
let CategoryRepository = CategoryRepository_1 = class CategoryRepository extends BaseRepository_1.BaseRepository {
    constructor(mongoDbConnection) {
        super();
        this.mongoDbConnection = mongoDbConnection;
        super.init('Categories', CategoryEntity_1.CategorySchema, mongoDbConnection);
    }
};
CategoryRepository = CategoryRepository_1 = __decorate([
    ioc_1.ProvideSingleton(CategoryRepository_1),
    __param(0, ioc_1.inject(MongoDbConnection_1.MongoDbConnection))
], CategoryRepository);
exports.CategoryRepository = CategoryRepository;
