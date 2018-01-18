//1.导入express
var express = require('express');

//导入控制器
var controller = require('../controllers/article_controller.js');

//2.创建路由容器
//router相当于服务期入口i文件的app的一个副本（mini-app）
var router = express.Router();

//3.路由分发(分发给C层)
router.get('/article/add',controller.showArticleAdd)//显示添加文章界面
.post('/article/add',controller.doArticleAdd)//添加文章到数据库
.get('/article/info',controller.showArticleInfo)//显示文章详情界面
.get('/article/Edit',controller.showArticleEdit)//显示文章编辑界面
.post('/article/Edit',controller.doArticleEdit);//编辑文章
//4.导出路由容器
module.exports = router;