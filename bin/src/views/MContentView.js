"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ContentModule;
(function (ContentModule) {
    function convertContentView(mContentView) {
        let categories = '';
        mContentView.categories.forEach(element => {
            categories += element + ',';
        });
        const contentEntity = {
            title: mContentView.title,
            content: mContentView.content,
            description: mContentView.description,
            image: mContentView.image,
            active: mContentView.active,
            userId: mContentView.userId,
            categories: categories,
        };
        return contentEntity;
    }
    ContentModule.convertContentView = convertContentView;
})(ContentModule = exports.ContentModule || (exports.ContentModule = {}));
