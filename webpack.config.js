const path = require('path');
// 載入轉存 css 檔案的套件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 產一個全新的 html
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    // 進入點
    entry: {
        main: './index.js',
        second: './second.js',
    },
    // 出口
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist') // dirname = '/'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'style-loader', // 這個會後執行
                    'css-loader' // 這個會先執行
                ]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    // 需要用到的 loader
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }, {
                test: /\.pug$/,
                use: ['pug-loader']
            },
            {
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 指定輸出位置
            // [name] 為上方進入點設定的 "名稱"
            filename: "./scss/[name].css"
        }),
        // 有幾個 pug 檔就要用幾個
        new HtmlWebpackPlugin({
            title: 'RexWebpack',
            hash: true,
            template: './pug/index.pug',
            filename: './index.html'
        }),
    ]
};