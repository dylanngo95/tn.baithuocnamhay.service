"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const dotenv_1 = require("dotenv");
const { env } = process;
dotenv_1.config({ path: path_1.resolve(__dirname, `./env/.env.${env.NODE_ENV}`) });
const Config = {
    environment: env.NODE_ENV,
    port: Number(env.PORT),
    mongoConnectionString: env.MONGO_CONNECTION_STRING,
    userName: env.USER_NAME,
    password: env.PASSWORD,
};
const errorTypes = {
    db: { statusCode: 500, name: 'Internal Server Error', message: 'database error' },
    validation: { statusCode: 400, name: 'Bad Request', message: 'validation error' },
    auth: { statusCode: 401, name: 'Unauthorized', message: 'auth error' },
    forbidden: { statusCode: 403, name: 'Forbidden', message: 'forbidden content' },
    notFound: { statusCode: 404, name: 'Not Found', message: 'content not found' },
    entity: { statusCode: 422, name: 'Unprocessable Entity', message: 'entity error' }
};
exports.default = {
    config: Config,
    errorTypes: errorTypes,
    get errorMap() {
        return {
            ValidateError: this.errorTypes.validation,
            ValidationError: this.errorTypes.validation,
            CastError: this.errorTypes.db
        };
    }
};
