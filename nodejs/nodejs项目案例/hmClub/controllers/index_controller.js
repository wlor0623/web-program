var indexModel = require('../models/index_model.js');

var errHandler = require('../errHandle.js');

//导入moment模块
var moment = require('moment');
//moment默认是英文，要想支持中文需要设置国际化
moment.locale('zh-cn');

var controller = module.exports;

//1.显示首页
controller.showIndex = function(req,res){

    //配置模板引擎之后，所有的res对象都有一个render函数
    //第一个参数：模板文件名（views文件夹下） 第二个参数：要渲染的json对象，如果不传则直接响应返回模板文本
    // res.render('index.html');

    /**思路分析
     * 1.读取数据库所有数据
     * 2. 模板引擎渲染
     * 3.响应返回渲染好的html文本
     */


     //1.读取数据库所有数据
     indexModel.Article.find(function(err,docs){
        if(err){
            res.json(errHandler(500,err));
        }
        
        //console.log(docs);
        //2.3.  一行代码
        //由于数据库默认的是UTC时间，所以这里不能直接渲染，需要先将时间转化之后再渲染
        docs.forEach(function(item){
            //getTime()函数的作用是将一个时间格式的字符串转成时间戳，单位是毫秒以1970年1月1日0点为准
           // console.log(item.updatedAt.getTime());
            //moment官方API  moment()将一个时间戳转成moment格式的时间
           // console.log(moment(item.updatedAt.getTime()));
            //时间格式转换
            //这里相当于动态的给数据库中的对象添加一个时间的属性，该属性只用于模板引擎渲染显示
            item.localTime = moment(item.updatedAt.getTime()).startOf('second').fromNow(); // 4 years ago
        });

        res.render('index.html',{
            articles : docs,  //key=value  key：模板语法中的占位对象  value：渲染的数据
            user : req.session.user //将用户的cookie传入模板（作用就是根据登陆状态显示不同的UI）
        });

     });

}

//2.搜索文章
controller.doIndexSearch = function(req,res){
    /**
     * 1.获取参数
     * 2.查询数据库
     * 3.重新使用查询到的数据来渲染首页模板
     *          * 搜素与首页唯一的区别就是：首页渲染的是数据库所有数据，搜索只渲染搜索到的数据
     */

     //1.获取参数
     var searchStr = req.query.searchStr;
     //2.条件查询
     var regexp = new RegExp(searchStr,"i");

     indexModel.Article.find({title:regexp},function(err,docs){
        if(err){
            res.json(errHandler(500));
        }else{

            console.log(docs);
            //搜索的时候我们再使用模板引擎渲染的时候，需要将用户提交的搜索字符串也渲染到模板中，否则搜索框文本会被清空
            res.render('index.html',{
                articles:docs,
                user:req.session.user,
                searchStr : searchStr
            });
        }
     });

}

//3.文章分页
controller.doIndexPage = function(req,res){
    
}