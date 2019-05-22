import handleRequest, {handleResponseSource} from '../main/lib/handleRequest';
import * as ora from 'ora';

const spinner = ora('downloading template...');


spinner.start();
handleRequest().then((res: any[])=> {
  spinner.succeed('success');
  const choicesList: { name: string, value: string }[] = handleResponseSource(res);
  console.log(`<${'='.repeat(100)}>`);
  console.log(choicesList);
  console.log(`<${'='.repeat(100)}>`);

}).catch((err) => {
  spinner.fail('fail')
});
