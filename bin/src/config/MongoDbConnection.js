"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var MongoDbConnection_1;
const mongoose = require("mongoose");
const ioc_1 = require("../inversify/ioc");
const Constants_1 = require("./Constants");
let MongoDbConnection = MongoDbConnection_1 = class MongoDbConnection {
    constructor() {
        this.connectionString = Constants_1.Constants.config.mongoConnectionString;
        if (Constants_1.Constants.config.environment == 'production') {
            this.db = mongoose.createConnection(this.connectionString, {
                useNewUrlParser: true,
                auth: {
                    user: Constants_1.Constants.config.userName,
                    password: Constants_1.Constants.config.password
                }
            });
        }
        else {
            this.db = mongoose.createConnection(this.connectionString, { useNewUrlParser: true });
        }
    }
};
MongoDbConnection = MongoDbConnection_1 = __decorate([
    ioc_1.ProvideSingleton(MongoDbConnection_1)
], MongoDbConnection);
exports.MongoDbConnection = MongoDbConnection;
