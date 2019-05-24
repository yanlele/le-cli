import * as path from 'path';
import * as fs from 'fs-extra';
import * as userHome from 'user-home';
import * as download from 'download-git-repo';
import log from '../log';
import chalk from "chalk";
import ora from "ora";

export default (program) => {
  const {template, dirPath} = program;
  const templateDownLoadPath: string = path.resolve(userHome, '.cli-template-build', template);

  const remotePath: string = `github:cli-template-build/${template}`;
  const spinner = ora('downloading template...');

  spinner.start();
  download(remotePath, templateDownLoadPath, {clone: false}, (err) => {
    if (err) {
      spinner.fail(chalk.red('download template unsuccessfully'));
      log.error(err)
    } else {
      spinner.succeed(chalk.green('download template successfully'));
      fs.copySync(templateDownLoadPath, path.resolve(process.cwd(), dirPath));
      log.success('模板解析成功， 初始化完成');
      fs.removeSync(templateDownLoadPath);
      log.success('缓存清理成功');
    }
  });
};
