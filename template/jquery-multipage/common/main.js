import './base.css';


let setRem = require('./module/setRem');    // 移动端自动计算rem
let helpers = require('../lib/handlebars-helper-extend/helper');   // 注册handlebars helpers
setRem.init();