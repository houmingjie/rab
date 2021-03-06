'use strict';
const {
    resolve
} = require('path');
const webpack = require('webpack');
const path = require('path');
const c9 = !!process.env.PORT;
module.exports = {
    entry: {
        'demo': [
            'react-hot-loader/patch',
            `webpack-dev-server/client?${c9 ? 'http://rab-yeanzhi.c9users.io' : 'http://127.0.0.1:8765'}`,
            'webpack/hot/only-dev-server',
            './demo/index.js'
        ],
        'simple':[
            'react-hot-loader/patch',
            `webpack-dev-server/client?${c9 ? 'http://rab-yeanzhi.c9users.io' : 'http://127.0.0.1:8765'}`,
            'webpack/hot/only-dev-server',
            './demo/simple.js'
        ]
    },
    output: {
        filename: '[name].js',
        sourceMapFilename: '[file].map',
        path: resolve(__dirname, 'dist'),
        publicPath: '/dist'
    },
    devtool: 'cheap-eval-source-map',
    resolve: {

    },
    devServer: {
        contentBase: [path.join(__dirname, 'html'), path.join(__dirname, 'dist')],
        compress: true,
        port: parseInt(process.env.PORT) || 8765,
        host: '0.0.0.0',
        hot: true,
        inline: true,
        publicPath: '/dist/',
        headers: {
            'XM-Component-Server': 'webpack-dev-server@2.0.0'
        },
        historyApiFallback: {
            rewrites: [
                {
                    from: /^\/simple.*$/,
                    to: '/simple.html'
                },
                {
                    from: /^\/.*$/,
                    to: '/index.html'
                }
            ],
            verbose: true
        },
        watchContentBase: true
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use:[{
                    loader: 'babel-loader',
                    options: {
                        'presets': [
                            ['es2015', {
                                'modules': false
                            }], 'stage-0', 'react'
                        ],
                        'env': {},
                        'ignore': [
                            'node_modules/**',
                            'dist'
                        ],
                        'plugins': [
                            'react-hot-loader/babel',
                            'transform-decorators-legacy',
                            'lodash'
                        ]
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|woff|svg|eot|ttf|woff2)$/i,
                use: ['url-loader']
            }
        ]
    },
    externals: {
        jquery: 'jQuery',
        lodash: '_'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
};
