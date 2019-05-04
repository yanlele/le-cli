import log from '../main/lib/log';
import * as download from 'download-git-repo';
import * as path from 'path';
import * as userHome from 'user-home';
import ora from 'ora';
import chalk from 'chalk';

const spinner = ora('downloading template...');

spinner.start();
download('github:cli-template-build/tsx-app', path.resolve(userHome, 'temp'), {clone: false}, (err)=> {
  if (err) {
    spinner.fail(chalk.red('download template unsuccessfully'));
    log.error(err)
  } else {
    spinner.succeed(chalk.green('download template successfully'))
  }
});
