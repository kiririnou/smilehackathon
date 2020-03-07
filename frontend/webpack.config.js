const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
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
                exclude: /(node_modules|dist|public)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 9000
    }
};