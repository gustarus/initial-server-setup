import * as path from 'path';
import resolvePackagePath from './helpers/resolvePackagePath';

export const PATH_TO_ROOT = resolvePackagePath(__dirname);
export const PATH_TO_PACKAGE = path.resolve(PATH_TO_ROOT, 'package.json');
export const PATH_TO_RUNTIME = path.resolve(PATH_TO_ROOT, 'runtime');

export const PATH_TO_PLAYBOOKS = path.resolve(PATH_TO_ROOT, 'playbooks');
export const PATH_TO_PLAYBOOK_SETUP_DOCKER = path.resolve(PATH_TO_PLAYBOOKS, 'setup-docker', 'playbook.yml');
export const PATH_TO_PLAYBOOK_SETUP_NGINX = path.resolve(PATH_TO_PLAYBOOKS, 'setup-nginx', 'playbook.yml');
export const PATH_TO_PLAYBOOK_SETUP_UBUNTU = path.resolve(PATH_TO_PLAYBOOKS, 'setup-ubuntu', 'playbook.yml');

export const PATH_TO_TEMPLATES = path.resolve(PATH_TO_ROOT, 'templates');
export const PATH_TO_TEMPLATE_NGINX_CONFIG = path.resolve(PATH_TO_TEMPLATES, 'nginx.conf');
export const PATH_TO_TEMPLATE_NGINX_DEFAULT = path.resolve(PATH_TO_TEMPLATES, 'default.conf');

export const EXAMPLE_HOST = '192.168.1.1';

export const DEFAULT_USER_ROOT = 'root';
export const DEFAULT_USER_TARGET = 'default';
export const DEFAULT_PATH_KEY = '~/.ssh/id_rsa.pub';

export const OPTION_DESCRIPTION_HOST = 'Remote server `ip` or `domain`';
export const OPTION_DESCRIPTION_ROOT_USER = 'Remote `sudo` user to login into clean server';
export const OPTION_DESCRIPTION_ROOT_KEY = 'Remote `sudo` user key to install inside remote server';
export const OPTION_DESCRIPTION_TARGET_USER = 'Remote `admin` user to create with `sudo` privileges';
export const OPTION_DESCRIPTION_TARGET_KEY = 'Remote `admin` user key to install inside remote server';
