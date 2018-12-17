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
var CategoryController_1;
const tsoa_1 = require("tsoa");
const inversify_1 = require("inversify");
const ioc_1 = require("../inversify/ioc");
const CategoryService_1 = require("../services/CategoryService");
let CategoryController = CategoryController_1 = class CategoryController extends tsoa_1.Controller {
    constructor(service) {
        super();
        this.service = service;
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.getById(id);
        });
    }
    getPaginated(page, limit, fields, sort, q) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.getPaginated(page, limit, fields, sort, q);
        });
    }
    addContent(content) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.save(content);
        });
    }
    delete(id) {
        return this.service.delete(id);
    }
};
__decorate([
    tsoa_1.Get('{id}')
], CategoryController.prototype, "getById", null);
__decorate([
    tsoa_1.Get(),
    __param(0, tsoa_1.Query('page')),
    __param(1, tsoa_1.Query('limit')),
    __param(2, tsoa_1.Query('fields')),
    __param(3, tsoa_1.Query('sort')),
    __param(4, tsoa_1.Query('q'))
], CategoryController.prototype, "getPaginated", null);
__decorate([
    tsoa_1.Post(),
    __param(0, tsoa_1.Body())
], CategoryController.prototype, "addContent", null);
__decorate([
    tsoa_1.Delete('{id}')
], CategoryController.prototype, "delete", null);
CategoryController = CategoryController_1 = __decorate([
    tsoa_1.Tags('Category'),
    tsoa_1.Route('category'),
    ioc_1.ProvideSingleton(CategoryController_1),
    __param(0, inversify_1.inject(CategoryService_1.CategoryService))
], CategoryController);
exports.CategoryController = CategoryController;
