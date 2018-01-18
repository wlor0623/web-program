

//控制器：负责控制服务端的业务逻辑

//formidable
var formidable = require('formidable');

//读取文件模块
var fs = require('fs');
//路径模块
var path = require('path');

var model = require('./model.js');

var controller = module.exports;

//1.显示首页
controller.showHeroList = function (req, res) {
    //显示首页
    /**思路分析
     *  * （1）读取首页heroList.html模板
     * （2）读取json文件数据
     * （3）模板引擎渲染
     * （4）返回已经渲染了数据的的html文本
     */
    res.render('heroList', 'hero');
};

//2.显示添加英雄界面
controller.showHeroAdd = function (req, res) {
    res.render('heroAdd');
}

//3.添加英雄到数据库
controller.doHeroAdd = function (req, res) {

    //添加英雄到数据库
    /**1.formidable接收post数据
     * 2.将数据存到数据库
     * 3.响应返回保存结果
     */

    /**formidable接收文件数据用法
     * 1.将普通文本数据放入到fileds对象中
     * 2.将文件数据放入到files对象中
     * 3.会默认将文本保存到系统磁盘的临时目录中，文件名时随机的（作用：防止文件名重复）
     * 4.默认情况下 文件的存储路径path属性省略文件拓展名的
     */
    // 1.创建一个解析对象
    var form = new formidable.IncomingForm();

    //1.1 设置文件提交的目录,默认会提交到系统根磁盘临时文件夹，设置之后就会将图片提交到指定的文件目录
    form.uploadDir = "./public/images";
    //1.2 设置保留文件拓展名  默认会省略文件拓展名
    form.keepExtensions = true;
    //1.3.开始解析请求
    /**
     * 第一个参数：请求对象
     * 第二个参数：回调函数 解析完成时会调用
     *      * err:解析出错
     *      * fields 普通文本数据对象
     *      * files 文件详细信息
     */
    form.parse(req, function (err, fields, files) {


        //formidable解析完成之后，将普通的文本数据放入到fields对象中
        console.log(fields);
        //formidable解析完成之后，将文件数据放入到files对象中  该对象有一属性记录了文件的所有信息（属性就是form表单中input标签的name属性）
        console.log(files);
        //默认情况下文件名是随机的，这里我们可以通过name属性获取该上传文件的真实文件名
        /**修改文件
         * 第一个参数：原始的文件路径
         * 第二个参数： 要修改的文件路径
         * 第三个参数 ：修改完成的回调
         */
        var oldPath = path.join(__dirname, files.icon.path);
        var newPath = path.join(__dirname, form.uploadDir, files.icon.name);
        console.log('oldpath' + oldPath);
        console.log('newPath' + newPath);
        //1.4修改提交的文件名到执行的文件路径
        fs.rename(oldPath, newPath, function (err) {
            if (err) {
                throw err;
            }
            console.log('文件保存成功');

            var hero = {};
            //id是数组的长度+1

            hero.name = fields.name;
            hero.gender = fields.gender;
            hero.icon = path.join(form.uploadDir, files.icon.name);

            //2.将数据对象保存到数据库（json文件）
            model.addHero(hero, function (err) {
                if (err) {
                    //告诉客户端添加失败
                    res.end(JSON.stringify({
                        err_code: 500,
                        err_message: err.message
                    }));
                }
                //响应返回客户端添加成功
                res.end(JSON.stringify({
                    err_code: 0,
                    err_message: null
                }))
            })


        });
    });

}

//4显示英雄详情

controller.showHeroInfo = function (req, res) {

    console.log('请求的参数id' + req.query.id);

    // var hero = {
    //     id:'1',
    //     name:'zhangsan',
    //     gender:'男',
    //     icon:'public\\images\\7130bec5134682f7a53609fa398941a8.gif'
    // };

    // res.render('heroInfo',hero);

    //1.通过id查询具体的英雄（对象）
    model.fetchHeroById(req.query.id, function (err, hero) {

        //1.1如果查询出错，直接响应客户端操作失败
        if (err) {
            res.end(JSON.stringify({
                err_code: 500,
                err_message: err.message
            }));
        }

        //2.使用模板引擎，将该对象的数据渲染到html中 //3.响应返回渲染好的html
        // console.log('查询到的英雄' + hero);
        res.render('heroInfo', hero);
    });

}

