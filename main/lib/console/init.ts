import * as path from 'path';
import * as fse from 'fs-extra';
import log from '../log';

export default (program) => {
  const {template, dirPath} = program;

  const templatePath: string = path.resolve(__dirname, '../../../template', template);
  // log.info(templatePath);
  fse.pathExists(templatePath).then(exists => {
    if (exists) {
      log.success('模板解析成功');
      fse.copySync(templatePath, path.resolve(process.cwd(), dirPath))
    } else {
      log.error('模板解析失败')
    }
  }).catch(err => {
    throw err;
  })
};
