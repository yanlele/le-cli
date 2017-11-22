const program = require('commander')

module.exports = function () {
    program
        .version(require('../package').version)
        .usage('[options] <keywords>')
        .option('-p, --port [port]', 'set port')
        .option('-init Project initialization');

    program.parse(process.argv);

    if (!program.args.length) {
        program.help()
    } else {
        var command = program.args;
        if (['init'].indexOf(command[0]) > -1) {
            require('./console/' + command[0])(program)
        } else {
            console.log('commond not exist')
        }
    }
};
