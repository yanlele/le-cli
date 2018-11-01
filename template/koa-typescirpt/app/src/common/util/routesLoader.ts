import * as glob from "glob";

module.exports = function (dirname) {
    return new Promise((resolve, reject) => {
        const routers = [];
        glob(
            `${dirname}/*`,
            {ignore: '**/index.js'},
            {ignore: '**/*.map'},
            (err, files) => {
                if (err) {
                    reject(err)
                }
                files.forEach(file => {
                    const router = require(file);
                    routers.push(router)
                });
                resolve(routers)
            }
        )
    })
};