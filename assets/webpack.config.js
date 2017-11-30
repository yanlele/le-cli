const path = require('path');
const glob = require('glob');
const fs=require('fs');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');//代码压缩的插件
const htmlPlugin = require('html-webpack-plugin');//这个需要自己手动安装一次
const extractTextPlugin = require('extract-text-webpack-plugin');//这个是打包分离css的插件
const PurifyCSSPlugin = require('purifycss-webpack');//这个是优化css的一个东西
const entry = require('./webpack_config/entry_webpack');
const webpack = require('webpack');
const copyWebpackPlugin = require('copy-webpack-plugin');//拷贝人间打包的
const OptimizeCssAssetsPlugin =require('optimize-css-assets-webpack-plugin');

var srcDir = path.resolve(process.cwd(),'src');
console.log(encodeURIComponent(process.env.type));
if (process.env.type === 'build') {
    var website = {
        publicPath: '/'
    };
} else {
    var website = {
        publicPath: 'http://127.0.0.1:8081/'
    };
}

var config = {
    /**
     * 对于devTool模式有四种
     * source-mpa  生成独立map文件，包括：行列（打包是最慢的）
     * cheap-module-source-map   生成独立map文件，只包括行（打包比上略快）
     * eval-source-map  不生成独立的map文件，优点快！但是会有安全隐患（一定是在开发阶段）
     * cheap-module-eval-source-map 只有列，是上面的模式的简化版本
     */
    devtool: "cheap-module-source-map",
    entry: {
        entry: './src/scripts/entry.js',
        jquery: 'jquery',
        // vue:"vue"
        // entry2: './src/entry2.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "scripts/[name].js",
        publicPath: website.publicPath,//这个可以解决静态文件路径的问题
    },
    module: {
        rules: [
            {
                test: /\.css$/,//用正则匹配到需要使用loader处理的问题件
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ]
                }), //配置处理loader
                /*
                 * 配置loader的其他几种方式：
                 * 1、loader: ['style-loader', 'css-loader']
                 * 2、use:[
                 *  {
                 *      loader:"style-loader"
                 *  },
                 *  {
                 *      loader:"css-loader"
                 *  }
                 * ]
                 * */
                // include:'',//配置什么文件需要处理
                // exclude:'',//配置什么文件不需要处理
                // query:''//为loader配置额外配置项
            },
            {
                test: /\.(png|jpg|gif)/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 5000,//大于5K 字节的，打包为图片，如果小于5K ，就转换为base64
                        outputPath: "images/"
                    }
                }]
            },
            {
                test: /\.(html|htm)$/,
                use: ['html-withimg-loader']
            },
            {
                test: /.less$/,
                use: extractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(jsx|js)$/,
                use: [{
                    loader: "babel-loader"
                }],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({//这个是优化的插件，可以抽离三方类库框架等
            name: ['jquery'],
            filename: 'scripts/[name].mini.js',
            minChunks: 2,//抽离几个文件
        }),


        // new UglifyJsPlugin(),

        //webpack.ProvidePlugin用这个打包的好处是可以优化代码，如果使用，他就不会打包！
        new webpack.ProvidePlugin({//这个插件可以全局引用三方类库
            $: 'jquery',
            // 'vue':'vue'
        }),
        new htmlPlugin({
            minify: {
                removeAttributeQuotes: true,//id=""引号去掉了
            },
            hash: true,//每次更新JS会加一个哈希，取消缓存的问题
            template: './src/index.html'
        }),
        new extractTextPlugin('css/index.css'),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, "src/*.html"))  //指定需要扫描删除css对应页面的dom 结构
        }),
        new webpack.BannerPlugin('作者：晴小篆'),//打包文件带一个文本申明
        new copyWebpackPlugin([{//把一个文件的内容复制到另外一个地方
            from: __dirname + '/src/public',
            to: './public'
        }]),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),//服务监听目录
        host: '127.0.0.1',
        compress: true,//是否启用服务器压缩
        port: 8081
    },
    watchOptions: {
        poll: 1000,//检测修改文件的时间
        aggregateTimeout: 500,//半秒内保存不会重复打包，以防止出错
        ignored: /mode_modules/,//不用打包某些文件目录
    }
};


if (process.env.type === 'build') {
    var website = {
        publicPath: 'http://yanlele.com:8081/'
    };

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
    )
} else {
    var website = {
        publicPath: 'http://127.0.0.1:8081/'
    };
}

module.exports = config;