//1.导入express
var express = require('express');

//导入控制器
var controller = require('../controllers/user_controller.js');

//2.创建路由容器
//router相当于服务期入口i文件的app的一个副本（mini-app）
var router = express.Router();

//3.路由分发(分发给C层)
router.get('/register',controller.showRegister)//显示注册界面
.post('/register',controller.doRegister)//用户注册
.get('/login',controller.showLogin)//显示登陆界面
.post('/login',controller.doLogin)//用户登陆
.get('/logout',controller.doLogout);//用户注销
//4.导出路由容器
module.exports = router;