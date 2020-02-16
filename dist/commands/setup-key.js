"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const displayCommandGreetings_1 = __importDefault(require("./../helpers/displayCommandGreetings"));
const displayCommandDone_1 = __importDefault(require("../helpers/displayCommandDone"));
const execSyncProgressDisplay_1 = __importDefault(require("../helpers/execSyncProgressDisplay"));
const constants_1 = require("../constants");
const resolveKeysPair_1 = __importDefault(require("../helpers/resolveKeysPair"));
function setup(program) {
    program
        .command('setup-key')
        .description('Install public key inside remote server')
        .requiredOption(`-t, --host <${constants_1.EXAMPLE_HOST}>`, constants_1.OPTION_DESCRIPTION_HOST)
        .requiredOption(`-u, --root-user <${constants_1.DEFAULT_USER_ROOT}>`, constants_1.OPTION_DESCRIPTION_ROOT_USER, constants_1.DEFAULT_USER_ROOT)
        .requiredOption(`-k, --root-key <${constants_1.DEFAULT_PATH_KEY}>`, constants_1.OPTION_DESCRIPTION_ROOT_KEY, constants_1.DEFAULT_PATH_KEY)
        .action(async (cmd) => {
        displayCommandGreetings_1.default(cmd);
        const { host, rootUser, rootKey } = cmd;
        const rootKeyPair = resolveKeysPair_1.default(rootKey);
        // ssh-copy-id key to the target key
        execSyncProgressDisplay_1.default('ssh-copy-id', { i: rootKeyPair.public }, `${rootUser}@${host}`);
        displayCommandDone_1.default(cmd);
    });
}
exports.default = setup;
;
