#!/usr/bin/env node

import * as inquirer from 'inquirer';
import log from '../lib/log';
import init from '../lib/console/init';
import * as program from 'commander';
const pkg = require('../package.json');

program
    .usage('--start')
    .version(pkg.version)
    .option('-s, --start', '开启cli模板选择')
    .parse(process.argv);

program.on('--help', function () {
  log.info('  示例(Examples):');
  log.info();
  log.info('  le  --start/-s');
});

let config = [
  {
    type: 'checkbox',
    message: '请选择',
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
      new inquirer.Separator(' = node 后台程序 ='),
      {
        name: 'koa程序+MySql连接数据库',
        value: 'koa-sql'
      },
      {
        name: 'koa程序+基于TypeScript+MySql',
        value: 'koa-typescript'
      },
      new inquirer.Separator(' = java 后台程序 = '),
      {
        name: '基础java SSM程序',
        value: 'java-ssm'
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

if (program.start) {
  inquirer.prompt(config)
      .then(data => {

        log.info('项目选择成功，正在开始给您初始化项目.......');
        let template = data.select[0];
        init({
          template
        })
      });
} else {
  program.help();
}




