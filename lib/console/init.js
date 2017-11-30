module.exports = function (program) {
    const fs = require('fs-extra');//拷贝文件功能的模块
    const path = require('path')
    const chalk = require('chalk');//console字体颜色显示的模块
    const dir = program.args[1] ? path.join(process.cwd(), '/' + program.args[1]):process.cwd()


    fs.ensureDir(dir)
        .then(function () {
            fs.copy(path.join(__dirname, '../../assets'), dir,{clobber: true})
                .then(function () {
                    console.log(chalk.green('Project initialization success!'))
                })
        })
        .catch(function (err) {
            console.log(err)
        })
};