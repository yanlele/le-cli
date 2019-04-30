"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fse = require("fs-extra");
var log_1 = require("../log");
exports.default = (function (program) {
    var templatePath = path.resolve(__dirname, '../../../template', program.template);
    fse.pathExists(templatePath).then(function (exists) {
        if (exists) {
            log_1.default.success('模板解析成功');
            fse.copySync(templatePath, process.cwd());
        }
        else {
            log_1.default.error('模板解析失败');
        }
    }).catch(function (err) {
        throw err;
    });
});
//# sourceMappingURL=init.js.map