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
var TagController_1;
const tsoa_1 = require("tsoa");
const ioc_1 = require("../inversify/ioc");
const TagService_1 = require("../services/TagService");
let TagController = TagController_1 = class TagController extends tsoa_1.Controller {
    constructor(tagService) {
        super();
        this.tagService = tagService;
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tagService.getById(id);
        });
    }
    getPaginated(page, limit, fields, sort, q) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tagService.getPaginated(page, limit, fields, sort, q);
        });
    }
    addContent(tag) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tagService.save(tag);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tagService.delete(id);
        });
    }
    getByContentId(contentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.tagService.getByContentId(contentId);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getByCategoryId(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.tagService.getByCategoryId(categoryId);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
};
__decorate([
    tsoa_1.Get('{id}'),
    __param(0, tsoa_1.Path('id'))
], TagController.prototype, "getById", null);
__decorate([
    tsoa_1.Get(),
    __param(0, tsoa_1.Query('page')),
    __param(1, tsoa_1.Query('limit')),
    __param(2, tsoa_1.Query('fields')),
    __param(3, tsoa_1.Query('sort')),
    __param(4, tsoa_1.Query('q'))
], TagController.prototype, "getPaginated", null);
__decorate([
    tsoa_1.Post(),
    __param(0, tsoa_1.Body())
], TagController.prototype, "addContent", null);
__decorate([
    tsoa_1.Delete('{id}'),
    __param(0, tsoa_1.Path('id'))
], TagController.prototype, "delete", null);
__decorate([
    tsoa_1.Post('get-by-content-id'),
    __param(0, tsoa_1.Query())
], TagController.prototype, "getByContentId", null);
__decorate([
    tsoa_1.Post('get-by-category-id'),
    __param(0, tsoa_1.Query())
], TagController.prototype, "getByCategoryId", null);
TagController = TagController_1 = __decorate([
    tsoa_1.Tags('Tag'),
    tsoa_1.Route('tag'),
    ioc_1.ProvideSingleton(TagController_1),
    __param(0, ioc_1.inject(TagService_1.TagService))
], TagController);
exports.TagController = TagController;
