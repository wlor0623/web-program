//1.导入http模块
var http = require('http');
//读取文件模块
var fs = require('fs');

//2.创建服务器
var server = http.createServer();

//3.服务端接收客户端请求
//注册一个监听请求事件
server.on('request',function(req,res){

    //
    //输出客户端的每一次请求
    console.log(req.url);
    //(1)判断客户端请求路径
    if(req.url === '/'){
        //（2）读取静态文件
        fs.readFile('./index.html',function(err,data){
            if(err){
                throw err;
            }
            //(3)响应返回文件数据
            res.end(data);
        });
    }
    if(req.url === '/index.css'){
        //（2）读取静态文件
        fs.readFile('./index.css',function(err,data){
            if(err){
                throw err;
            }
            //(3)响应返回文件数据
            res.end(data);
        });
    }

    if(req.url === '/images/01.gif'){
        //（2）读取静态文件
        fs.readFile('./images/01.gif',function(err,data){
            if(err){
                throw err;
            }
            //(3)响应返回文件数据
            res.end(data);
        });
    }
    if(req.url === '/images/01.jpg'){
        //（2）读取静态文件
        fs.readFile('./images/01.jpg',function(err,data){
            if(err){
                throw err;
            }
            //(3)响应返回文件数据
            res.end(data);
        });
    }

});

//4.监听端口号
server.listen(3001,function(){
    console.log('服务器启动成功');
});