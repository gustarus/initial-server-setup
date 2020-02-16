"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const publicExtensionExpression = /\.pub$/;
function resolveKeyPair(raw) {
    let pathToPrivate;
    let pathToPublic;
    if (raw.match(publicExtensionExpression)) {
        pathToPrivate = raw.replace(publicExtensionExpression, '');
        pathToPublic = raw;
    }
    else {
        pathToPrivate = raw;
        pathToPublic = `${raw}.pub`;
    }
    return {
        private: pathToPrivate,
        public: pathToPublic,
    };
}
exports.default = resolveKeyPair;
