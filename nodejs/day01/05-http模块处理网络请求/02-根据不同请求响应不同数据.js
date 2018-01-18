//1.导入http模块
var http = require('http');

//2.创建服务器
var server = http.createServer();

//3.注册监听客户端请求的时间
server.on('request',function(req,res){
    console.log(req.url);//url路径指的是127.0.0.1:3000之后的内容
    console.log(req.method);

    //如果请求路径是home，返回welcome to go home
    //如果请求路径是blackhorse，返回 欢迎来到黑马程序员
    //如果没有请求路径,返回首页

    if(req.url === '/home'){
        res.end('welcome to home');
    }else if(req.url === '/blackhorse'){
        res.end('欢迎来到黑马程序员');
    }else if(req.url === '/'){
        //如果客户端没有路径，则req.url就只有一个'/'
        res.end('通常没有路径的话表示进入的是网站的首页')
    }
    else{
        res.end('404 not found' + req.url);
    }
});

//4.监听端口号

server.listen(5200,function(){
    console.log('启动成功');
})