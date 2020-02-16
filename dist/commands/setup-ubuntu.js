"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const displayCommandGreetings_1 = __importDefault(require("./../helpers/displayCommandGreetings"));
const displayCommandDone_1 = __importDefault(require("../helpers/displayCommandDone"));
const execSyncProgressDisplay_1 = __importDefault(require("../helpers/execSyncProgressDisplay"));
const createFileFromTemplate_1 = __importDefault(require("../helpers/createFileFromTemplate"));
const constants_1 = require("../constants");
const path = __importStar(require("path"));
const resolveKeysPair_1 = __importDefault(require("../helpers/resolveKeysPair"));
function setup(program) {
    program
        .command('setup-ubuntu')
        .description('Initial setup for remote ubuntu server')
        .requiredOption(`-t, --host <${constants_1.EXAMPLE_HOST}>`, constants_1.OPTION_DESCRIPTION_HOST)
        .requiredOption(`-u, --root-user <${constants_1.DEFAULT_USER_ROOT}>`, constants_1.OPTION_DESCRIPTION_ROOT_USER, constants_1.DEFAULT_USER_ROOT)
        .requiredOption(`-k, --root-key <${constants_1.DEFAULT_PATH_KEY}>`, constants_1.OPTION_DESCRIPTION_ROOT_KEY, constants_1.DEFAULT_PATH_KEY)
        .requiredOption(`-U, --target-user <${constants_1.DEFAULT_USER_TARGET}>`, constants_1.OPTION_DESCRIPTION_TARGET_USER, constants_1.DEFAULT_USER_TARGET)
        .requiredOption(`-K, --target-key <${constants_1.DEFAULT_PATH_KEY}>`, constants_1.OPTION_DESCRIPTION_TARGET_KEY, constants_1.DEFAULT_PATH_KEY)
        .action(async (cmd) => {
        displayCommandGreetings_1.default(cmd);
        const { host, rootUser, rootKey, targetUser, targetKey } = cmd;
        const rootKeyPair = resolveKeysPair_1.default(rootKey);
        const targetKeyPair = resolveKeysPair_1.default(targetKey);
        // create ansible playbook from the template
        const pathToRuntimePlaybook = path.resolve(constants_1.PATH_TO_RUNTIME, 'ubuntu.playbook.yml');
        createFileFromTemplate_1.default(constants_1.PATH_TO_PLAYBOOK_SETUP_UBUNTU, pathToRuntimePlaybook, {
            CREATE_USER: targetUser,
            PUBLIC_KEY: targetKeyPair.public,
        });
        // execute ansible playbook to setup ubuntu
        execSyncProgressDisplay_1.default('ansible-playbook', {
            inventory: `${host},`,
            user: rootUser,
            'private-key': rootKeyPair.private,
        }, pathToRuntimePlaybook);
        displayCommandDone_1.default(cmd);
    });
}
exports.default = setup;
;
