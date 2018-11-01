const program = require('commander')

module.exports = function () {
    program
        .version(require('../package').version)
        .usage('[options] <keywords>')
        .option('-p, --port [port]', 'set port')
        .option('-m, --mockPort [mockPort]', 'set listen mock port')
        .option('-t ,--template [template]', 'set template');

    program.parse(process.argv);


    if (!program.args.length) {
        program.help()
    } else {
        var command = program.args;
        if (['init', 'server', 'build'].indexOf(command[0]) > -1) {
            if (command[0] === 'init' && ['jquery', 'koa-mongodb', 'koa-sql', 'vue-multipage'].indexOf(command[1]) > -1){
                program.template = command[1] || 'jquery';
            }
            require('./console/' + command[0])(program)
        } else {
            console.log('commond not exist')
        }
    }
};

