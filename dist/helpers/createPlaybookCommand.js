"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../models/Command"));
const formatter_1 = __importDefault(require("../instances/formatter"));
function createPlaybookCommand(host, user, key, path) {
    const parts = [
        'ansible-playbook',
        { inventory: `${host},` },
        { user },
        { 'private-key': key },
        path,
        { e: '"ansible_python_interpreter=/usr/bin/python3"' }
    ];
    return new Command_1.default({ formatter: formatter_1.default, parts });
}
exports.default = createPlaybookCommand;
