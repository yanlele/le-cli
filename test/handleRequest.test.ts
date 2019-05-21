import handleRequest from '../main/lib/handleRequest';
import * as ora from 'ora';

const spinner = ora('downloading template...');


spinner.start();
handleRequest().then((res)=> {
  console.log(res);
  spinner.succeed('success');
}).catch((err) => {
  spinner.fail('fail')
});
