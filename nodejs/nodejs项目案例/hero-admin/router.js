//路由模块：根据不同的请求分发给不同的业务处理

//渲染模块
var renderModule = require('./render.js');
//业务处理模块
var controller = require('./controller.js');

//导入url模块解析请求路径
var url = require('url');

module.exports = function(req,res){
    //如果请求路径有中文，浏览器会自动进行URI编码，这里需要解码才可以得到中文
    // var url = decodeURI(req.url);
    //1.使用url模块解析请求路径（url模块会自动帮我们解码中文）
    var urlObjc = url.parse(req.url,true);
    // console.dir(urlObjc);
    // console.log('请求路径' + urlObjc.pathname);
    //将解析到的参数对象复制给req的query，下一次使用时就可以直接使用req.query
    //这样写的目的时提交代码的辨识度
    req.query = urlObjc.query;
    //2.请求的路径
    var pathname = urlObjc.pathname;
    //3.请求方法
    var method = req.method;
    // console.log(url + ':' + method);
    //给res对象添加一个渲染函数的方法，方法的参数就是相应对象
    //响应对象res的作用域是在server.on（）方法中，外部无法获取，所以这里需要传参
    //调完这行代码之后，res对象就已经有了一个render的函数
    renderModule(res);
    
    //设计路由
    if (pathname === '/' && method === 'GET') {
        //显示首页
        controller.showHeroList(req,res);
    
    } else if (pathname === '/heroAdd' && method === 'GET') {
        //显示添加英雄界面
        controller.showHeroAdd(req,res);  
    } else if (pathname === '/heroAdd' && method === 'POST') {
        //添加英雄到数据库
        controller.doHeroAdd(req,res);
    } else if (pathname === '/heroInfo' && method === 'GET') {
        //显示英雄详情界面
        controller.showHeroInfo(req,res);
    } else if (pathname === '/heroEdit' && method === 'GET') {
        //显示编辑英雄界面
        controller.showHeroEdit(req,res);
    } else if (pathname === '/heroEdit' && method === 'POST') {
        //修改英雄
        controller.doHeroEdit(req,res);
    } else if (pathname === '/heroDelet' && method === 'GET') {
        //删除英雄
        controller.doHeroDelet(req,res);
    } else if ((pathname.indexOf('/node_modules') === 0) || (pathname.indexOf('/public') === 0)) {
        controller.showStatic(req,res);
    } else {
        //如果客户端请求的错误的路径我们返回404错误
        res.end('404 not found' + pathname);
    }
}