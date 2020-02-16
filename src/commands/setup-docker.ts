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
  OPTION_DESCRIPTION_HOST,
  OPTION_DESCRIPTION_ROOT_KEY,
  OPTION_DESCRIPTION_ROOT_USER,
  OPTION_DESCRIPTION_TARGET_KEY,
  OPTION_DESCRIPTION_TARGET_USER,
  PATH_TO_PLAYBOOK_SETUP_DOCKER,
  PATH_TO_RUNTIME,
} from '../constants';
import * as path from 'path';
import resolveKeysPair from '../helpers/resolveKeysPair';

export default function setup(program: Command) {
  program
    .command('setup-docker')
    .description('Setup docker inside remote server')
    .requiredOption(`-t, --host <${EXAMPLE_HOST}>`, OPTION_DESCRIPTION_HOST)
    .requiredOption(`-u, --root-user <${DEFAULT_USER_ROOT}>`, OPTION_DESCRIPTION_ROOT_USER, DEFAULT_USER_ROOT)
    .requiredOption(`-k, --root-key <${DEFAULT_PATH_KEY}>`, OPTION_DESCRIPTION_ROOT_KEY, DEFAULT_PATH_KEY)
    .requiredOption(`-U, --target-user <${DEFAULT_USER_TARGET}>`, OPTION_DESCRIPTION_TARGET_USER, DEFAULT_USER_TARGET)
    .action(async (cmd) => {
      displayCommandGreetings(cmd);
      const { host, rootUser, rootKey, targetUser } = cmd;
      const rootKeyPair = resolveKeysPair(rootKey);

      // create ansible playbook from the template
      const pathToRuntimePlaybook = path.resolve(PATH_TO_RUNTIME, 'docker.playbook.yml');
      createFileFromTemplate(PATH_TO_PLAYBOOK_SETUP_DOCKER, pathToRuntimePlaybook, {
        USER: targetUser,
      });

      // execute ansible playbook to setup ubuntu
      execSyncProgressDisplay('ansible-playbook', {
        inventory: `${host},`,
        user: rootUser,
        'private-key': rootKeyPair.private,
      }, pathToRuntimePlaybook);

      displayCommandDone(cmd);
    });
};
