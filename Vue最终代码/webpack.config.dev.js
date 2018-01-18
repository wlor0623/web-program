//根据参照文件生成index.html
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:'./src/main.js',//入口
    module:{
        rules:[
            {
                test: /\.vue$/,
                use: [
                    { loader: "vue-loader" }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "vue-style-loader" },
                    { loader: "css-loader" }
                ]
            },
            {
                test:/\.(ttf|png|gif|svg)$/,
                use: [
                    { loader: "url-loader" }
                ]
            }
            //toDo，最后一天打包优化的时候，需要对vue-preview进行babel转换
        ]
    },
    resolve: {
        alias: {
          '@': './components'
        },
        extensions: ['.vue','.js', '.json'] //自动补全文件的后缀
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./template.html',//参照文件
            filename:'index.html' //生成的index.html
        })
    ]
}