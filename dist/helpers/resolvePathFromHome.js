"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
function resolvePathFromHome(source) {
    if (source.match(/^~/)) {
        if (!process.env.HOME) {
            throw new Error('Unable to resolve path to home');
        }
        return path_1.default.resolve(process.env.HOME, source.replace(/^~[\\/]+/, ''));
    }
    return path_1.default.resolve(source);
}
exports.default = resolvePathFromHome;
