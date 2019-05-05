import * as inquirer from 'inquirer';

inquirer.prompt([
  {
    type: 'confirm',
    name: 'override',
    message: `The newType named name exists!Override?`
  },
  {
    type: 'input',
    name: 'branch',
    message: `the name of branch you need in tmpName`,
    default: 'master'
  }
]).then(answers => {
  console.log(answers);
});
