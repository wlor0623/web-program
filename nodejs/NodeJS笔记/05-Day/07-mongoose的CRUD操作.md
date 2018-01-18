# mongoose的CRUD操作

* ***上一小节中我们讲解了在mongoose中增删改查操作主要是由模型model来负责的***
    * entity实体虽然也可以操作数据库，但是只能操作自身
        * 用的最多的就是save()方法来保存数据库

* ***本小节我们使用model来进行数据库的CRUD操作***

```javascript

//导入模块
var mongoose = require('mongoose');

//1.连接数据库  useMongoClient: true表示是一个新的客户端 false表示是当前客户端  一般不写 第一次连接默认就是新的客户端
mongoose.connect('mongodb://localhost/itheima', { useMongoClient: true });

//2.创建schema（schema的作用是确定你的数据存储结构）

var heroSchema = mongoose.Schema({
	name : String,
	gender : String,
	age : {type:Number,min:1,max:100},//指定一个年龄属性，数据类型为数字，最小值为1，最大值为100
	date : {type:Date,default:Date.now}//指定一个时间属性，数据类型为时间，默认值为当前时间
});

console.log(heroSchema.obj);

//2.创建Model   第一个参数是模型的名称（相当于集合mongodb中的collections,mongodb会自动将该字段变成小写复数形式heros）  第二个参数是schema（执行该集合下的数据存储结构）
var heroModel = mongoose.model('hero',heroSchema);

//3.创建实体Entity（相当于mongodb中的一条记录，每一条记录都是一个对象）
//Model只是定义了集合的名称和数据存储结构，而该集合下的每一条记录都可以理解为是Model的一个实例对象
var kitty = new heroModel({name:'李四',gender:'男',age:50});


/*******************    .添加数据  **********************/


//第一个参数：要添加的实体 第二个参数：添加回调
heroModel.create(kitty,function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
  }
});

/*************   查询数据  **************/

//第一个参数：查询条件 第二个参数查询回调(查询所有符合条件的实体)
heroModel.find({name:'张三'},function(err,docs){
	if (err) {
		throw err;
	}
	console.log(docs);
});

//根据id来查询数据(id是mongoose自动加上的唯一的标识符，所以查询到的是唯一的数据)
heroModel.findById('59e4275ba9c83856d8eeb6c0',function(err,docs){
	if (err) {
		throw err;
	}
	console.log(docs);
});

// //根据条件查询找到的第一个满足条件的数据

heroModel.findOne({name:'墨子'},function(err,docs){
	if (err) {
		throw err;
	}
	console.log(docs);
});


/*************   更新数据  **************/

//第一个参数：查询条件  第二个参数：要修改的数据（与mongodb的区别是不会完全替换只会更改这一个属性）  第三个参数：完成回调
//此方法只能修改找到的第一个文档数据
//其他的更新一个数据的方法还有findOneAndUpdate和findByIdAndUpdate
heroModel.update({name:'张三'},{age:50},function(err,docs){
	if (err) {
		throw err;
	}
	console.log(docs);
});


// //更新满足条件的所有数据 
heroModel.updateMany({name:'张三'},{age:50},function(err,docs){
	if (err) {
		throw err;
	}
	console.log(docs);
});

/****************   删除数据   *********************/


//删除所有满足条件的数据
//第一个参数：查询条件 第二个参数：删除回调
heroModel.remove({name:'张三'},function(err,docs){
	if (err) {
		throw err;
	}
	console.log(docs);
});

//只删除满足条件的找到的第一条数据
heroModel.deleteOne({name:'李四'},function(err,docs){
	if (err) {
		throw err;
	}
	console.log(docs);
});

```