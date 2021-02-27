"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const resolvePackagePath_1 = __importDefault(require("./helpers/resolvePackagePath"));
exports.PATH_TO_ROOT = resolvePackagePath_1.default(__dirname);
exports.PATH_TO_PACKAGE = path_1.default.resolve(exports.PATH_TO_ROOT, 'package.json');
exports.PATH_TO_RUNTIME = path_1.default.resolve(exports.PATH_TO_ROOT, 'runtime');
exports.PATH_TO_PLAYBOOKS = path_1.default.resolve(exports.PATH_TO_ROOT, 'playbooks');
exports.PATH_TO_PLAYBOOK_SETUP_CERTBOT = path_1.default.resolve(exports.PATH_TO_PLAYBOOKS, 'setup-certbot', 'playbook.yml');
exports.PATH_TO_PLAYBOOK_SETUP_DOCKER = path_1.default.resolve(exports.PATH_TO_PLAYBOOKS, 'setup-docker', 'playbook.yml');
exports.PATH_TO_PLAYBOOK_SETUP_NGINX = path_1.default.resolve(exports.PATH_TO_PLAYBOOKS, 'setup-nginx', 'playbook.yml');
exports.PATH_TO_PLAYBOOK_SETUP_UBUNTU = path_1.default.resolve(exports.PATH_TO_PLAYBOOKS, 'setup-ubuntu', 'playbook.yml');
exports.PATH_TO_TEMPLATES = path_1.default.resolve(exports.PATH_TO_ROOT, 'templates');
exports.PATH_TO_TEMPLATE_NGINX_CONFIG = path_1.default.resolve(exports.PATH_TO_TEMPLATES, 'nginx.conf');
exports.PATH_TO_TEMPLATE_NGINX_DEFAULT = path_1.default.resolve(exports.PATH_TO_TEMPLATES, 'default.conf');
exports.EXAMPLE_HOST = '192.168.1.1';
exports.DEFAULT_USER_ROOT = 'root';
exports.DEFAULT_USER_TARGET = 'default';
exports.DEFAULT_PATH_KEY = '~/.ssh/id_rsa.pub';
exports.OPTION_DESCRIPTION_HOST = 'Remote server `ip` or `domain`';
exports.OPTION_DESCRIPTION_ROOT_USER = 'Remote `sudo` user to login into clean server';
exports.OPTION_DESCRIPTION_ROOT_KEY = 'Remote `sudo` user key to install inside remote server';
exports.OPTION_DESCRIPTION_TARGET_USER = 'Remote `admin` user to create with `sudo` privileges';
exports.OPTION_DESCRIPTION_TARGET_KEY = 'Remote `admin` user key to install inside remote server';
exports.OPTION_DESCRIPTION_WITH_CRONTAB_PRUNE = 'Enable docker system prune with `--all` via crontab';
exports.OPTION_DESCRIPTION_CRONTAB_PRUNE_COMMAND = 'Command to run on every night to prune docker containers';
exports.OPTION_DESCRIPTION_WITH_DOCKER_GROUP = 'Add user to docker group to manage containers';
exports.OPTION_DESCRIPTION_DOCKER_GROUP_USER = 'User to add into docker group';
exports.OPTION_DESCRIPTION_WITH_DEFAULT_CONTAINER = 'Run default container to demonstrate the tool';
exports.OPTION_DESCRIPTION_DEFAULT_CONTAINER_NAME = 'Default container name to run with docker';
exports.OPTION_DESCRIPTION_DEFAULT_CONTAINER_IMAGE = 'Default container image to run with docker';
