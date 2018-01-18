//1.导入http模块
var http = require('http');
//读取文件模块
var fs = require('fs');

//导入模板引擎模块
var art_template = require('art-template');

var path = require('path');

//2.创建服务器
var server = http.createServer();

//3.服务端接收客户端请求
//注册一个监听请求事件
server.on('request', function (req, res) {
    //
    //输出客户端的每一次请求
    console.log(req.url);
    //(1)判断客户端请求路径
    if (req.url === '/') {
        //（2）读取静态文件
        fs.readFile('./index.html', function (err, data) {
            if (err) {
                throw err;
            }
            //(3)响应返回文件数据
            res.end(data);
        });
    }

    //通过判断路径的前缀，返回某一个文件夹下的资源
    if (req.url.indexOf('/node_modules') === 0) {
        fs.readFile(path.join(__dirname, req.url), function (err, data) {
            if (err) {
                throw err;
            }

            res.end(data);
        });
    }

    if (req.url === '/last' || req.url === '/next') {

        var jsonName = (req.url === '/last') ? 'zhangsan.json' : 'lisi.json';
        //1.读取html模板
        fs.readFile(path.join(__dirname, 'index.html'), 'utf-8', function (err, tpldata) {
            if (err) {
                throw err;
            }
            // console.log(tpldata);
            //2.读取要渲染的数据
            fs.readFile(path.join(__dirname, jsonName), 'utf-8', function (err, jsondata) {
                if (err) {
                    throw err;
                }
                // console.log(jsondata);

                //3.使用模板引擎渲染
                 //render参数是一个对象，读取json文件得到是一个字符串，所以这里需要将字符串转成json对象
                 var jsonObjc = JSON.parse(jsondata);
                
                // // 3.1 将模板源代码编译成函数
                // //方法参数是html模板的数据，得到的是一个渲染函数
                // var render = art_template.compile(tpldata);
                // // 将模板源代码编译成函数并立刻执行
                // //3.2调用渲染函数渲染数据　　参数：模板数据　返回值：渲染好的ｈｔｍｌ文本
                // 　var htmlStr = 　render(jsonObjc);
                // 

                //上面两个步骤可以简写成下面一行代码
                var htmlStr = art_template.compile(tpldata)(jsonObjc)
                
                // console.log(htmlStr);
                //4.响应返回给客户端渲染好的html文本
                res.end(htmlStr);

            })
        })
    }

});

//4.监听端口号
server.listen(3000, function () {
    console.log('服务器启动成功');
});