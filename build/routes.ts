/* tslint:disable */
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { iocContainer } from './../src/inversify/ioc';
import { ContentController } from './../src/controllers/ContentController';
import { CategoryController } from './../src/controllers/CategoryController';
import { TagController } from './../src/controllers/TagController';
import * as express from 'express';

const models: TsoaRoute.Models = {
    "ContentEntity": {
        "properties": {
            "_id": { "dataType": "any" },
            "created": { "dataType": "double" },
            "updated": { "dataType": "double" },
            "delete": { "dataType": "boolean" },
            "title": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "content": { "dataType": "string", "required": true },
            "active": { "dataType": "double", "required": true },
            "image": { "dataType": "string", "required": true },
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
    "MContentView": {
        "properties": {
            "title": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "content": { "dataType": "string", "required": true },
            "active": { "dataType": "double", "required": true },
            "image": { "dataType": "string", "required": true },
            "categories": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
            "userId": { "dataType": "string", "required": true },
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
            "_id": { "dataType": "any" },
            "created": { "dataType": "double" },
            "updated": { "dataType": "double" },
            "delete": { "dataType": "boolean" },
            "contentId": { "dataType": "string", "required": true },
            "categoryId": { "dataType": "string", "required": true },
        },
    },
};
const validationService = new ValidationService(models);

export function RegisterRoutes(app: express.Express) {
    app.get('/content/:id',
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ContentController>(ContentController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.getById.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/content',
        function(request: any, response: any, next: any) {
            const args = {
                page: { "in": "query", "name": "page", "required": true, "dataType": "double" },
                limit: { "in": "query", "name": "limit", "required": true, "dataType": "double" },
                fields: { "in": "query", "name": "fields", "dataType": "string" },
                sort: { "in": "query", "name": "sort", "dataType": "string" },
                q: { "in": "query", "name": "q", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ContentController>(ContentController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.getPaginated.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/content',
        function(request: any, response: any, next: any) {
            const args = {
                content: { "in": "body", "name": "content", "required": true, "ref": "MContentView" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ContentController>(ContentController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.saveContent.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/content/add-content',
        function(request: any, response: any, next: any) {
            const args = {
                contentView: { "in": "body", "name": "contentView", "required": true, "ref": "MContentView" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ContentController>(ContentController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.addContent.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.put('/content/:id',
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                contentView: { "in": "body", "name": "contentView", "required": true, "ref": "MContentView" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ContentController>(ContentController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.updateContent.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.delete('/content/:id',
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ContentController>(ContentController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.delete.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/category/:id',
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<CategoryController>(CategoryController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.getById.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/category',
        function(request: any, response: any, next: any) {
            const args = {
                page: { "in": "query", "name": "page", "required": true, "dataType": "double" },
                limit: { "in": "query", "name": "limit", "required": true, "dataType": "double" },
                fields: { "in": "query", "name": "fields", "dataType": "string" },
                sort: { "in": "query", "name": "sort", "dataType": "string" },
                q: { "in": "query", "name": "q", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<CategoryController>(CategoryController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.getPaginated.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/category',
        function(request: any, response: any, next: any) {
            const args = {
                content: { "in": "body", "name": "content", "required": true, "ref": "MCategoryView" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<CategoryController>(CategoryController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.addContent.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.delete('/category/:id',
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<CategoryController>(CategoryController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.delete.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/tag/:id',
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<TagController>(TagController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.getById.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/tag',
        function(request: any, response: any, next: any) {
            const args = {
                page: { "in": "query", "name": "page", "required": true, "dataType": "double" },
                limit: { "in": "query", "name": "limit", "required": true, "dataType": "double" },
                fields: { "in": "query", "name": "fields", "dataType": "string" },
                sort: { "in": "query", "name": "sort", "dataType": "string" },
                q: { "in": "query", "name": "q", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<TagController>(TagController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.getPaginated.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/tag',
        function(request: any, response: any, next: any) {
            const args = {
                tag: { "in": "body", "name": "tag", "required": true, "ref": "MTagView" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<TagController>(TagController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.addContent.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.delete('/tag/:id',
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<TagController>(TagController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.delete.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/tag/get-by-content-id',
        function(request: any, response: any, next: any) {
            const args = {
                contentId: { "in": "query", "name": "contentId", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<TagController>(TagController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.getByContentId.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/tag/get-by-category-id',
        function(request: any, response: any, next: any) {
            const args = {
                categoryId: { "in": "query", "name": "categoryId", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<TagController>(TagController);
            if (typeof controller['setStatus'] === 'function') {
                (<any>controller).setStatus(undefined);
            }


            const promise = controller.getByCategoryId.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });


    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode;
                if (isController(controllerObj)) {
                    const headers = controllerObj.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        response.set(name, headers[name]);
                    });

                    statusCode = controllerObj.getStatus();
                }

                if (data || data === false) { // === false allows boolean result
                    response.status(statusCode || 200).json(data);
                } else {
                    response.status(statusCode || 204).end();
                }
            })
            .catch((error: any) => next(error));
    }

    function getValidatedArgs(args: any, request: any): any[] {
        const fieldErrors: FieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors);
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors);
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors);
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, name + '.');
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.');
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }
}
