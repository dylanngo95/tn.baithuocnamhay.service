"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ContentModule;
(function (ContentModule) {
    function convertContentView(mContentView) {
        const contentEntity = {
            title: mContentView.title,
            content: mContentView.content,
            description: mContentView.description,
            image: mContentView.image,
            active: mContentView.active,
            userId: mContentView.userId,
        };
        return contentEntity;
    }
    ContentModule.convertContentView = convertContentView;
})(ContentModule = exports.ContentModule || (exports.ContentModule = {}));
