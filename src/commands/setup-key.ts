import { Command } from 'commander';
import displayCommandGreetings from './../helpers/displayCommandGreetings';
import displayCommandDone from '../helpers/displayCommandDone';
import execSyncProgressDisplay from '../helpers/execSyncProgressDisplay';
import {
  DEFAULT_PATH_KEY,
  DEFAULT_USER_ROOT,
  EXAMPLE_HOST,
  OPTION_DESCRIPTION_HOST,
  OPTION_DESCRIPTION_ROOT_KEY,
  OPTION_DESCRIPTION_ROOT_USER,
} from '../constants';
import resolveKeysPair from '../helpers/resolveKeysPair';

export default function setup(program: Command) {
  program
    .command('setup-key')
    .description('Install public key inside remote server')
    .requiredOption(`-t, --host <${EXAMPLE_HOST}>`, OPTION_DESCRIPTION_HOST)
    .requiredOption(`-u, --user <${DEFAULT_USER_ROOT}>`, OPTION_DESCRIPTION_ROOT_USER, DEFAULT_USER_ROOT)
    .requiredOption(`-k, --key <${DEFAULT_PATH_KEY}>`, OPTION_DESCRIPTION_ROOT_KEY, DEFAULT_PATH_KEY)
    .action(async (cmd) => {
      displayCommandGreetings(cmd);
      const { host, user, key } = cmd;
      const keyPair = resolveKeysPair(key);

      // ssh-copy-id key to the target key
      execSyncProgressDisplay('ssh-copy-id', { i: keyPair.public }, `${user}@${host}`);

      displayCommandDone(cmd);
    });
};
