const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|dist|public)/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        "@babel/preset-env", "@babel/preset-react",
                        {'plugins': ['@babel/plugin-proposal-class-properties']}
                    ]
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules|dist|public)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    'sass-loader'
                ]
            },
            {
                test: /\.(svg)$/,
                loader: 'file-loader',
                options: {
                    publicPath: '/static/',
                    name: '[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        }),
        new Dotenv()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        compress: true,
        port: 9000,
        hot: true,
        watchContentBase: true,
        publicPath: '/static/',
        host: '0.0.0.0',
        historyApiFallback: true
    }
};
