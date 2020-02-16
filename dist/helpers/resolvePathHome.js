"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
function resolvePathHome(...parts) {
    if (parts[0] === '~') {
        const [home, ...rest] = parts;
        return path.resolve(process.env.HOME, ...rest);
    }
    return path.resolve(...parts);
}
exports.default = resolvePathHome;
