"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Package_1 = __importDefault(require("../models/Package"));
const constants_1 = require("../constants");
let pathToExecutable;
function resolveExecutable() {
    if (!pathToExecutable) {
        const info = new Package_1.default({ path: constants_1.PATH_TO_PACKAGE });
        const name = info.data.name;
        if (!name) {
            throw new Error(`Unable to resolve package name: there is no name property in the '${constants_1.PATH_TO_PACKAGE}'`);
        }
        const bin = info.data.bin[name];
        if (!bin) {
            throw new Error(`Unable to resolve package bin script: there is no 'bin.${name}' property in the '${constants_1.PATH_TO_PACKAGE}'`);
        }
        pathToExecutable = path_1.default.resolve(constants_1.PATH_TO_ROOT, bin);
        if (!fs_1.default.existsSync(pathToExecutable)) {
            throw new Error(`There is no executable file: looking for '${pathToExecutable}'`);
        }
    }
    return `node ${pathToExecutable}`;
}
exports.default = resolveExecutable;
