#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer = require("inquirer");
var log_1 = require("../lib/log");
var init_1 = require("../lib/console/init");
var program = require("commander");
var pkg = require('../package.json');
program
    .usage('--start')
    .version(pkg.version)
    .option('-s, --start', '开启cli模板选择')
    .parse(process.argv);
program.on('--help', function () {
    log_1.default.info('  示例(Examples):');
    log_1.default.info();
    log_1.default.info('  le  --start/-s');
});
var config = [
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
        .then(function (data) {
        log_1.default.info('项目选择成功，正在开始给您初始化项目.......');
        var template = data.select[0];
        init_1.default({
            template: template
        });
    });
}
else {
    program.help();
}
//# sourceMappingURL=le.js.map