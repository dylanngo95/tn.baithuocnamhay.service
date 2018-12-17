"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("./Constants");
const Logger_1 = require("./Logger");
class ApiError extends Error {
    constructor(errorType) {
        super(errorType.message);
        this.statusCode = 500;
        this.name = errorType.name;
        if (errorType.statusCode)
            this.statusCode = errorType.statusCode;
        this.fields = errorType.fields;
    }
}
exports.ApiError = ApiError;
class ErrorHandler {
    static handleError(error, req, res, next) {
        const normalizedError = ErrorHandler.normalizeError(error);
        const { name, message, fields, statusCode } = normalizedError;
        Logger_1.Logger.error(`Error: ${statusCode}`, `Error Name: ${name}`, `Error Message: ${message}`, 'Error Fields:', fields || {}, 'Original Error: ', error);
        res.status(statusCode).json({ name, message, fields });
        next();
    }
    static normalizeError(error) {
        const normalizedError = new ApiError(error);
        Object.keys(Constants_1.Constants.errorMap).forEach(errorKey => {
            if (errorKey === normalizedError.name)
                Object.assign(normalizedError, Constants_1.Constants.errorMap[errorKey]);
        });
        Object.keys(Constants_1.Constants.errorTypes).forEach(errorTypeKey => {
            const errorType = Constants_1.Constants.errorTypes[errorTypeKey];
            if (errorType.statusCode === normalizedError.statusCode)
                normalizedError.name = errorType.name;
        });
        return normalizedError;
    }
}
exports.ErrorHandler = ErrorHandler;
