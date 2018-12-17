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
var UserController_1;
const tsoa_1 = require("tsoa");
const ioc_1 = require("../inversify/ioc");
const index_1 = require("../services/index");
const mongoose = require("mongoose");
let UserController = UserController_1 = class UserController extends tsoa_1.Controller {
    constructor(userService) {
        super();
        this.userService = userService;
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                name: 'Tinh Ngo',
                address: 'Kinh Mon, Hai Duong',
                age: 20
            };
            return Promise.resolve(user);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.getById(id);
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.create(Object.assign({ _id: new mongoose.mongo.ObjectId() }, body));
        });
    }
    save(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const userEntity = body;
            return this.userService.save(userEntity);
        });
    }
};
__decorate([
    tsoa_1.Get('get')
], UserController.prototype, "getUsers", null);
__decorate([
    tsoa_1.Get('{id}')
], UserController.prototype, "getById", null);
__decorate([
    tsoa_1.Post('add'),
    __param(0, tsoa_1.Body())
], UserController.prototype, "create", null);
__decorate([
    tsoa_1.Post('save'),
    __param(0, tsoa_1.Body())
], UserController.prototype, "save", null);
UserController = UserController_1 = __decorate([
    tsoa_1.Route('User'),
    tsoa_1.Tags('users'),
    ioc_1.ProvideSingleton(UserController_1),
    __param(0, ioc_1.inject(index_1.UserService))
], UserController);
exports.UserController = UserController;
