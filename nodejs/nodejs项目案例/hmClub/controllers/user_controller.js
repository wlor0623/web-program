var controller = module.exports;
//获取index的控制器，目的：注销时直接调用它的刷新首页的方法
var indexController = require('./index_controller.js')

var UserModel = require('../models/index_model.js').User;

var errHandler = require('../errHandle.js');
//1.显示注册界面
controller.showRegister = function (req, res) {
    res.render('register.html');
}

//2.用户注册
controller.doRegister = function (req, res) {
    /**
     * * （1）获取post请求数据
     * （2）查询数据库 根据邮箱
     * 如果该邮箱已经在数据库，则返回邮箱已存在
     * 如果该邮箱不再数据库，则进行下一步
     * （3）将post请求的数据添加到数据库
     * （4）响应返回处理结果
     */

    //1.获取post请求数据
    var body = req.body;
    // console.dir(body);
    //2.根据邮箱查询数据库
    UserModel.find({
        email: body.email
    }, function (err, doc) {
        //  console.log(err);
        //  console.log(doc);
        //这里只能根据doc是否存在来判断，不能根据err来判断
        //err只是表示数据库的操作过程是否失败，与结果无关

        if (doc.length === 0) {

            //3.数据库中没有该邮箱，则添加到数据库
            UserModel.create(body, function (err) {
                if (err) {
                    //添加出错，code应该是500
                    res.json(errHandler(500, err));
                }
                //4.注册成功
                res.json(errHandler(2000));
            });
        } else {
            //如果doc有数据不存在则表示查询成功，查询成功就意味着数据中已经有同样邮箱的帐号。此时注册失败返回邮箱已存在
            res.json(errHandler(2001));
        }

    });
}

//3.显示登陆界面
controller.showLogin = function (req, res) {

    res.render('login.html');

}

//4.用户登陆
controller.doLogin = function (req, res) {
    /**思路分析
     * * （1）获取post请求数据
     * （2）先查询邮箱是否存在
     * 如果邮箱不存在，直接响应返回用户名或者密码错误
     * 如果邮箱存在，下一步
     * （3）匹配密码是否与该邮箱一致
     * 如果密码与邮箱不匹配，直接响应返回用户名或者密码错误
     * 如果匹配则返回登陆成功
     */

    //1.获取post请求参数
    var body = req.body;
    //2.查询邮箱
    UserModel.find({
        email: body.email
    }, function (err, doc) {
        if (err) {
            //如果操作数据库失败则直接返回服务器报错
            res.json(errHandler(500));
        } else {
            if (doc.length === 0) {
                //2.1 找不到邮箱，直接返回用户名或者密码错误
                res.json(errHandler(1001));
            } else {
                console.log(doc);
                //3.继续匹配密码  doc是一个数组
                if (body.password === doc[0].password) { 
                    //3.1 匹配成功，登陆成功

                    //登陆成功之后，将用户信息写入到cookie
                    //一旦配置了cookiesession的中间件，req就有一个属性叫做session，他是一个json对象
                    //这里我们可以随便写一个属性来存值，用什么存就用什么取
                    req.session.user = doc[0];

                    res.json(errHandler(1000));
                } else {
                    //3.2密码错误，直接返回用户名或者密码错误
                    res.json(errHandler(1001));
                }
            }
        }

    });

}

//4.用户注销
controller.doLogout = function (req, res) {
    console.log(req.url);
    //1.销毁当前用户的cookie,赋值的是什么属性就操作什么属性
    req.session.user = null;
    //2.刷新首页 (服务端重新刷新首页  等同于客户端的这一行代码 window.location.href= '/')
    indexController.showIndex(req,res);

}