#!/usr/bin/env node
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const commander_1 = __importDefault(require("commander"));
const colors_1 = __importDefault(require("colors"));
const setup_1 = __importDefault(require("./commands/setup"));
const setup_docker_1 = __importDefault(require("./commands/setup-docker"));
const setup_key_1 = __importDefault(require("./commands/setup-key"));
const setup_nginx_1 = __importDefault(require("./commands/setup-nginx"));
const setup_ubuntu_1 = __importDefault(require("./commands/setup-ubuntu"));
const constants_1 = require("./constants");
const Package_1 = __importDefault(require("./models/Package"));
const pathToPackage = path.resolve(constants_1.PATH_TO_ROOT, 'package.json');
const that = new Package_1.default({ path: pathToPackage });
// display description
commander_1.default
    .version(that.version)
    .description('Tool to setup clean ubuntu 18.04 initially with docker and nginx under the hood via ansible playbooks');
// bind commands
setup_1.default(commander_1.default);
setup_docker_1.default(commander_1.default);
setup_key_1.default(commander_1.default);
setup_nginx_1.default(commander_1.default);
setup_ubuntu_1.default(commander_1.default);
// override exit
commander_1.default.exitOverride();
// listen to promises rejection
process.on('uncaughtException', processError);
process.on('unhandledRejection', processError);
// parse and run command
commander_1.default.parse(process.argv);
// display help command
if (!process.argv.slice(2).length) {
    commander_1.default.help();
}
function processError(error) {
    console.log(colors_1.default.red.bold(error.toString()));
    console.log(error);
    process.exit(1);
}
