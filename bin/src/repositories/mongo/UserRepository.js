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
var UserRepository_1;
const BaseRepository_1 = require("./BaseRepository");
const inversify_1 = require("inversify");
const MongoDbConnection_1 = require("../../config/MongoDbConnection");
const ioc_1 = require("../../inversify/ioc");
const UserEntity_1 = require("../../entities/UserEntity");
let UserRepository = UserRepository_1 = class UserRepository extends BaseRepository_1.BaseRepository {
    constructor(mongoDbConnection) {
        super();
        this.mongoDbConnection = mongoDbConnection;
        super.init('Users', UserEntity_1.UserSchema, mongoDbConnection);
    }
};
UserRepository = UserRepository_1 = __decorate([
    ioc_1.ProvideSingleton(UserRepository_1),
    __param(0, inversify_1.inject(MongoDbConnection_1.MongoDbConnection))
], UserRepository);
exports.UserRepository = UserRepository;
