'use strict';

/**
 * 输出控制台日志记录
 */
import chalk from 'chalk';

export enum LogType {
  info = 'info',
  error = 'error',
  success = 'success',
  trace = 'trace',
  debug = 'debug',
  warn = 'warn',
  fatal = 'fatal',
}

interface LogTypeItem {
  type: LogType;
  color: string;
  icon: string
}

interface LogMapFunction {
  [key: string]: Function;
}


const logTypeList: LogTypeItem[] = [
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

const logMapFunction: LogMapFunction = {};

logTypeList.forEach(function (logType: LogTypeItem) {
  logMapFunction[logType.type]= function () {
    let args = Array.prototype.slice.call(arguments, 0);
    if (logType.icon) args = [logType.icon].concat(args);
    global.console.log(chalk[logType.color].apply(global.console, args));
  };
});

export default logMapFunction;
