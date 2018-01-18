                           //1.导入http模块
var http = require('http');

//2.创建服务器
var server = http.createServer();

//3.注册监听客户端请求的时间
server.on('request',function(req,res){
    console.log(req.url);//url路径指的是127.0.0.1:3000之后的内容
    console.log(req.method);

    //服务端响应数据给客户端
    // //(1)响应对象写入数据
    // res.write('i love you you');
    // //(2)一定要告诉客户端本次响应结束，否则客户端会一直转圈等待响应结束，知道响应超时
    // res.end();

    //上面两个步骤可以简写成一行代码
    res.end('i love you you');
});

//4.监听端口号

server.listen(5200,function(){
    console.log('启动成功');
})