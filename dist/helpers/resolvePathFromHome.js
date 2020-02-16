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
function resolvePathFromHome(source) {
    if (source[0] === '~') {
        if (!process.env.HOME) {
            throw new Error('Unable to resolve path to home');
        }
        return path.resolve(process.env.HOME, source.slice(1));
    }
    return path.resolve(source);
}
exports.default = resolvePathFromHome;
