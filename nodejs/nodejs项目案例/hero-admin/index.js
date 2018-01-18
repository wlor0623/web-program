

//1.导入http模块
var http = require('http');


//导入路由模块

var router = require('./router.js');


//2.创建服务器
var server = http.createServer();

//3.服务端接收客户端请求
//注册一个监听请求事件
server.on('request', function (req, res) {

    //路由模块负责分发请求
    router(req,res);
});



//4.监听端口号
server.listen(3000, function () {
    console.log('服务器启动成功');
});