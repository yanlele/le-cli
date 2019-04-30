import * as path from 'path';
import * as fse from 'fs-extra';
import log from '../log';

export default (program) => {
  let templatePath: string = path.resolve(__dirname, '../../../template', program.template);
  // log.info(templatePath);
  fse.pathExists(templatePath).then(exists => {
    if (exists) {
      log.success('模板解析成功')
      fse.copySync(templatePath, process.cwd())
    } else {
      log.error('模板解析失败')
    }
  }).catch(err => {
    throw err;
  })
};
