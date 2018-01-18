//路由模块：根据不同的请求分发给不同的业务处理
var controller = require('../controllers/hero_controller.js');


//路由容器的用法

//1.导入express模块
var express = require('express');

//2.使用路由容器创建一个路由容器（子服务器app）
    //此时router就相当于一个mini-app，它拥有app所有的功能

var router = express.Router();

    //第一个参数 路径 第二个参数：回调函数
router.get('/',controller.showHeroList)
.get('/heroAdd', controller.showHeroAdd)
.post('/heroAdd',controller.doHeroAdd)
.get('/heroInfo',controller.showHeroInfo)
.get('/heroEdit',controller.showHeroEdit)
.post('/heroEdit',controller.doHeroEdit)
.get('/heroDelet',controller.doHeroDelet);

//3.模块导出路由容器
module.exports = router;

