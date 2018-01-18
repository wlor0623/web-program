

//模型模块：负责模型数据的增删改查

var fs = require('fs');

var path = require('path');

var model = module.exports;

var modelPath = path.join(path.parse(__dirname).dir,'hero.json');

getAllData = function(callback){
    fs.readFile(modelPath,'utf-8',function(err,data){
        
        callback(err,data);
    });
}



/**1.添加英雄
 * hero:要添加的英雄
 * callback 添加回调  function(err){}
 */
model.addHero = function(hero,callback){
    //1.读取所有的英雄
        // 1.1如果读取失败，则直接调用callback返回
    getAllData(function(err,data){
        if(err){
            //1.1 如果读取失败则告诉controller失败
            callback(err);
        }

        //2.将json字符串转成json对象
        var jsonObjc = JSON.parse(data);

        //3.添加英雄到数据库
        hero.id =  jsonObjc.heros.length + 1;
        jsonObjc.heros.push(hero);

        //4.将json对象转成json字符串
        //stringify() 第一个参数：json对象  第二个参数：替换函数 一般为null  第三个参数：文本缩进
        var jsonStr = JSON.stringify(jsonObjc,null,'  ');
        //5.写入文件
        fs.writeFile(modelPath,jsonStr,function(err){
            if(err){
                callback(err);
            }

            //6.写入成功
            callback(null);
        });
    })
}

//2.查询英雄
/**
 * 
 * @param {*} id  英雄id，字符串（浏览器提交的数据只有两种类型字符串和二进制）
 * @param {*} callback 查询结果回调 funtion（err,hero）{}; err:错误 hero：查询到的英雄对象
 */
model.fetchHeroById = function(id,callback){

    //获取到的参数id是字符串类型，但是json文件中存储的id是int类型，所以需要需要将字符串转为int
    var heroID = parseInt(id);

    //1.读取所有英雄
    getAllData(function(err,data){
         //1.1 如果读取出错，则直接告诉controller操作失败
         if(err){
            callback(err);
        }

        //2.将json字符串转为json对象
        var jsonObjc = JSON.parse(data);

        //3.便利英雄数组，找出id一致的哪一个对象
        /**
         * forEach:一旦开始，则会从头遍历为尾部，无法终止
         * some：一旦开始，默认会从头遍历到尾部，但是可以通过return true或者false来决定是否需要继续遍历
         *  * return true，跳出循环不再遍历 节省循环性能
         * filletr：过滤循环 指定一个循环条件，通过循环查找满足条件的所有数据  一旦开始遍历无法结束（从头到尾）  
         */
        jsonObjc.heros.some(function(hero){
            
            // console.dir(hero);
            if(heroID === hero.id){
                //4.查询到数据
                callback(null,hero);
                //5.为了节省性能，当查询到想要的数据之后就可以结束循环
                return true;
            }
        });
    });

}

//3.修改英雄

/**
 * 
 * @param {*} hero 要修改的英雄
 * @param {*} callback 修改完成回调  function（err）{};成功或者失败
 */
model.updateHero = function(hero,callback){

    //客户端浏览器提交的参数都是字符串，这里需要转为int
    var heroID = parseInt(hero.id);
    hero.id = heroID;


    //1.查询所有英雄，得到英雄列表json对象
    fs.readFile(modelPath,'utf-8',function(err,data){
        //1.1
        if(err){
            callback(err);
        }

        //1.2 将json字符串转为json对象
        var jsonObjc = JSON.parse(data);

         //2.匹配id如果一致，则修改数组对应下标的内容

         //常规思路，遍历数组，找到id一致然后修改
         //非常规思路，涉及到对api的理解程度
         //第一个参数：从哪一个下标开始删除  第二个参数：要删除的数量 第三个参数之后所有的参数：从删除的开始开始添加
         jsonObjc.heros.splice(heroID-1,1,hero);//这里之所以-1 是因为数组下标是从0开始，英雄id是从1开始

         //3.将修改后的json对象写入文件

         //3.1 将json对象转为json字符串
         var jsonStr = JSON.stringify(jsonObjc,null,'  ');
         //3.2写入文件
         fs.writeFile(modelPath,jsonStr,function(err){
            if(err){
                callback(err);
            }
            //编辑成功
            callback(null);
         });
    })
}

//4。删除英雄

model.deletHeroByID = function(id,callback){
    //将id字符串转为int
    var heroID = parseInt(id);
    //1.读取所有的数据
    fs.readFile(modelPath,'utf-8',function(err,data){
         //1.1
         if(err){
            callback(err);
        }
        //1.2 将json字符串转为json对象
        var jsonObjc = JSON.parse(data);

        //2.删除指定id下标的数据
        jsonObjc.heros.splice(heroID-1,1);

         //3.将下标在id之后的英雄id往前移一位 
         jsonObjc.heros.forEach(function(hero){
             //3.1.如果遍历中的hero的id要比参数id大，则hero的id要减去1
             if(hero.id > heroID){
                 hero.id -= 1;
             }
         });

         var jsonStr = JSON.stringify(jsonObjc);
         //4.将删除后的json对象写入数据库
          fs.writeFile(modelPath,jsonStr,function(err){
            if(err){
                callback(err);
            }
            //编辑成功
            callback(null);
         });

    })
    
   
}