module.exports = function (program) {
    const fs = require('fs-extra')
    const path = require('path')
    const chalk = require('chalk')
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