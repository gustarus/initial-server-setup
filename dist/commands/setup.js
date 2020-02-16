"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const displayCommandGreetings_1 = __importDefault(require("./../helpers/displayCommandGreetings"));
const displayCommandDone_1 = __importDefault(require("../helpers/displayCommandDone"));
const resolveExecutable_1 = __importDefault(require("../helpers/resolveExecutable"));
const execSyncProgressDisplay_1 = __importDefault(require("../helpers/execSyncProgressDisplay"));
const constants_1 = require("../constants");
const displayCommandStep_1 = __importDefault(require("../helpers/displayCommandStep"));
function setup(program) {
    program
        .command('setup')
        .description('Setup target remote server from the template')
        .requiredOption(`-t, --host <${constants_1.EXAMPLE_HOST}>`, constants_1.OPTION_DESCRIPTION_HOST)
        .requiredOption(`-u, --root-user <${constants_1.DEFAULT_USER_ROOT}>`, constants_1.OPTION_DESCRIPTION_ROOT_USER, constants_1.DEFAULT_USER_ROOT)
        .requiredOption(`-k, --root-key <${constants_1.DEFAULT_PATH_KEY}>`, constants_1.OPTION_DESCRIPTION_ROOT_KEY, constants_1.DEFAULT_PATH_KEY)
        .requiredOption(`-U, --target-user <${constants_1.DEFAULT_USER_TARGET}>`, constants_1.OPTION_DESCRIPTION_TARGET_USER, constants_1.DEFAULT_USER_TARGET)
        .requiredOption(`-K, --target-key <${constants_1.DEFAULT_PATH_KEY}>`, constants_1.OPTION_DESCRIPTION_TARGET_KEY, constants_1.DEFAULT_PATH_KEY)
        .action(async (cmd) => {
        displayCommandGreetings_1.default(cmd);
        const { host, rootUser, rootKey, targetUser, targetKey } = cmd;
        const exec = resolveExecutable_1.default();
        // install root key on the remote server
        execSyncProgressDisplay_1.default(exec, 'setup-key', {
            host,
            'root-user': rootUser,
            'root-key': rootKey,
        });
        // setup ubuntu initially
        execSyncProgressDisplay_1.default(exec, 'setup-ubuntu', {
            host,
            'root-user': rootUser,
            'root-key': rootKey,
            'target-user': targetUser,
            'target-key': targetKey,
        });
        // setup docker with demo nginx container
        execSyncProgressDisplay_1.default(exec, 'setup-docker', {
            host,
            'root-user': rootUser,
            'root-key': rootKey,
            'target-user': targetUser,
        });
        // setup nginx with demo site served from docker
        execSyncProgressDisplay_1.default(exec, 'setup-nginx', {
            host,
            'root-user': rootUser,
            'root-key': rootKey,
        });
        displayCommandStep_1.default(cmd, colors_1.default.green.bold(`The setup has been completed: try to open '${host}:8000' in your browser`));
        displayCommandDone_1.default(cmd);
    });
}
exports.default = setup;
;
