"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = __importDefault(require("../base/Base"));
const getOptionsString_1 = __importDefault(require("../helpers/getOptionsString"));
class Command extends Base_1.default {
    get defaults() {
        return { parts: [], wrap: false };
    }
    compile(runtimeConfig = { wrap: false }) {
        const prepared = this.config.parts.map((part) => {
            if (part instanceof Command) {
                // compile child command
                const child = part.compile({ ...runtimeConfig, wrap: true });
                if (runtimeConfig.wrap) {
                    // wrap child command with quotes and add slashes
                    return `'${child.replace('\'', '\\\'')}'`;
                }
                return child;
            }
            else if (typeof part === 'object') {
                return getOptionsString_1.default(part);
            }
            return part;
        });
        return prepared.filter((value) => value).join(' ');
    }
}
exports.default = Command;
;
