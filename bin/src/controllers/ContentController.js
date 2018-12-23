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
var ContentController_1;
const tsoa_1 = require("tsoa");
const inversify_1 = require("inversify");
const ContentService_1 = require("../services/ContentService");
const ioc_1 = require("../inversify/ioc");
const MContentView_1 = require("../views/MContentView");
const TagService_1 = require("../services/TagService");
const ErrorHandler_1 = require("../config/ErrorHandler");
const Constants_1 = require("../config/Constants");
const CategoryService_1 = require("../services/CategoryService");
let ContentController = ContentController_1 = class ContentController extends tsoa_1.Controller {
    constructor(contentService, tagService, categoryService) {
        super();
        this.contentService = contentService;
        this.tagService = tagService;
        this.categoryService = categoryService;
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contentService.getById(id);
        });
    }
    getPaginated(page, limit, fields, sort, q) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contentService.getPaginated(page, limit, fields, sort, q);
        });
    }
    saveContent(contentView) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contentService.save(MContentView_1.ContentModule.convertContentView(contentView));
        });
    }
    addContent(contentView) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const content = yield this.contentService.save(MContentView_1.ContentModule.convertContentView(contentView));
                if (!content)
                    throw new ErrorHandler_1.ApiError(Constants_1.Constants.errorTypes.notFound);
                for (let index = 0; index < contentView.categories.length; index++) {
                    const categoryId = contentView.categories[index].trim();
                    const category = yield this.categoryService.getByIndex(parseInt(categoryId));
                    if (category) {
                        yield this.tagService.save({
                            categoryId: category._id,
                            contentId: content._id
                        });
                    }
                }
                return content;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    updateContent(id, contentView) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const content = yield this.contentService.update(id, MContentView_1.ContentModule.convertContentView(contentView));
                if (!content)
                    throw new ErrorHandler_1.ApiError(Constants_1.Constants.errorTypes.notFound);
                return content;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.contentService.delete(id);
                if (res.n) {
                    const categories = yield this.tagService.getByContentId(id);
                    if (categories) {
                        categories.forEach(item => {
                            this.tagService.delete(item._id);
                        });
                        return;
                    }
                }
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
], ContentController.prototype, "getById", null);
__decorate([
    tsoa_1.Get(),
    __param(0, tsoa_1.Query('page')),
    __param(1, tsoa_1.Query('limit')),
    __param(2, tsoa_1.Query('fields')),
    __param(3, tsoa_1.Query('sort')),
    __param(4, tsoa_1.Query('q'))
], ContentController.prototype, "getPaginated", null);
__decorate([
    tsoa_1.Post(),
    __param(0, tsoa_1.Body())
], ContentController.prototype, "saveContent", null);
__decorate([
    tsoa_1.Post('add-content'),
    __param(0, tsoa_1.Body())
], ContentController.prototype, "addContent", null);
__decorate([
    tsoa_1.Put('{id}'),
    __param(0, tsoa_1.Path('id')), __param(1, tsoa_1.Body())
], ContentController.prototype, "updateContent", null);
__decorate([
    tsoa_1.Delete('{id}'),
    __param(0, tsoa_1.Path('id'))
], ContentController.prototype, "delete", null);
ContentController = ContentController_1 = __decorate([
    tsoa_1.Tags('Content'),
    tsoa_1.Route('content'),
    ioc_1.ProvideSingleton(ContentController_1),
    __param(0, inversify_1.inject(ContentService_1.ContentService)),
    __param(1, inversify_1.inject(TagService_1.TagService)),
    __param(2, inversify_1.inject(CategoryService_1.CategoryService))
], ContentController);
exports.ContentController = ContentController;
