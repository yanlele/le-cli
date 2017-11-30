var webpack = require('webpack');

module.exports=function(program){
    const config = require(path.join(process.cwd(),"/webpack.config.js"));

    webpack(config, function(err, stats) {
        console.log("success , pack end ！")
    })
};