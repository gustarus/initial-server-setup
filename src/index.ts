#!/usr/bin/env node

import * as path from 'path';
import program from 'commander';
import colors from 'colors';
import setup from './commands/setup';
import setupCertbot from './commands/setup-certbot';
import setupDocker from './commands/setup-docker';
import setupKey from './commands/setup-key';
import setupNginx from './commands/setup-nginx';
import setupUbuntu from './commands/setup-ubuntu';
import { PATH_TO_ROOT } from './constants';
import Package from './models/Package';

const pathToPackage = path.resolve(PATH_TO_ROOT, 'package.json');
const that = new Package({ path: pathToPackage });

// display description
program
  .version(that.version)
  .description('Tool to setup clean ubuntu 18.04 initially with docker and nginx under the hood via ansible playbooks');

// bind commands
setup(program);
setupCertbot(program);
setupDocker(program);
setupKey(program);
setupNginx(program);
setupUbuntu(program);

// override exit
program.exitOverride();

// listen to promises rejection
process.on('uncaughtException' as any, processError);
process.on('unhandledRejection' as any, processError);

// parse and run command
program.parse(process.argv);

// display help command
if (!process.argv.slice(2).length) {
  program.help();
}

function processError(error: Error) {
  console.log(colors.red.bold(error.toString()));
  console.log(error);
  process.exit(1);
}
