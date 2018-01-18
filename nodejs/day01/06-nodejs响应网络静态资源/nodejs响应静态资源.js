//1.导入http模块
//参数是一个字符串，模块标识符
var http = require('http');

//导入文件读写模块
var fs = require('fs');

//2.创建服务器
var server = http.createServer();

//3.给服务器添加一个事件
/**
 * 第一个参数：事件类型  request：当服务器接收到客户端的请求时会调用
 * 回调函数  function(req,res){};
 *  * req形参：request 客户端浏览器发给服务端的
 *  * res形参：response 服务端响应给客户端
 */
server.on('request', function (req, res) {

    //服务端每接收到客户端的一次请求，就会调用一次该方法（调用多次）

    //1.请求路径一定是以'/'开头
    console.log('请求路径url' + req.url);
    console.log('请求方法url' + req.method);
    var url = req.url;

    //如果请求路径是/a，返回文本文件
    //如果请求路径是/home,返回html文件

    if (url === '/a') { //如果请求时/a

        res.writeHead(200, {
            'Content-Type': 'text/plain;charset=utf-8'
        });
        //1.先读取文件
        fs.readFile('./a.txt', 'utf-8', function (err, data) {
            if (err) {
                //抛出err对象，程序终止
                throw err;
            }

            console.log(data);
            //2.响应返回
            /**浏览器响应给客户端的数据只能是两种类型  1：字符串  2：二进制 */
            res.end(data);
        });
    }

    /**如果返回的是一个html文件，不写响应头浏览器也可以正确的解析，
    这是因为html文件自身已经写明了编码格式*/

    if (url === '/home') { //如果请求时/a
        //1.先读取文件
        fs.readFile('./home.html', function (err, data) {
            if (err) {
                //抛出err对象，程序终止
                throw err;
            }
            console.log(data);
            //2.响应返回
            /**浏览器响应给客户端的数据只能是两种类型  1：字符串  2：二进制 */
            res.end(data);
        });
    }
});


//4.监听端口号
/**
 * 第一个参数：端口号  端口号范围 0-65535
 *             * 端口号一般不能随便乱写，1024以下都是系统的程序占用的 
 * 第二个参数：ip地址 如果不写则表示为本机ip
 * 
 * ip地址的作用：找到你的电脑  端口号的作用：找到你的这台电脑上的某一个应用程序
 */
server.listen(3000, function (err) {
    console.log('服务器启动成功');
});