//1.导入express模块
var express = require('express');

//2.创建服务器（创建一个express对象）
var app = express();

/**express第一个特点：每一个请求都是一个小方法，我们不用再一个方法server.on()中处理所有请求
 *  express自带路由
*/

app.get('/', function (req, res) {

 //响应客户都按
  res.end('Hello World!');
});

app.get('/heroEdit', function (req, res) {
    //默认如果服务端没有设置响应头则中文会乱码
    res.send('欢迎来到黑马程序员');
    
    //express框架有一个 res.send()支持中文
    /**我们可以理解 res.send()在res.end()方法基础上做一个一层拓展
     * 
     */

    //   res.writeHead(200,{
    //     'Content-Type':'text/html;charset=utf-8'
    //   });
    //   res.end('欢迎来到黑马程序员');
});

app.post('/heroEdit', function (req, res) {
    res.send('欢迎来到黑马程序员');
});

app.listen(3000, function () {
  console.log('服务器启动成功');
});