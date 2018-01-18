//路由模块：根据不同的请求分发给不同的业务处理
var controller = require('../controllers/hero_controller.js');

module.exports = function(app){
    //第一个参数 路径 第二个参数：回调函数
app.get('/',controller.showHeroList)
.get('/heroAdd', controller.showHeroAdd)
.post('/heroAdd',controller.doHeroAdd)
.get('/heroInfo',controller.showHeroInfo)
.get('/heroEdit',controller.showHeroEdit)
.post('/heroEdit',controller.doHeroEdit)
.get('/heroDelet',controller.doHeroDelet);

};

