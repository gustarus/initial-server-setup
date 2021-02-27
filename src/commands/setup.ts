import colors from 'colors';
import { Command } from 'commander';
import displayCommandGreetings from './../helpers/displayCommandGreetings';
import displayCommandDone from '../helpers/displayCommandDone';
import resolveExecutable from '../helpers/resolveExecutable';
import execSyncProgressDisplay from '../helpers/execSyncProgressDisplay';
import {
  DEFAULT_PATH_KEY,
  DEFAULT_USER_ROOT,
  DEFAULT_USER_TARGET,
  EXAMPLE_HOST,
  OPTION_DESCRIPTION_CRONTAB_PRUNE_COMMAND,
  OPTION_DESCRIPTION_DEFAULT_CONTAINER_IMAGE,
  OPTION_DESCRIPTION_DEFAULT_CONTAINER_NAME,
  OPTION_DESCRIPTION_DOCKER_GROUP_USER,
  OPTION_DESCRIPTION_HOST,
  OPTION_DESCRIPTION_ROOT_KEY,
  OPTION_DESCRIPTION_ROOT_USER,
  OPTION_DESCRIPTION_TARGET_KEY,
  OPTION_DESCRIPTION_TARGET_USER,
  OPTION_DESCRIPTION_WITH_CRONTAB_PRUNE,
  OPTION_DESCRIPTION_WITH_DEFAULT_CONTAINER,
  OPTION_DESCRIPTION_WITH_DOCKER_GROUP,
} from '../constants';
import displayCommandStep from '../helpers/displayCommandStep';

export default function setup(program: Command) {
  program
    .command('setup')
    .description('Setup target remote server from the template')
    .requiredOption(`-t, --host <${EXAMPLE_HOST}>`, OPTION_DESCRIPTION_HOST)
    .requiredOption(`-u, --root-user <${DEFAULT_USER_ROOT}>`, OPTION_DESCRIPTION_ROOT_USER, DEFAULT_USER_ROOT)
    .requiredOption(`-k, --root-key <${DEFAULT_PATH_KEY}>`, OPTION_DESCRIPTION_ROOT_KEY, DEFAULT_PATH_KEY)
    .requiredOption(`-U, --target-user <${DEFAULT_USER_TARGET}>`, OPTION_DESCRIPTION_TARGET_USER, DEFAULT_USER_TARGET)
    .requiredOption(`-K, --target-key <${DEFAULT_PATH_KEY}>`, OPTION_DESCRIPTION_TARGET_KEY, DEFAULT_PATH_KEY)
    .option('--with-crontab-prune', OPTION_DESCRIPTION_WITH_CRONTAB_PRUNE)
    .option('--crontab-prune-command <path>', OPTION_DESCRIPTION_CRONTAB_PRUNE_COMMAND)
    .option('--with-docker-group', OPTION_DESCRIPTION_WITH_DOCKER_GROUP)
    .option('--docker-group-user <user>', OPTION_DESCRIPTION_DOCKER_GROUP_USER)
    .option('--with-default-container', OPTION_DESCRIPTION_WITH_DEFAULT_CONTAINER)
    .option('--default-container-name <name>', OPTION_DESCRIPTION_DEFAULT_CONTAINER_NAME)
    .option('--default-container-image <image>', OPTION_DESCRIPTION_DEFAULT_CONTAINER_IMAGE)
    .action(async(cmd: Command) => {
      displayCommandGreetings(cmd);
      const {
        host,
        rootUser,
        rootKey,
        targetUser,
        targetKey,
      } = cmd;

      const exec = resolveExecutable();


      // install root key on the remote server
      execSyncProgressDisplay(exec, 'setup-key', {
        host,
        'root-user': rootUser,
        'root-key': rootKey,
      });


      // setup ubuntu initially
      execSyncProgressDisplay(exec, 'setup-ubuntu', {
        host,
        'root-user': rootUser,
        'root-key': rootKey,
        'target-user': targetUser,
        'target-key': targetKey,
      });


      // setup docker with demo nginx container
      const {
        withCrontabPrune,
        crontabPruneCommand,
        withDockerGroup,
        dockerGroupUser,
        withDefaultContainer,
        defaultContainerName,
        defaultContainerImage,
      } = cmd;

      execSyncProgressDisplay(exec, 'setup-docker', {
        host,
        rootUser,
        rootKey,
        withCrontabPrune,
        crontabPruneCommand,
        withDockerGroup,
        dockerGroupUser: dockerGroupUser || targetUser,
        withDefaultContainer,
        defaultContainerName,
        defaultContainerImage,
      });


      // setup nginx with demo site served from docker
      execSyncProgressDisplay(exec, 'setup-nginx', {
        host,
        'root-user': rootUser,
        'root-key': rootKey,
      });


      // install certbot tool to manage certificates
      execSyncProgressDisplay(exec, 'setup-certbot', {
        host,
        'root-user': rootUser,
        'root-key': rootKey,
      });


      displayCommandStep(cmd, colors.green.bold(`The setup has been completed: try to open '${host}:8000' in your browser`));
      displayCommandDone(cmd);
    });
};
