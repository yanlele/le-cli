'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var LogType;
(function (LogType) {
    LogType["info"] = "info";
    LogType["error"] = "error";
    LogType["success"] = "success";
    LogType["trace"] = "trace";
    LogType["debug"] = "debug";
    LogType["warn"] = "warn";
    LogType["fatal"] = "fatal";
})(LogType = exports.LogType || (exports.LogType = {}));
var logTypeList = [
    {
        'type': LogType.info,
        'color': 'cyan',
        'icon': '>'
    },
    {
        'type': LogType.error,
        'color': 'red',
        'icon': '×'
    },
    {
        'type': LogType.success,
        'color': 'green',
        'icon': '√'
    },
    {
        'type': LogType.trace,
        'color': 'dim',
        'icon': '*'
    },
    {
        'type': LogType.debug,
        'color': 'bgBlack',
        'icon': '*'
    },
    {
        'type': LogType.warn,
        'color': 'yellow',
        'icon': '!'
    },
    {
        'type': LogType.fatal,
        'color': 'bgRed',
        'icon': '×'
    }
];
var logMapFunction = {};
logTypeList.forEach(function (logType) {
    logMapFunction[logType.type] = function () {
        var args = Array.prototype.slice.call(arguments, 0);
        if (logType.icon)
            args = [logType.icon].concat(args);
        global.console.log(chalk[logType.color].apply(global.console, args));
    };
});
exports.default = logMapFunction;
//# sourceMappingURL=log.js.map