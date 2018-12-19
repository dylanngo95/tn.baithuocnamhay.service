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
var TagService_1;
const BaseService_1 = require("./base/BaseService");
const inversify_1 = require("inversify");
const TagRepository_1 = require("../repositories/mongo/TagRepository");
const ioc_1 = require("../inversify/ioc");
let TagService = TagService_1 = class TagService extends BaseService_1.BaseService {
    constructor(repository) {
        super();
        this.repository = repository;
    }
    getByContentId(contentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.getByContentId(contentId);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getByCategoryId(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.getByCategoryId(categoryId);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
};
TagService = TagService_1 = __decorate([
    ioc_1.ProvideSingleton(TagService_1),
    __param(0, inversify_1.inject(TagRepository_1.TagRepository))
], TagService);
exports.TagService = TagService;
