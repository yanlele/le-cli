const webpack = require('webpack');
const path=require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');//代码压缩的插件
const OptimizeCssAssetsPlugin =require('optimize-css-assets-webpack-plugin');

module.exports=function(program){
    const config = require(path.join(process.cwd(),"/webpack.config.js"));

    config.plugins.push(
        new UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        })
    );

    webpack(config, function(err, stats) {
        console.log("success , pack end ！")
    })
};