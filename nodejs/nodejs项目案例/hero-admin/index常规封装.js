//1.导入http模块
var http = require('http');
//读取文件模块
var fs = require('fs');
//路径模块
var path = require('path');

//模板引擎模板
var template = require('art-template');

//2.创建服务器
var server = http.createServer();

//3.服务端接收客户端请求
//注册一个监听请求事件
server.on('request', function (req, res) {

    var url = req.url;
    var method = req.method;
    console.log(url + ':' + method);

    //设计路由
    if (url === '/' && method === 'GET') {
        //显示首页
        /**思路分析
         *  * （1）读取首页heroList.html模板
         * （2）读取json文件数据
         * （3）模板引擎渲染
         * （4）返回已经渲染了数据的的html文本
         */

        //  //（1）读取首页html模板
        //  fs.readFile('./views/heroList.html','utf-8',function(err,tpldata){
        //     if(err){
        //         res.end('template not found' + 'heroList.html');
        //     }
        //     // res.end(data);
        //     //console.log(tpldata);
        //     //(2)读取html模板成功之后，读取数据
        //     fs.readFile('./hero.json','utf-8',function(err,jsondata){
        //         if(err){
        //             res.end('jsondata not found' + 'hero.json');
        //         }
        //         //(3)使用模板引擎渲染（将json数据渲染到html模板中）
        //         //文件读取的是一个字符串,而模板引擎方法的参数是对象，所以要把json字符串转成json对象
        //         var jsonObjc = JSON.parse(jsondata);
        //         //console.log(jsondata);
        //         //第一个参数：html字符串 第二个参数是json对象
        //         //返回值是一个渲染好的html文本
        //        var htmlStr = template.compile(tpldata)(jsonObjc);
        //         //(4)响应返回渲染好的html文本
        //        res.end(htmlStr);

        //     })
        //  });

        renderHTML('heroList', 'hero', res);

    } else if (url === '/heroAdd' && method === 'GET') {
        //显示添加英雄界面
    } else if (url === '/heroAdd' && method === 'POST') {
        //添加英雄到数据库
    } else if (url === '/heroInfo' && method === 'GET') {
        //显示英雄详情界面
    } else if (url === '/heroEdit' && method === 'GET') {
        //显示编辑英雄界面
    } else if (url === '/heroEdit' && method === 'POST') {
        //修改英雄
    } else if (url === '/heroDelet' && method === 'GET') {
        //删除英雄
    } else if ((url.indexOf('/node_modules') === 0) || (url.indexOf('/public') === 0)) {
        //访问开放的静态资源（第三方模块 publick文件夹下内容）
        //无需逻辑处理，读取对应路径的资源文件响应返回即可
        fs.readFile(path.join(__dirname, url), function (err, data) {
            if (err) {
                //真实项目，不应该抛出异常，一旦抛出服务器就停止，这里我们应该返回客户端错误原因
                res.end('file not found' + url);
            }

            res.end(data);
        });
    } else {
        //如果客户端请求的错误的路径我们返回404错误
        res.end('404 not found' + url);
    }

});

/**
 * 模板引擎渲染函数
 * @param {*} tplname  html模板的文件名
 * @param {*} jsonname json的文件名
 */
function renderHTML(tplname, jsonname, res) {

    var tplFileName = './views/' + tplname + '.html';
    var jsonFileName = './' + jsonname + '.json';

    //（1）读取首页html模板
    fs.readFile(tplFileName, 'utf-8', function (err, tpldata) {
        if (err) {
            res.end('template not found' + tplFileName);
        }
        // res.end(data);
        //console.log(tpldata);
        //(2)读取html模板成功之后，读取数据
        fs.readFile(jsonFileName, 'utf-8', function (err, jsondata) {
            if (err) {
                res.end('jsondata not found' + jsonFileName);
            }
            //(3)使用模板引擎渲染（将json数据渲染到html模板中）
            //文件读取的是一个字符串,而模板引擎方法的参数是对象，所以要把json字符串转成json对象
            var jsonObjc = JSON.parse(jsondata);
            //console.log(jsondata);
            //第一个参数：html字符串 第二个参数是json对象
            //返回值是一个渲染好的html文本
            var htmlStr = template.compile(tpldata)(jsonObjc);
            //(4)响应返回渲染好的html文本
            res.end(htmlStr);

        })
    });

}

//4.监听端口号
server.listen(3000, function () {
    console.log('服务器启动成功');
});