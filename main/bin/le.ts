#!/usr/bin/env node

import * as inquirer from 'inquirer';
import log from '../lib/log';
import init from '../lib/console/init';
import * as program from 'commander';
import githubTemplateRequest, {configHandler, handleResponseSource} from '../lib/handleRequest';
import chalk from "chalk";
import * as ora from 'ora';



const pkg = require('../../package.json');


const spinner = ora('Downloading template...');

program
    .usage('--start')
    .version(pkg.version)
    .option('-s, --start', '开启cli模板选择')
    .parse(process.argv);

program.on('--help', function () {
  log.info('  示例(Examples):');
  log.info();
  log.info('  tpm  --start/-s ');
});

const defaultConfig = [
  {
    type: 'input',
    name: 'dirPath',
    message: `请输入您的初始化项目路径, 不填写默认略过并取当前路径为默认初始化项目路径:`,
  },
  {
    type: 'checkbox',
    message: '请选择创建项目类型',
    name: 'select',
    choices: [
      new inquirer.Separator(' = 前台程序 = '),
      {
        name: '多页jquery程序+handlebars模板引擎',
        value: 'jquery-multipage'
      },
      {
        name: '基于TypeScript+webpack多页打包的前台程序',
        value: 'TypeScript-multipage'
      },
      {
        name: 'react+redux+antd+jsonServerMockjs',
        value: 'react-redux'
      },
      {
        name: 'react+redux+antd+next服务端渲染',
        value: 'next-react-redux'
      },
      {
        name: '基于TypeScript+react项目',
        value: 'tsx-app'
      },
      {
        name: '小程序 - 基于tina的小程序框架',
        value: 'mini-program'
      },
      new inquirer.Separator(' = node 后台程序 ='),
      {
        name: 'koa程序+MySql连接数据库',
        value: 'koa-sql'
      },
      {
        name: 'koa程序+基于TypeScript+MySql',
        value: 'koa-typescript'
      }
    ],
    validate: function (answer) {
      if (answer.length !== 1) {
        return '只能选择一个初始化项目模板';
      }
      return true;
    }
  }
];

const initFunction = (config: any[] = defaultConfig) => {
  inquirer.prompt(config)
      .then(data => {
        log.info('项目选择成功，正在开始给您初始化项目.......');
        const {dirPath, select} = data;
        const template = select[0];
        init({
          template,
          dirPath,
        })
      });
};

if (program.start) {
  log.info('Get template form remote ......');
  spinner.start();
  githubTemplateRequest()
      .then((res: any[]) => {
        spinner.succeed(chalk.green('Download template successfully'));
        const choicesList: { name: string, value: string }[] = handleResponseSource(res);
        initFunction(configHandler(choicesList))
      })
      .catch(err => {
        spinner.warn('Get template fail');
        log.info('Start local template config......');
        initFunction();
      });
} else {
  program.help();
}




