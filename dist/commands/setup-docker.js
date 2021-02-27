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
        .command('setup-docker')
        .description('Setup docker inside remote server')
        .requiredOption(`-t, --host <${constants_1.EXAMPLE_HOST}>`, constants_1.OPTION_DESCRIPTION_HOST)
        .requiredOption(`-u, --root-user <${constants_1.DEFAULT_USER_ROOT}>`, constants_1.OPTION_DESCRIPTION_ROOT_USER, constants_1.DEFAULT_USER_ROOT)
        .requiredOption(`-k, --root-key <${constants_1.DEFAULT_PATH_KEY}>`, constants_1.OPTION_DESCRIPTION_ROOT_KEY, constants_1.DEFAULT_PATH_KEY)
        .option('--with-crontab-prune', constants_1.OPTION_DESCRIPTION_WITH_CRONTAB_PRUNE, true)
        .option('--crontab-prune-command <path>', constants_1.OPTION_DESCRIPTION_CRONTAB_PRUNE_COMMAND, '/usr/bin/docker system prune --all --force')
        .option('--with-docker-group', constants_1.OPTION_DESCRIPTION_WITH_DOCKER_GROUP, true)
        .option('--docker-group-user <user>', constants_1.OPTION_DESCRIPTION_DOCKER_GROUP_USER, constants_1.DEFAULT_USER_TARGET)
        .option('--with-default-container', constants_1.OPTION_DESCRIPTION_WITH_DEFAULT_CONTAINER, true)
        .option('--default-container-name <name>', constants_1.OPTION_DESCRIPTION_DEFAULT_CONTAINER_NAME, 'nginx-demo')
        .option('--default-container-image <image>', constants_1.OPTION_DESCRIPTION_DEFAULT_CONTAINER_IMAGE, 'nginxdemos/hello')
        .action((cmd) => __awaiter(this, void 0, void 0, function* () {
        displayCommandGreetings_1.default(cmd);
        const { host, rootUser, rootKey, withCrontabPrune, crontabPruneCommand, withDockerGroup, dockerGroupUser, withDefaultContainer, defaultContainerName, defaultContainerImage, } = cmd;
        const rootKeyPair = resolveKeysPair_1.default(rootKey);
        // create ansible playbook from the template
        const pathToRuntimePlaybook = path_1.default.resolve(constants_1.PATH_TO_RUNTIME, 'docker.playbook.yml');
        createFileFromTemplate_1.default(constants_1.PATH_TO_PLAYBOOK_SETUP_DOCKER, pathToRuntimePlaybook, {
            CRONTAB_PRUNE_ENABLE: withCrontabPrune ? 'yes' : 'no',
            CRONTAB_PRUNE_COMMAND: crontabPruneCommand,
            DOCKER_GROUP_ENABLE: withDockerGroup ? 'yes' : 'no',
            DOCKER_GROUP_USER: dockerGroupUser,
            DEFAULT_CONTAINER_ENABLE: withDefaultContainer ? 'yes' : 'no',
            DEFAULT_CONTAINER_NAME: defaultContainerName,
            DEFAULT_CONTAINER_IMAGE: defaultContainerImage,
        });
        // execute ansible playbook to setup ubuntu
        execSyncProgressDisplay_1.default(createPlaybookCommand_1.default(host, rootUser, rootKeyPair.private, pathToRuntimePlaybook));
        displayCommandDone_1.default(cmd);
    }));
}
exports.default = setup;
;
