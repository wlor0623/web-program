//导入模块
var mongoose = require('mongoose');

/**1.连接数据库  参数是：连接的路径 mongodb：mongodb数据库服务 
 127.0.0.1：ip（端口号可以省略因为默认的就是27017）
 heroAdmin：数据库名称
 */
mongoose.connect('mongodb://127.0.0.1/heroAdmin');

//2.创建schema
//确定数据库的存储结构
var heroSchema = mongoose.Schema({
    name:String,
    age:{type:Number,min:1,max:100},//数据类型是Number，最小值：1 最大值：100
    date:{type:Date,default:Date.now()}//数据类型是时间Date，默认值是当前操作时间（保存到数据库的时间）
});

//console.log(heroSchema.obj);

//3.创建模型model(mongoose会自动将首字母小写，并且是复数的形式（后面加s）存储heros)
//集合collections
/**
 * 第一个参数：集合的名称
 * 第二个参数：集合中文档的数据结构（Schema）
 */
var Hero = mongoose.model('heros',heroSchema);

//4.创建实体Entity
//文档document
//可以在插入数据库时指定实体
/**
 * model：模型相当于js中的一个类calss
 * entity：实体相当于models这个类的实例化对象
 */
var zhangsan = new Hero({
    name:'李四',
    age:20
});

/******************************mongoose中数据库的增删改查是由model模型负责的   */

//5.插入数据库
/**
 * 第一个参数：要插入的对象
 * 插入的回调函数：function(err){};
 *  * mongoose操作数据库都是异步（与nodejs的特点一致）
 */

 /*
Hero.create(zhangsan,function(err){
    if(err){
        console.log('插入失败' + err);
    }

    console.log('插入成功');
})
*/


//6.查询操作
/**
 * 第一个参数：查询条件，如果不写则查询所有数据
 * 第二个参数：查询回调 function(err,docs){}；err：错误信息  docs：查询结果
 */
//find()方法查询的数据是满足所有条件的集合
// Hero.find({name:'张三'},function(err,docs){
//     if(err){
//         console.log('错误' + err);
//     }

//     console.log(docs);
// })

//findOne()的用法与find（）一模一样，唯一的区别是findOne只会查找第一个满足条件的数据
/*
Hero.findOne({name:'张三'},function(err,docs){
    if(err){
        console.log('错误' + err);
    }

    console.log(docs);
});
*/

//通过每一个文档对象document的唯一id（mongoose默认添加的唯一标识符）来查询
/*
Hero.findById('5a167f654b83521d00bd369a',function(err,doc){
    if(err){
        console.log('错误' + err);
    }

    console.log(doc);
});
*/


/************************************7.更新数据库 */
/**更新数据库
 * 第一个参数：更新条件
 * 第二个参数：要更新的数据
 * 第三个参数：回调函数  function(err,docs){};err:错误信息  docs：更新结果，如果要获取数据需要自己查询
 */

 //会修改查询到所有满足条件的数据
 /*
Hero.update({name:'张三'},{name:'隔壁老宋'},function(err,docs){
    if(err){
        console.log('错误' + err);
    }
    console.log('这是更新结果'
    + docs);
});
*/

/**更新满足条件的第一个数据，用法与update
 * 
 */
/*
Hero.findOneAndUpdate({name:'李四'},{name:'隔壁老张'},function(err,docs){
    if(err){
        console.log('错误' + err);
    }
    console.log('这是更新结果'+ docs);
});
*/

/**********************************8.删除操作 */
/**
 * 第一个参数：删除条件
 * 第二个参数：删除回调 function(err,docs){};err:错误信息  docs：删除结果
 */

 //删除满足所有条件的数据
Hero.remove({name:'隔壁老宋'},function(err,docs){
    if(err){
        console.log('错误' + err);
    }
    console.log('这是更新结果'+ docs);
});

//删除满足条件的第一个数据
Hero.findOneAndRemove();
