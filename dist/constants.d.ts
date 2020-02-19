export declare const PATH_TO_ROOT: string;
export declare const PATH_TO_PACKAGE: string;
export declare const PATH_TO_RUNTIME: string;
export declare const PATH_TO_PLAYBOOKS: string;
export declare const PATH_TO_PLAYBOOK_SETUP_DOCKER: string;
export declare const PATH_TO_PLAYBOOK_SETUP_NGINX: string;
export declare const PATH_TO_PLAYBOOK_SETUP_UBUNTU: string;
export declare const PATH_TO_TEMPLATES: string;
export declare const PATH_TO_TEMPLATE_NGINX_CONFIG: string;
export declare const PATH_TO_TEMPLATE_NGINX_DEFAULT: string;
export declare const EXAMPLE_HOST = "192.168.1.1";
export declare const DEFAULT_USER_ROOT = "root";
export declare const DEFAULT_USER_TARGET = "default";
export declare const DEFAULT_PATH_KEY = "~/.ssh/id_rsa.pub";
export declare const OPTION_DESCRIPTION_HOST = "Remote server `ip` or `domain`";
export declare const OPTION_DESCRIPTION_ROOT_USER = "Remote `sudo` user to login into clean server";
export declare const OPTION_DESCRIPTION_ROOT_KEY = "Remote `sudo` user key to install inside remote server";
export declare const OPTION_DESCRIPTION_TARGET_USER = "Remote `admin` user to create with `sudo` privileges";
export declare const OPTION_DESCRIPTION_TARGET_KEY = "Remote `admin` user key to install inside remote server";
export declare const OPTION_DESCRIPTION_WITH_CRONTAB_PRUNE = "Enable docker system prune with `--all` via crontab";
export declare const OPTION_DESCRIPTION_CRONTAB_PRUNE_COMMAND = "Command to run on every night to prune docker containers";
export declare const OPTION_DESCRIPTION_WITH_DOCKER_GROUP = "Add user to docker group to manage containers";
export declare const OPTION_DESCRIPTION_DOCKER_GROUP_USER = "User to add into docker group";
export declare const OPTION_DESCRIPTION_WITH_DEFAULT_CONTAINER = "Run default container to demonstrate the tool";
export declare const OPTION_DESCRIPTION_DEFAULT_CONTAINER_NAME = "Default container name to run with docker";
export declare const OPTION_DESCRIPTION_DEFAULT_CONTAINER_IMAGE = "Default container image to run with docker";