//5.显示编辑界面

controller.showHeroEdit = function (req, res) {

    //1.先要查询要编辑的英雄
    model.fetchHeroById(req.query.id, function (err, hero) {
        //1.1如果查询出错，直接响应客户端操作失败
        if (err) {
            res.end(JSON.stringify({
                err_code: 500,
                err_message: err.message
            }));
        }

        //2.使用模板引擎，将该对象的数据渲染到html中 //3.响应返回渲染好的html
        // console.log('查询到的英雄' + hero);
        res.render('heroEdit', hero);
    });


}

//6.编辑英雄

controller.doHeroEdit = function (req, res) {
    //1.获取表单数据，得到要修改的英雄对象
    //1.1 创建一个formidable对象
    var form = new formidable.IncomingForm();
    //1.2 设置上传的图片路径
    form.uploadDir = './public/images';
    //1.3 设置保留拓展名
    form.keepExtensions = true;
    //1.4开始解析请求，得到 form.parse(req,function(err,fileds,filese){});
    form.parse(req, function (err, fileds, files) {
        if (err) {
            //告诉客户端编辑失败
            res.end(JSON.stringify({
                err_code: 500,
                err_message: err.message
            }));
        }

        //由于formidable解析的时候文件名是随机的，所以这里要改成用户真的文件名字
        var oldPath = path.join(__dirname,  files.icon.path);
        var newpath = path.join(__dirname, form.uploadDir, files.icon.name)
        fs.rename(oldPath, newpath, function (err) {
            if (err) {
                //告诉客户端编辑失败
                res.end(JSON.stringify({
                    err_code: 500,
                    err_message: err.message
                }));
            }

            //2.模型model来修改该英雄对象

            //2.1创建英雄对象
            var hero = {};
            hero.name = fileds.name;
            hero.gender = fileds.gender;
            hero.id = fileds.id;
            hero.icon = path.join(form.uploadDir, files.icon.name);

            //2.2 修改英雄
            model.updateHero(hero, function (err) {
                if (err) {
                    //告诉客户端编辑失败
                    res.end(JSON.stringify({
                        err_code: 500,
                        err_message: err.message
                    }));
                }

                //告诉客户端编辑成功
                res.end(JSON.stringify({
                    err_code: 0,
                    err_message: null
                }));
            })

        })



    })


}

//7.删除英雄

controller.doHeroDelet = function(req,res){
    //1.获取get请求参数（英雄id）
    var heroID = req.query.id;//这里id是字符串
    //2.让model模型删除英雄（删除某一个英雄对应的id，后面英雄的id都要前移一位）
    model.deletHeroByID(heroID,function(err){
        if (err) {
            //告诉客户端删除失败
            res.end(JSON.stringify({
                err_code: 500,
                err_message: err.message
            }));
        }

        //告诉客户端删除成功，用户首页要刷新
        //刷新首页既可以在客户端做也可以在服务端做
        //客户端：window.location.href = '/'
        //服务端：重新渲染首页
        res.render('heroList','hero');
       
    });
}


//开放文件静态资源

controller.showStatic = function (req, res) {
    //中文解码，防止请求的图片资源时中文
    var pathname = decodeURI(req.url);
    //访问开放的静态资源（第三方模块 publick文件夹下内容）
    //无需逻辑处理，读取对应路径的资源文件响应返回即可
    fs.readFile(path.join(__dirname, pathname), function (err, data) {
        if (err) {
            //真实项目，不应该抛出异常，一旦抛出服务器就停止，这里我们应该返回客户端错误原因
            res.end('file not found' + pathname);
        }

        res.end(data);
    });
}