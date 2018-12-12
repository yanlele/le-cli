/**
 * create by yanle
 * create time 2018/12/12 下午4:50
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

commonConfig = {
    entry: {
        app: [
            "babel-polyfill",
            "react-hot-loader/patch",
            path.join(__dirname, './src/index.js')
        ],
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux'],
    },

    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[chunkhash].js',       //这里应该用chunkhash替换hash, 但是会跟 --hot 冲突，无奈的妥协
        chunkFilename: '[name].[chunkhash].js',
        publicPath: '/'
    },

    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            components: path.join(__dirname, 'src/components'),
            router: path.join(__dirname, 'src/router')
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",     // 用于缓存打包编译结果， 提升下次编译速度
                    options: {
                        cacheDirectory: true,
                    }
                },
                include: path.join(__dirname, 'src')
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
        new CleanWebpackPlugin(['dist']),

        new HtmlWebpackPlugin({
            filename: 'index.html',         // 打包之后的文件名
            template: path.join(__dirname, 'src/index.html')
        }),

        // 提取公共代码
        new webpack.optimize.CommonsChunkPlugin({               // 提取三方生成的代码, 包括模块代码
            names: ['vendor'],
            minChunks: Infinity
        })
    ]
};

module.exports = commonConfig;