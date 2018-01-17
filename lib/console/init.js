module.exports = function (program) {
    const copy = require('directory-copy');//拷贝文件功能的模块
    const path = require('path');
    const fs=require('fs')
    const chalk = require('chalk');//console字体颜色显示的模块
    const dir = program.args[1] ? path.join(process.cwd(), '/' + program.args[1]):process.cwd()

    console.log(program.args);
    console.log(process.cwd());
    console.log(program.template);
    fs.exists(path.join(__dirname, '../../template/' + program.template), function(exists) {
        if (exists) {
            copy(
                {
                    src: path.join(__dirname, '../../template/' + program.template),
                    dest: process.cwd()
                    //excludes: [ /^\./ ] // Exclude hidden files
                }, function() {
                    console.log(chalk.green('Project initialization success!Please run "npm install" or "cnpm install" if you have install cnpm.') );
                }).on('log', function(msg, level) {
                    // Level is debug, info, warn or error
                    console.log(level + ': ' + msg)
                })
        } else {
            console.log('This template is not exists')
        }
    })
};