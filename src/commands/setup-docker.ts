import { Command } from 'commander';
import displayCommandGreetings from './../helpers/displayCommandGreetings';
import displayCommandDone from '../helpers/displayCommandDone';
import execSyncProgressDisplay from '../helpers/execSyncProgressDisplay';
import createFileFromTemplate from '../helpers/createFileFromTemplate';
import {
  DEFAULT_PATH_KEY,
  DEFAULT_USER_ROOT,
  DEFAULT_USER_TARGET,
  EXAMPLE_HOST,
  OPTION_DESCRIPTION_CRONTAB_PRUNE_COMMAND, OPTION_DESCRIPTION_DEFAULT_CONTAINER_IMAGE,
  OPTION_DESCRIPTION_DEFAULT_CONTAINER_NAME,
  OPTION_DESCRIPTION_DOCKER_GROUP_USER,
  OPTION_DESCRIPTION_HOST,
  OPTION_DESCRIPTION_ROOT_KEY,
  OPTION_DESCRIPTION_ROOT_USER,
  OPTION_DESCRIPTION_WITH_CRONTAB_PRUNE,
  OPTION_DESCRIPTION_WITH_DEFAULT_CONTAINER,
  OPTION_DESCRIPTION_WITH_DOCKER_GROUP,
  PATH_TO_PLAYBOOK_SETUP_DOCKER,
  PATH_TO_RUNTIME
} from '../constants';
import * as path from 'path';
import resolveKeysPair from '../helpers/resolveKeysPair';
import createPlaybookCommand from '../helpers/createPlaybookCommand';

export default function setup(program: Command) {
  program
    .command('setup-docker')
    .description('Setup docker inside remote server')
    .requiredOption(`-t, --host <${EXAMPLE_HOST}>`, OPTION_DESCRIPTION_HOST)
    .requiredOption(`-u, --root-user <${DEFAULT_USER_ROOT}>`, OPTION_DESCRIPTION_ROOT_USER, DEFAULT_USER_ROOT)
    .requiredOption(`-k, --root-key <${DEFAULT_PATH_KEY}>`, OPTION_DESCRIPTION_ROOT_KEY, DEFAULT_PATH_KEY)
    .option('--with-crontab-prune', OPTION_DESCRIPTION_WITH_CRONTAB_PRUNE, true)
    .option('--crontab-prune-command <path>', OPTION_DESCRIPTION_CRONTAB_PRUNE_COMMAND, '/usr/bin/docker system prune --all --force')
    .option('--with-docker-group', OPTION_DESCRIPTION_WITH_DOCKER_GROUP, true)
    .option('--docker-group-user <user>', OPTION_DESCRIPTION_DOCKER_GROUP_USER, DEFAULT_USER_TARGET)
    .option('--with-default-container', OPTION_DESCRIPTION_WITH_DEFAULT_CONTAINER, true)
    .option('--default-container-name <name>', OPTION_DESCRIPTION_DEFAULT_CONTAINER_NAME, 'nginx-demo')
    .option('--default-container-image <image>', OPTION_DESCRIPTION_DEFAULT_CONTAINER_IMAGE, 'nginxdemos/hello')
    .action(async (cmd) => {
      displayCommandGreetings(cmd);
      const {
        host,
        rootUser,
        rootKey,
        withCrontabPrune,
        crontabPruneCommand,
        withDockerGroup,
        dockerGroupUser,
        withDefaultContainer,
        defaultContainerName,
        defaultContainerImage
      } = cmd;
      const rootKeyPair = resolveKeysPair(rootKey);

      // create ansible playbook from the template
      const pathToRuntimePlaybook = path.resolve(PATH_TO_RUNTIME, 'docker.playbook.yml');
      createFileFromTemplate(PATH_TO_PLAYBOOK_SETUP_DOCKER, pathToRuntimePlaybook, {
        CRONTAB_PRUNE_ENABLE: withCrontabPrune ? 'yes' : 'no',
        CRONTAB_PRUNE_COMMAND: crontabPruneCommand,

        DOCKER_GROUP_ENABLE: withDockerGroup ? 'yes' : 'no',
        DOCKER_GROUP_USER: dockerGroupUser,

        DEFAULT_CONTAINER_ENABLE: withDefaultContainer ? 'yes' : 'no',
        DEFAULT_CONTAINER_NAME: defaultContainerName,
        DEFAULT_CONTAINER_IMAGE: defaultContainerImage
      });

      // execute ansible playbook to setup ubuntu
      execSyncProgressDisplay(createPlaybookCommand(host, rootUser, rootKeyPair.private, pathToRuntimePlaybook));

      displayCommandDone(cmd);
    });
};
