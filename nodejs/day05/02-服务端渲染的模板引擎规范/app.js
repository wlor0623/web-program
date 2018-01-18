var express = require('express');

var fs = require('fs');

var template = require('art-template');

var app = express();

app.get('/',function(req,res){

    fs.readFile('./test.html','utf-8',function(err,tpldata){
        var objc = {
            name:'张三',
            age:18,
            address:'中粮'
        }

        var objc1 = {
            gender:"男"
        }

        //在服务端渲染中，由于一个html模板中往往需要渲染多个对象，所以最好将要渲染的json对象包一层
        var htmlStr = template.compile(tpldata)({
            zhangsan : objc,
            lisi : objc1//key:value  key：模板语法中的对象  value：要渲染的数据
        });

        res.send(htmlStr);
    })
    
});

app.listen(3000,function(){
    console.log('success');
});