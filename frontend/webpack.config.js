const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // todo change to production
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
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
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        compress: true,
        port: 9000,
        hot: true,
        watchContentBase: true,
        publicPath: '/dist/',
        host: '0.0.0.0',
        historyApiFallback: true
    }
};
