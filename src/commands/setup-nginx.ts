import { Command } from 'commander';
import displayCommandGreetings from './../helpers/displayCommandGreetings';
import displayCommandDone from '../helpers/displayCommandDone';
import execSyncProgressDisplay from '../helpers/execSyncProgressDisplay';
import createFileFromTemplate from '../helpers/createFileFromTemplate';
import {
  DEFAULT_PATH_KEY,
  DEFAULT_USER_ROOT,
  EXAMPLE_HOST,
  OPTION_DESCRIPTION_HOST,
  OPTION_DESCRIPTION_ROOT_KEY,
  OPTION_DESCRIPTION_ROOT_USER,
  PATH_TO_PLAYBOOK_SETUP_NGINX,
  PATH_TO_RUNTIME,
  PATH_TO_TEMPLATE_NGINX_CONFIG,
  PATH_TO_TEMPLATE_NGINX_DEFAULT,
} from '../constants';
import * as path from 'path';
import resolveKeysPair from '../helpers/resolveKeysPair';

export default function setup(program: Command) {
  program
    .command('setup-nginx')
    .description('Setup nginx inside remote server')
    .requiredOption(`-t, --host <${EXAMPLE_HOST}>`, OPTION_DESCRIPTION_HOST)
    .requiredOption(`-u, --root-user <${DEFAULT_USER_ROOT}>`, OPTION_DESCRIPTION_ROOT_USER, DEFAULT_USER_ROOT)
    .requiredOption(`-k, --root-key <${DEFAULT_PATH_KEY}>`, OPTION_DESCRIPTION_ROOT_KEY, DEFAULT_PATH_KEY)
    .action(async (cmd) => {
      displayCommandGreetings(cmd);
      const { host, rootUser, rootKey } = cmd;
      const rootKeyPair = resolveKeysPair(rootKey);

      // create nginx config from template
      const pathToRuntimeConfig = path.resolve(PATH_TO_RUNTIME, 'nginx.conf');
      createFileFromTemplate(PATH_TO_TEMPLATE_NGINX_CONFIG, pathToRuntimeConfig);

      // create nginx config from template
      const pathToRuntimeDefault = path.resolve(PATH_TO_RUNTIME, 'default.conf');
      createFileFromTemplate(PATH_TO_TEMPLATE_NGINX_DEFAULT, pathToRuntimeDefault);

      // create ansible playbook from the template
      const pathToRuntimePlaybook = path.resolve(PATH_TO_RUNTIME, 'nginx.playbook.yml');
      createFileFromTemplate(PATH_TO_PLAYBOOK_SETUP_NGINX, pathToRuntimePlaybook, {
        PATH_TO_TEMPLATE_CONFIG: pathToRuntimeConfig,
        PATH_TO_TEMPLATE_DEFAULT: pathToRuntimeDefault,
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
