//1.导入http模块
var http = require('http');
//读取文件模块
var fs = require('fs');

//2.创建服务器
var server = http.createServer();

//3.服务端接收客户端请求
//注册一个监听请求事件
server.on('request', function (req, res) {

    //输出客户端的每一次请求
    console.log(req.url);
    //(1)判断客户端请求路径
    if (req.url === '/a/b/c/d') {
        //（2）读取静态文件
        fs.readFile('./index.html', function (err, data) {
            if (err) {
                throw err;
            }
            //(3)响应返回文件数据
            res.end(data);
        });
    }
    //参数的字符串在req.url中的下标
    console.log(req.url.indexOf('/public'));

    if (req.url.indexOf('/public') === 0) { //如果url路径是以publick开头，则表示请求时publick路径下的内容
        fs.readFile('.' + req.url, function (err, data) {
            if (err) {
                throw err;
            }
            //(3)响应返回文件数据
            res.end(data);
        });
    }

});

//4.监听端口号
server.listen(3000, function () {
    console.log('服务器启动成功');
});