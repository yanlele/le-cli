import * as request from 'request';
import * as inquirer from "inquirer";

const {get} = request;

export const configHandler = (choicesList: { name: string, value: string }[] = []) => [
  {
    type: 'input',
    name: 'dirPath',
    message: `请输入您的初始化项目路径, 不填写默认略过并取当前路径为默认初始化项目路径:`,
  },
  {
    type: 'checkbox',
    message: '请选择创建项目类型',
    name: 'select',
    choices: choicesList,
    validate: function (answer) {
      if (answer.length !== 1) {
        return '只能选择一个初始化项目模板';
      }
      return true;
    }
  }
];

const handleRequest = () => {
  return new Promise((resolve, reject) => {
    get({
      url: 'https://api.github.com/users/cli-template-build/repos',
      headers: {
        'User-Agent': 'request'
      },
    }, (error, res, body) => {
      if (error) reject(error);
      if (body) resolve(body);
    })
  })
};

export const handleResponseSource = (res: any[]) => {
  if (typeof res === 'string') res = JSON.parse(res);

  return res.map(item => ({
    value: item.name,
    name: item.description,
  }))
};

export default handleRequest


