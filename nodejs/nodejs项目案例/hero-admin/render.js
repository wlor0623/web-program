//渲染模块：给响应对象添加一个渲染函数

var fs = require('fs');

//模板引擎模板
var template = require('art-template');


/**
 * 给响应对象res动态添加一个函数
 */

module.exports = function(res) {
    //这行代码的本质就是将一个匿名函数赋值给一个对象的属性
    /**
     * 
     * @param {*} tplname  模板文件名名
     * @param {*} jsonname 如果是文件名，则读取json数据渲染  如果是一个对象，则直接渲染对象  如果为空 则直接返回html模板
     */
    res.render = function (tplname, jsonname) {

        var tplFileName = './views/' + tplname + '.html';
        var jsonFileName = './' + jsonname + '.json';

        //（1）读取首页html模板
        fs.readFile(tplFileName, 'utf-8', function (err, tpldata) {
            if (err) {
                res.end('template not found' + tplFileName);
            }
            // res.end(data);
            //console.log(tpldata);

            //（2）如果jsonname不是一个文件路径，而是一个对象，则无需读取该文件路径的数据，而是直接渲染该对象
            if(typeof jsonname !== 'string'){

                console.log('此时渲染的是一个对象'+ jsonname);
                // 2.1 直接渲染该对象
                var htmlStr = template.compile(tpldata)(jsonname);
                //2.2 响应返回
                res.end(htmlStr);
                //该函数结束
                return;

            }

            //(3)读取html模板成功之后，读取数据
            fs.readFile(jsonFileName, 'utf-8', function (err, jsondata) {
                if (err) {
                    // console.log(tplFileName);
                    // console.log(jsonFileName);
                    //如果没有json数据，则直接返回html模板
                    //业务逻辑：有一些html模板不需要模板引擎渲染
                    //当是英雄添加界面，没有json数据直接返回模板，此时需要调用retrun结束该函数
                    res.end(tpldata);
                    return;
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
}