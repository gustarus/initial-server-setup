"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const displayCommandGreetings_1 = __importDefault(require("./../helpers/displayCommandGreetings"));
const displayCommandDone_1 = __importDefault(require("../helpers/displayCommandDone"));
const execSyncProgressDisplay_1 = __importDefault(require("../helpers/execSyncProgressDisplay"));
const createFileFromTemplate_1 = __importDefault(require("../helpers/createFileFromTemplate"));
const constants_1 = require("../constants");
const path_1 = __importDefault(require("path"));
const resolveKeysPair_1 = __importDefault(require("../helpers/resolveKeysPair"));
const createPlaybookCommand_1 = __importDefault(require("../helpers/createPlaybookCommand"));
function setup(program) {
    program
        .command('setup-ubuntu')
        .description('Initial setup for remote ubuntu server')
        .requiredOption(`-t, --host <${constants_1.EXAMPLE_HOST}>`, constants_1.OPTION_DESCRIPTION_HOST)
        .requiredOption(`-u, --root-user <${constants_1.DEFAULT_USER_ROOT}>`, constants_1.OPTION_DESCRIPTION_ROOT_USER, constants_1.DEFAULT_USER_ROOT)
        .requiredOption(`-k, --root-key <${constants_1.DEFAULT_PATH_KEY}>`, constants_1.OPTION_DESCRIPTION_ROOT_KEY, constants_1.DEFAULT_PATH_KEY)
        .requiredOption(`-U, --target-user <${constants_1.DEFAULT_USER_TARGET}>`, constants_1.OPTION_DESCRIPTION_TARGET_USER, constants_1.DEFAULT_USER_TARGET)
        .requiredOption(`-K, --target-key <${constants_1.DEFAULT_PATH_KEY}>`, constants_1.OPTION_DESCRIPTION_TARGET_KEY, constants_1.DEFAULT_PATH_KEY)
        .action((cmd) => __awaiter(this, void 0, void 0, function* () {
        displayCommandGreetings_1.default(cmd);
        const { host, rootUser, rootKey, targetUser, targetKey } = cmd;
        const rootKeyPair = resolveKeysPair_1.default(rootKey);
        const targetKeyPair = resolveKeysPair_1.default(targetKey);
        // create ansible playbook from the template
        const pathToRuntimePlaybook = path_1.default.resolve(constants_1.PATH_TO_RUNTIME, 'ubuntu.playbook.yml');
        createFileFromTemplate_1.default(constants_1.PATH_TO_PLAYBOOK_SETUP_UBUNTU, pathToRuntimePlaybook, {
            CREATE_USER: targetUser,
            PUBLIC_KEY: targetKeyPair.public,
        });
        // execute ansible playbook to setup ubuntu
        execSyncProgressDisplay_1.default(createPlaybookCommand_1.default(host, rootUser, rootKeyPair.private, pathToRuntimePlaybook));
        displayCommandDone_1.default(cmd);
    }));
}
exports.default = setup;
;
