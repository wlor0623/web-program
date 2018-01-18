//准备工作：导入模块

var express = require('express');
//文件路径模块
var path = require('path');
//文件读写模块
var fs = require('fs');


//1.创建服务器
var app = express();

//2.托管静态资源
//第一个参数：客户端静态资源请求前缀  第二个参数：要托管的静态资源文件路径  
app.use('/node_modules',express.static(path.join(__dirname,'node_modules')));
app.use('/public',express.static(path.join(__dirname,'public')));

//3.配置模板引擎（默认会从项目根目录下的views文件夹查找模板文件）
//第一个参数：设置模板文件的后缀名 第二参数：模板引擎渲染的第三方模块
app.engine('html',require('express-art-template'));
//第一个参数：模板引擎 view engine  第二个参数与上一行代码第一个参数一致
app.set('view engine','html');

//4.挂载中间件

//4.1-解析post请求的中间件
//导入bodyparser  一旦挂载时候我们所有的req就会有一个属性req.body可以获取post请求的参数
//细节：body-parser只能解析普通文本数据，如果是文件还是需要formidable
var bodyParser = require('body-parser');
//挂载中间件
app.use(bodyParser.urlencoded({ extended: false }));

//4.2 挂载网站图标的中间件
var favicon = require('serve-favicon');
//参数就是网站图标的文件路径
app.use(favicon(path.join(__dirname, 'public','img', 'hmclub.ico')));

//4.3 挂载cookie-session中间件
var cookieSession = require('cookie-session')

app.use(cookieSession({
  name: 'session_id',
  keys: ['1111111'],//cookieSession默认会对cookie做加密，这里的key就是加密的密钥

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours  //cookie有效期
}));

//5.路由分发

//查看请求路径的中间件
app.use(function(req,res,next){
    console.log('请求路径' + req.url);
    //1.如果是get请求，express自带有一个req.query属性，这是一个get参数对象
   // console.log('get请求的参数' + req.query);
    //2.如果是post请求，我们使用了body-parser中间件之后，req就有一个req.body的属性可以获取post请求的参数
   // console.log('post请求的参数' + req.body);
   // console.log(req.session);
    //流向下一个中间件
    next();
})

//app.use(路由容器)
//var indexRouter = require('./router/index_router.js');
app.use(require('./router/index_router.js'));
app.use(require('./router/article_router.js'));
app.use(require('./router/user_router.js'));


//快速测试服务器是否通畅

/*
app.get('/',function(req,res){
    //读取首页模板
    fs.readFile('./views/index.html','utf-8',function(err,data){
            if(err){
                throw err;
            }

            res.send(data);
    })
})
*/


//6.监听端口号
app.listen(3000,function(){
    console.log('欢迎来到黑马大前端俱乐部');
});
