"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const ErrorHandler_1 = require("./ErrorHandler");
const routes_1 = require("../../build/routes");
const Logger_1 = require("./Logger");
require("../controllers");
const Constants_1 = require("./Constants");
class Server {
    constructor() {
        this.app = express();
        this.port = Constants_1.Constants.config.port;
        this.app.use(this.allowCors);
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(morgan('dev', { skip: () => !Logger_1.Logger.shouldLog }));
        routes_1.RegisterRoutes(this.app);
        this.app.use(ErrorHandler_1.ErrorHandler.handleError);
        const swaggerDocument = require('../../build/swagger/swagger.json');
        const options = {
            explorer: true,
            swaggerUrl: `http://${Constants_1.Constants.config.domain}:${Constants_1.Constants.config.port}/swagger/swagger.json`
        };
        this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(null, options));
        this.app.use(express.static(require('path').join(__dirname, '..', '..', 'build')));
    }
    listen(port = this.port) {
        return __awaiter(this, void 0, void 0, function* () {
            process.on('uncaughtException', this.criticalErrorHandler);
            process.on('unhandledRejection', this.criticalErrorHandler);
            const listen = this.app.listen(port);
            Logger_1.Logger.info(`Server running environment: ${Constants_1.Constants.config.environment} with port: ${port}`);
            Logger_1.Logger.info(`Go to http://${Constants_1.Constants.config.domain}:${port}`);
            return listen;
        });
    }
    criticalErrorHandler(...args) {
        Logger_1.Logger.error('Critical Error...', ...args);
        process.exit(1);
    }
    allowCors(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, apikey, x-access-token');
        next();
    }
}
exports.Server = Server;
