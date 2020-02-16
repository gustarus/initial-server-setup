"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolvePathFromHome_1 = __importDefault(require("./resolvePathFromHome"));
const publicExtensionExpression = /\.pub$/;
function resolveKeysPair(raw) {
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
        private: resolvePathFromHome_1.default(pathToPrivate),
        public: resolvePathFromHome_1.default(pathToPublic),
    };
}
exports.default = resolveKeysPair;
