//配置模块最大的作用：让你的代码修改量达到最少

var path = require('path');

module.exports = {

    node_modulePath : path.join(__dirname,'node_modules'),
    publicPath : path.join(__dirname,'public'),
    heroViews_path : path.join(__dirname,'views','heroViews')

};