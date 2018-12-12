"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
const tsoa_1 = require("tsoa");
const ioc_1 = require("./../src/inversify/ioc");
const ContentController_1 = require("./../src/controllers/ContentController");
const CategoryController_1 = require("./../src/controllers/CategoryController");
const TagController_1 = require("./../src/controllers/TagController");
const models = {
    "MContentView": {
        "properties": {
            "title": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "content": { "dataType": "string", "required": true },
            "active": { "dataType": "double", "required": true },
            "image": { "dataType": "string", "required": true },
            "categories": { "dataType": "string", "required": true },
            "userId": { "dataType": "string", "required": true },
        },
    },
    "IPaginationModel": {
        "properties": {
            "count": { "dataType": "double", "required": true },
            "page": { "dataType": "double", "required": true },
            "limit": { "dataType": "double", "required": true },
            "totalPages": { "dataType": "double", "required": true },
            "docs": { "dataType": "array", "array": { "dataType": "any" }, "required": true },
        },
    },
    "MCategoryView": {
        "properties": {
            "index": { "dataType": "double", "required": true },
            "name": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "active": { "dataType": "double", "required": true },
        },
    },
    "MTagView": {
        "properties": {
            "contentId": { "dataType": "string", "required": true },
            "categoryId": { "dataType": "string", "required": true },
        },
    },
    "TagEntity": {
        "properties": {
            "_id": { "dataType": "any", "required": true },
            "created": { "dataType": "double" },
            "updated": { "dataType": "double" },
            "contentId": { "dataType": "string", "required": true },
            "categoryId": { "dataType": "string", "required": true },
        },
    },
};
function RegisterRoutes(app) {
    app.get('/v1/content/:id', function (request, response, next) {
        const args = {
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request);
        }
        catch (err) {
            return next(err);
        }
        const controller = ioc_1.iocContainer.get(ContentController_1.ContentController);
        if (typeof controller['setStatus'] === 'function') {
            controller.setStatus(undefined);
        }
        const promise = controller.getById.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.get('/v1/content', function (request, response, next) {
        const args = {
            page: { "in": "query", "name": "page", "required": true, "dataType": "double" },
            limit: { "in": "query", "name": "limit", "required": true, "dataType": "double" },
            fields: { "in": "query", "name": "fields", "dataType": "string" },
            sort: { "in": "query", "name": "sort", "dataType": "string" },
            q: { "in": "query", "name": "q", "dataType": "string" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request);
        }
        catch (err) {
            return next(err);
        }
        const controller = ioc_1.iocContainer.get(ContentController_1.ContentController);
        if (typeof controller['setStatus'] === 'function') {
            controller.setStatus(undefined);
        }
        const promise = controller.getPaginated.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.post('/v1/content', function (request, response, next) {
        const args = {
            content: { "in": "body", "name": "content", "required": true, "ref": "MContentView" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request);
        }
        catch (err) {
            return next(err);
        }
        const controller = ioc_1.iocContainer.get(ContentController_1.ContentController);
        if (typeof controller['setStatus'] === 'function') {
            controller.setStatus(undefined);
        }
        const promise = controller.addContent.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.delete('/v1/content/:id', function (request, response, next) {
        const args = {
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request);
        }
        catch (err) {
            return next(err);
        }
        const controller = ioc_1.iocContainer.get(ContentController_1.ContentController);
        if (typeof controller['setStatus'] === 'function') {
            controller.setStatus(undefined);
        }
        const promise = controller.delete.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.get('/v1/Category/:id', function (request, response, next) {
        const args = {
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request);
        }
        catch (err) {
            return next(err);
        }
        const controller = ioc_1.iocContainer.get(CategoryController_1.CategoryController);
        if (typeof controller['setStatus'] === 'function') {
            controller.setStatus(undefined);
        }
        const promise = controller.getById.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.get('/v1/Category', function (request, response, next) {
        const args = {
            page: { "in": "query", "name": "page", "required": true, "dataType": "double" },
            limit: { "in": "query", "name": "limit", "required": true, "dataType": "double" },
            fields: { "in": "query", "name": "fields", "dataType": "string" },
            sort: { "in": "query", "name": "sort", "dataType": "string" },
            q: { "in": "query", "name": "q", "dataType": "string" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request);
        }
        catch (err) {
            return next(err);
        }
        const controller = ioc_1.iocContainer.get(CategoryController_1.CategoryController);
        if (typeof controller['setStatus'] === 'function') {
            controller.setStatus(undefined);
        }
        const promise = controller.getPaginated.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.post('/v1/Category', function (request, response, next) {
        const args = {
            content: { "in": "body", "name": "content", "required": true, "ref": "MCategoryView" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request);
        }
        catch (err) {
            return next(err);
        }
        const controller = ioc_1.iocContainer.get(CategoryController_1.CategoryController);
        if (typeof controller['setStatus'] === 'function') {
            controller.setStatus(undefined);
        }
        const promise = controller.addContent.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.delete('/v1/Category/:id', function (request, response, next) {
        const args = {
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request);
        }
        catch (err) {
            return next(err);
        }
        const controller = ioc_1.iocContainer.get(CategoryController_1.CategoryController);
        if (typeof controller['setStatus'] === 'function') {
            controller.setStatus(undefined);
        }
        const promise = controller.delete.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.get('/v1/tag/:id', function (request, response, next) {
        const args = {
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request);
        }
        catch (err) {
            return next(err);
        }
        const controller = ioc_1.iocContainer.get(TagController_1.TagController);
        if (typeof controller['setStatus'] === 'function') {
            controller.setStatus(undefined);
        }
        const promise = controller.getById.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.get('/v1/tag', function (request, response, next) {
        const args = {
            page: { "in": "query", "name": "page", "required": true, "dataType": "double" },
            limit: { "in": "query", "name": "limit", "required": true, "dataType": "double" },
            fields: { "in": "query", "name": "fields", "dataType": "string" },
            sort: { "in": "query", "name": "sort", "dataType": "string" },
            q: { "in": "query", "name": "q", "dataType": "string" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request);
        }
        catch (err) {
            return next(err);
        }
        const controller = ioc_1.iocContainer.get(TagController_1.TagController);
        if (typeof controller['setStatus'] === 'function') {
            controller.setStatus(undefined);
        }
        const promise = controller.getPaginated.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.post('/v1/tag', function (request, response, next) {
        const args = {
            tag: { "in": "body", "name": "tag", "required": true, "ref": "MTagView" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request);
        }
        catch (err) {
            return next(err);
        }
        const controller = ioc_1.iocContainer.get(TagController_1.TagController);
        if (typeof controller['setStatus'] === 'function') {
            controller.setStatus(undefined);
        }
        const promise = controller.addContent.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.delete('/v1/tag/:id', function (request, response, next) {
        const args = {
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request);
        }
        catch (err) {
            return next(err);
        }
        const controller = ioc_1.iocContainer.get(TagController_1.TagController);
        if (typeof controller['setStatus'] === 'function') {
            controller.setStatus(undefined);
        }
        const promise = controller.delete.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    function isController(object) {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }
    function promiseHandler(controllerObj, promise, response, next) {
        return Promise.resolve(promise)
            .then((data) => {
            let statusCode;
            if (isController(controllerObj)) {
                const headers = controllerObj.getHeaders();
                Object.keys(headers).forEach((name) => {
                    response.set(name, headers[name]);
                });
                statusCode = controllerObj.getStatus();
            }
            if (data || data === false) { // === false allows boolean result
                response.status(statusCode || 200).json(data);
            }
            else {
                response.status(statusCode || 204).end();
            }
        })
            .catch((error) => next(error));
    }
    function getValidatedArgs(args, request) {
        const fieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return tsoa_1.ValidateParam(args[key], request.query[name], models, name, fieldErrors);
                case 'path':
                    return tsoa_1.ValidateParam(args[key], request.params[name], models, name, fieldErrors);
                case 'header':
                    return tsoa_1.ValidateParam(args[key], request.header(name), models, name, fieldErrors);
                case 'body':
                    return tsoa_1.ValidateParam(args[key], request.body, models, name, fieldErrors, name + '.');
                case 'body-prop':
                    return tsoa_1.ValidateParam(args[key], request.body[name], models, name, fieldErrors, 'body.');
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new tsoa_1.ValidateError(fieldErrors, '');
        }
        return values;
    }
}
exports.RegisterRoutes = RegisterRoutes;
