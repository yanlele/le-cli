'use strict';

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');//代码压缩的插件
const extractTextPlugin = require('extract-text-webpack-plugin');//这个是打包分离css的插件
const PurifyCSSPlugin = require('purifycss-webpack');//这个是优化css的一个东西
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var srcDir = path.resolve(process.cwd(), 'src');
var assets = 'build/';
var projectJson = require('./package.json');
var excludeFromStats = [
    /node_modules[\\\/]/
];


function makeConf(options) {
    options = options || {};

    var debug = options.debug !== undefined ? options.debug : true;//是否是debug模式

    var entries = genEntries();

    var config = {
        entry: entries,
        output: {
            path: path.resolve(debug ? '__build' : assets),
            filename: debug ? '[name].js' : 'scripts/[name].js',
            chunkFilename: debug ? '[chunkhash:8].chunk.js' : 'scripts/[chunkhash:8].chunk.min.js',
            hotUpdateChunkFilename: debug ? '[id].[chunkhash:8].js' : 'scripts/[id].[chunkhash:8].min.js',

            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.css/,
                    use: extractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [{
                            loader: 'css-loader'
                        }, {
                            loader: 'postcss-loader'
                        }]
                    })
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    //注意后面的name=xx，这里很重要否则打包后会出现找不到资源的
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 5000,
                            output: 'images/'
                        }
                    }]
                },
                {
                    test: /\.(woff|eot|ttf)$/i,
                    loader: 'url-loader',
                    options: {
                        output: 'css/font/'
                    }
                },
                {
                    test: /\.(html|htm)$/,
                    use: ['html-withimg-loader']
                },
                {
                    test: /\.less/,
                    use: extractTextPlugin.extract({
                        use: [{
                            loader: 'css-loader'
                        }, {
                            loader: 'less-loader'
                        }],
                        fallback: 'style-loader'
                    })
                },
                {
                    test: /\.(js|jsx)/,
                    use: [{
                        loader: 'babel-loader'
                    }],
                    exclued: /node_modules/
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                'jQuery': 'jQuery',
                '$': 'jQuery',
                'jquery': 'jQuery'
            })
        ],
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),//服务监听目录
            host: '192.168.1.3',
            compress: true,//是否启用服务器压缩
            port: 8081
        },
        watchOptions: {
            poll: 1000,//检测修改文件的时间
            aggregateTimeout: 500,//半秒内保存不会重复打包，以防止出错
            ignored: /mode_modules/,//不用打包某些文件目录
        }
    };

    var pages = fs.readdirSync(srcDir);

    var links = [];

    pages.forEach(function (filename) {
        var name = filename.match(/(.+)\.html$/);
        if (name) {
            var fileContent = fs.readFileSync(path.resolve(srcDir, filename), 'utf-8');
            var injectReg = /\<meta\s[^\<\>]*name=\"no-need-script\"[^\<\>]*\>/;
            var inject = injectReg.test(fileContent) ? false : 'body';
            var title = (/<title>[^<>]*<\/title>/i).exec(fileContent)[0];
            title = title.replace(/<\/?title>/g, '');
            links.push('<li><a href="' + config.output.publicPath + name[0] + '">' + title + '-' + filename + '</a></li>');

            var conf = {};

            if (name[1] in config.entry) {
                conf.inject = inject;
                conf.chunks = ['common', name[1]];
            }

            config.plugins.push(new HtmlWebpackPlugin(conf));

            var jsPath = path.resolve(srcDir, 'scripts', filename.replace('.html', '.js'));

            if (!injectReg.test(fileContent) && !fs.existsSync(jsPath)) {
                var fd = fs.openSync(jsPath, 'a');
                fs.appendFileSync(jsPath, '/**\n* ' + filename + '的入口文件\n*/\n', {encoding: 'utf-8'});
                fs.closeSync(fd);
            }

            if (!injectReg.test(fileContent) && !fs.existsSync(jsPath)) {
                var fd = fs.openSync(jsPath, '/**\n*/' + filename + '的入口文件\n*/\n', {encoding: 'utf-8'});
            }
        }

        config.entry = entries = genEntries();

        var chunks = Object.keys(entries);
        config.plugins.push(new CommonsChunkPlugin({
            name: 'common',
            chunks: chunks,
            minChunks: chunks.length // 提取所有chunks共同依赖的模块
        }));

        config.plugins.push(new HtmlWebpackPlugin({
            templateContent: function () {
                return '<!DOCTYPE html><html>'
                    + '<style>a {background: transparent none repeat scroll 0 0;color: #2db7f5;outline: medium none;transition: color 0.3s ease 0s;}</style>'
                    + '<head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">'
                    + '<title>目录</title><meta name="no-need-script">'
                    + '</head><body><div>'
                    + '<ul>' + links.join('') + '</ul>'
                    + '</body></html>'
            },
            inject: false,
            filename: '__menu.html'
        }));

        // 由于html压缩在dbl内部源码中，只能读取webpack配置，这儿处理一下
        config.htmlMin = options.htmlMin;

        // 这儿可以设置调试时起始页面的url
        config.indexPage = "/__build/__menu.html"

        return config;
    })
}

function genEntries() {
    var jsDir = path.resolve(srcDir, 'scripts');
    var names = fs.readdirSync(jsDir);
    var map = {};

    names.forEach(function(name) {
        var m = name.match(/(.+)\.js$/);
        var entry = m ? m[1] : '';
        var entryPath = entry ? path.resolve(jsDir, name) : '';

        if(entry) map[entry] = entryPath;
    });

    return map;
}


module.exports=makeConf