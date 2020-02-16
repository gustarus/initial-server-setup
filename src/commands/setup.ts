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
  OPTION_DESCRIPTION_HOST,
  OPTION_DESCRIPTION_ROOT_KEY,
  OPTION_DESCRIPTION_ROOT_USER,
  OPTION_DESCRIPTION_TARGET_KEY,
  OPTION_DESCRIPTION_TARGET_USER,
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
    .action(async (cmd) => {
      displayCommandGreetings(cmd);
      const { host, rootUser, rootKey, targetUser, targetKey } = cmd;

      const exec = resolveExecutable();

      // install root key on the remote server
      execSyncProgressDisplay(exec, 'setup-key', { host, user: rootUser, key: rootKey });

      // setup ubuntu initially
      execSyncProgressDisplay(exec, 'setup-ubuntu', {
        host,
        'root-user': rootUser,
        'root-key': rootKey,
        'target-user': targetUser,
        'target-key': targetKey,
      });

      // setup docker with demo nginx container
      execSyncProgressDisplay(exec, 'setup-docker', { host, user: rootUser, key: rootKey });

      // setup nginx with demo site served from docker
      execSyncProgressDisplay(exec, 'setup-nginx', { host, user: rootUser, key: rootKey });

      displayCommandStep(cmd, colors.green.bold(`The setup has been completed: try to open '${host}:8000' in your browser`));
      displayCommandDone(cmd);
    });
};
