const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpack = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const PurifyCSS = require('purifycss-webpack');
const glob = require('glob-all');
const path = require('path');
const fse = require('fs-extra');

const baseConfig = {
    devtool: 'inline-source-map',
    entry: {
        common: './app/common/Common.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash:5].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devServer: {
        port: 3000,
        /*proxy: {
            '/': {
                target: 'http://localhost:3002',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {
                    '': '/api/'
                }
            }
        },*/
        hot: true,
        hotOnly: true,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            singleton: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // minimize: true,
                            // modules: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')(),
                                require('cssnano')()
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            singleton: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        /*options: {
                            // minimize: true,
                            // modules: true,
                        }*/
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')(),
                                require('cssnano')()
                            ]
                        }
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 10,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    // useRelativePath: true,
                                    // publicPath: '../img',
                                    outputPath: 'img',
                                }
                            }
                        }
                    },
                    {
                        loader: 'img-loader'
                    }
                ]
            },
            {
                test: /\.(eot|woff2|woff|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 50,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    // useRelativePath: true,
                                    // publicPath: '../fonts',
                                    outputPath: 'fonts',
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src', 'img:data-src']
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new ExtractTextWebpackPlugin({
            filename: 'css/[name].[hash].css',                   // 输出路径
            allChunks: false
        }),

        new CleanWebpack(path.resolve(__dirname, 'dist')),

        new webpack.optimize.CommonsChunkPlugin({               // 提取三方生成的代码, 包括模块代码
            names: ['common'],
            minChunks: Infinity
        }),

        new webpack.optimize.UglifyJsPlugin()
    ]
};

const generatePage = function ({
                                   title = '',
                                   entry = '',
                                   template = './app/index.html',
                                   name = '',
                                   chunks = []
                               } = {}) {
    return {
        entry,
        plugins: [
            new HtmlWebpackPlugin({
                chunks,
                template,
                title,
                filename: name + '.html',
                minify: {
                    collapseWhitespace: false                //祛除空格
                }
            })
        ]
    }
};

const appPaths = fse.readdirSync(path.resolve(__dirname, 'app', 'pages'));
let appItemPath = '';
let myPages = [];
let appItemHtmlTemplate = '';
appPaths.map(function (item) {
    appItemPath = path.resolve(__dirname, 'app', 'pages', item, 'index.ts');
    appItemHtmlTemplate = path.resolve(__dirname, 'app', 'pages', item, 'index.html');
    if (fse.pathExistsSync(appItemPath)) {
        myPages.push(generatePage({
            title: item,
            entry: {
                [item]: `./app/pages/${item}/index.ts`
            },
            name: item,
            chunks: ['common', item],
            template: fse.pathExistsSync(appItemHtmlTemplate) ? path.resolve(__dirname, 'app', 'pages', item, 'index.html') : './app/index.html',
        }))
    }
});

module.exports = merge([baseConfig].concat(myPages));