var http = require('http');


var server = http.createServer();

server.on('request',function(req,res){
    console.log(req.url);
    //1.客户端第一次请求服务器的时候，没有cookie
    //2.服务器在响应的时候给该客户端添加一个cookie
    // res.writeHead(200,{
    //     'Set-Cookie':'username=zhangsan;password=123;nickname=1111'
    // });
    //3.一旦服务端给响应头中添加了cookie，那么下一次该客户端所有的请求都会有cookie
    res.end('qing ni chi cookie');
});

server.listen(2999,function(){
    console.log('开启成功');
});