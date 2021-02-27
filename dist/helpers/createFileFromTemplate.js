"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
function createFileFromTemplate(pathToTemplate, pathToTarget, variables = {}) {
    const pathToTargetDirectory = path_1.default.dirname(pathToTarget);
    // check for the directory
    if (!fs_extra_1.default.existsSync(pathToTemplate)) {
        throw new Error(`Unable to find template file '${pathToTemplate}'`);
    }
    // replace variables in the source template file
    let source = fs_extra_1.default.readFileSync(pathToTemplate).toString();
    for (const name in variables) {
        const expression = new RegExp(`\\$\{${name}\}`, 'ig');
        source = source.replace(expression, variables[name]);
    }
    // create target file
    fs_extra_1.default.mkdirSync(pathToTargetDirectory, { recursive: true });
    fs_extra_1.default.writeFileSync(pathToTarget, source);
}
exports.default = createFileFromTemplate;
;
