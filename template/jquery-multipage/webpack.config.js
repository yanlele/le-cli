const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 模块映射到输出 bundle 的过程
const ManifestPlugin = require('webpack-manifest-plugin');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, './dist');
const templateRoot = path.resolve(__dirname, './page');


const pageEntry = {}; // 页面入口
const pageHtml = [];  // 页面模板
const navigation = {
    "navList": []
};

const pages = fs.readdirSync(templateRoot);

pages.forEach((name, index) => {
    // 页面入口配置
    const enterPath = path.join(templateRoot, name);
    pageEntry[name] = path.join(enterPath, 'entry.js');

    // 输出页面模板
    pageHtml.push(new HtmlWebpackPlugin({
        entryName: name,
        filename: `${name}.html`,
        template: `${enterPath}/index.html`,
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true
        },
        chunks: ['main', 'common', name]
    }));

    // 输出导航JSON
    navigation.navList.push({
        "name": name,
        "href": `/${name}.html`
    });
    fs.writeFileSync(path.resolve(__dirname, './Navigation.json'), JSON.stringify(navigation));
});

module.exports = env => {
    const config = {publicPath: '/'};
    if (env.NODE_ENV === 'build') {
        config.publicPath = '/spas/'
    }
    return {
        entry: Object.assign(pageEntry, {
            main: './common/main.js'
        }),
        // devtool: false,
        devtool: 'source-map',
        devServer: {
            contentBase: path.resolve(__dirname, './'),
            compress: true,
            inline: true,
            hot: true, // 模块热替换
            port: 9000,
        },
        resolve: {
            alias: {
                jquery$: path.resolve(__dirname, 'common/lib/jquery.min.js')                  // 之所以要用jquery$ ,表示这是一个文件而已；
            }
        },
        plugins: [
            new ManifestPlugin(),
            new webpack.ProvidePlugin({
                $: 'jquery'
            }),
            new webpack.HotModuleReplacementPlugin(), // 模块热替换
            new webpack.optimize.CommonsChunkPlugin({ // 公共模块提取
                name: 'common'
            }),
            new CleanWebpackPlugin(buildPath), // 清理 项目之外无法清理 用nodejs清理文件
        ].concat(pageHtml),
        output: {
            filename: 'js/[name]-[hash].bundle.js',
            path: buildPath,
            publicPath: config.publicPath
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader',
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
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        'url-loader?limit=20000&name=[name]-[hash].[ext]&outputPath=images/',
                        'image-webpack-loader'
                    ]
                }, {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: ['file-loader']
                },
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['latest']
                        }
                    },
                    exclude: '/node_modules/',
                    include: '/src/',
                },
                {
                    test: /\.hbs/,
                    loader: "handlebars-template-loader"
                }
            ]
        }
    }
};

