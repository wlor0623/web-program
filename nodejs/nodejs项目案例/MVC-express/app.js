//1.导入express模块

var express = require('express');

var path = require('path');



var router = require('./router/hero_router.js');

//2.创建服务器

var app = express();

//express中无需自行封装渲染函数，express支持模板引擎配置
/**
 * art-tenmplate官方文档配置express
 * app.engine('art', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
 */

 //3.配置模板引擎
 //1.使用模板引擎 第一个参数：模板文件的后缀名,一旦设置，express只能识别你设置的模板名
app.engine('html', require('express-art-template'));
//2.设置express的模板引擎 第一个参数：'view engine'表示使用模板引擎 不能写错，固定
//第二个参数：告诉express，渲染什么文件后缀的模板（这个参数必须要与上一个方法的第一个参数一致）
app.set('view engine', 'html');

//4.托管静态资源
//express.static()，参数是要托管的文件目录路径
//原理：自动帮我们判断路径的前缀，如果是我们路径前缀的请求会自动帮我们返回对应的静态资源

//第一个参数：对应的虚拟目录 （如果真的文件路径是/node_modules/jquery/dist/jquery.min.js，
//那么我们客户端就要写成/a/jquery/dist/jquery.min.js）
app.use('/node_modules',express.static(path.join(__dirname,'node_modules')));
app.use('/public',express.static(path.join(__dirname,'public')));


//5..路由
//使用路由模块 参数就是你想用的路由模块
app.use(require('./router/hero_router.js'));
// router(app);




//6.,监听端口号

app.listen(3000,function(){
    console.log('服务器启动成功');
});
