# mongoose的Schema

* Schema: 一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力

* ***mongoose 中任何任何事物都是从 Schema 开始的。每一个 Schema 对应 MongoDB 中的一个集合（collection）。Schema 中定义了集合中文档（document）的样式***
    * ***Schema、Model、Entity 的关系请牢记，Schema 生成 Model，Model 创造 Entity，Model 和 Entity 都可对数据库操作造成影响，但 Model 比 Entity 更具操作性***
        * 学习网站:<http://cnodejs.org/topic/595db14e1b534b4408190a17>、<http://ourjs.com/detail/53ad24edb984bb4659000013>

* [1.1-Schema支持的数据类型](#1.1)
* [1.2-SchemaType Options验证功能](#1.2)
* [1.3-Schema常见约束验证示例演示](#1.3)
* [1.4-Schema一些实用的特殊用法](#1.4)
* [1.5-完整代码](#1.5)


## <h2 id=1.1>1.1-Schema支持的数据类型</h2>

* ***基本上Schema支持所有的数据类型之外，还拓展了一些自己的数据类型***
    * 开发中除了常用的几个，其他几个用的很少

* Buffer  和 ArrayBuffer 是 Nodejs 两种隐藏的对象，相关内容请查看 [NodeJS-API]<http://nodejs.cn/api/buffer.html>

* Schema.Types.Mixed是Mongoose定义个混合类型，该混合类型如果未定义具体形式。因此,如果定义具体内容，就直接使用{}来定义，以下两句等价
    * ` var AnySchema = new Schema({any:{}});`
    * `var AnySchema = new Schema({any:Schema.Types.Mixed});`

* Schema.Types.ObjectId:主键，不指定的情况下默认会配置成`_id`属性

```javascript

var schema = new Schema({
  name:    String,
  binary:  Buffer,
  living:  Boolean,
  updated: { type: Date, default: Date.now },
  age:     { type: Number, min: 18, max: 65 },
  mixed:   Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  array:      [],
  ofString:   [String],
  ofNumber:   [Number],
  ofDates:    [Date],
  ofBuffer:   [Buffer],
  ofBoolean:  [Boolean],
  ofMixed:    [Schema.Types.Mixed],
  ofObjectId: [Schema.Types.ObjectId],
  nested: {
    stuff: { type: String, lowercase: true, trim: true }
  }
})


var Thing = mongoose.model('Thing', schema);

var m = new Thing;
m.name = 'Statue of Liberty';
m.age = 125;
m.updated = new Date;
m.binary = new Buffer(0);
m.living = false;
m.mixed = { any: { thing: 'i want' } };
m.markModified('mixed');
m._someId = new mongoose.Types.ObjectId;
m.array.push(1);
m.ofString.push("strings!");
m.ofNumber.unshift(1,2,3,4);
m.ofDates.addToSet(new Date);
m.ofBuffer.pop();
m.ofMixed = [1, [], 'three', { four: 5 }];
m.nested.stuff = 'good';
m.save(callback);

```

## <h2 id=1.2>1.2-SchemaType Options验证功能</h2>

* 加入验证的目的就是为了统一数据库中的数据的完整一致性

基本约束：

- `required`: boolean or function, if true adds a required validator for this property
  - 必须约束
- `default`: Any or function, sets a default value for the path. If the value is a function, the return value of the function is used as the default.
  - 默认约束
- `select`: boolean, specifies default projections for queries
- `validate`: function, adds a validator function for this property
  - 自定义约束条件
- `get`: function, defines a custom getter for this property using Object.defineProperty().
  - 数据属性的 get 约束
  - 当你访问该属性的时候会自动调用 get 方法
- `set`: function, defines a custom setter for this property using Object.defineProperty().
  - 数据属性的 set 约束
  - 当你为数据属性赋值的时候会自动调用 set 方法

索引（暂时还不需要考虑）：

- `index`: boolean, whether to define an on this property.
- `unique`: boolean, whether to define a unique index on this property.
- `sparse`: boolean, whether to define a sparse index on this property.

字符串：

- `lowercase`: boolean, whether to always call .toLowerCase() on the value
  - 自动转为小写
- `uppercase`: boolean, whether to always call .toUpperCase() on the value
  - 自动转为大写
- `trim`: boolean, whether to always call .trim() on the value
  - 自动去除空格
- `match`: RegExp, creates a validator that checks if the value matches the given regular expression
  - 自定义字符串的验证规则
- `enum`: Array, creates a validator that checks if the value is in the given array.
  - 枚举类型，必须是数组中指定的某个枚举元素

数字：

- `min`: Number, creates a validator that checks if the value is greater than or equal to the given minimum.
  - 限定最小数字
- `max`: Number, creates a validator that checks if the value is less than or equal to the given maximum.
  - 限定最大数字

日期：

- `min`: Date
  - 限定最小日期
- `max`: Date
  - 限定最大日期

## <h2 id=1.3>1.3-Schema常见约束验证示例演示</h2>

```javascript

//导入模块

var mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://localhost/itheima');

//创建schema

var studentSchema = mongoose.Schema({
	name:{type:String,required:true},//数据类型为string，不能非空
	age:{type:Number,default:18},//数据类型为string，默认值18
	study_id:{type:Number,select:true},//学号，默认查询字段
	address:{type:String,lowercase:true},//地址，默认小写
	email:{type:String,match:RegExp(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/)},//邮箱，正则表达式验证
});

//创建model

var student = mongoose.model('student',studentSchema);

//创建Entity

var zhangsan = new student({
	name:'zhangsan',//名字必须要有，否则会报错： name: Path `name` is required.
	address:'ZhongLiang',//字符串都会变成小写
	email:'a12345@qq.com',//邮箱格式不对，添加会报错 Path `email` is invalid (a12345qq.com).
	study_id:2017001
});

//添加数据

student.create(zhangsan,function(err){

	if(err){
		throw err;
	}

	console.log('插入成功' + zhangsan);

});

```



## <h2 id=1.4>1.4-Schema一些实用的特殊用法</h2>

* ***1.字段唯一***
    * 默认情况下，我们Schema只定义数据的结构，但是值可以重复
    * 字段唯一通常用于用户注册，例如：该邮箱已注册、该用户名已存在等
    * 用法：`unique:true,dropDups: true`
    * 示例：`phone:{type:String,unique:true,dropDups: true}`
    * ***注意事项：一定要重启你的数据库服务，否则不生效***
        * ***这里说的重启是指先删除当前数据库，然后重启数据库服务***
        * ***这里说的重启是指先删除当前数据库，然后重启数据库服务***
        * ***这里说的重启是指先删除当前数据库，然后重启数据库服务***

* ***2.时间自动修改***
    * 我们之间给Schema添加了一个时间属性，并且指定默认值为当前时间`default:Date.now`,这个只是在插入时获取的时间，当数据更新时这个时间并不会自动刷新，需要我们手动刷新
    * 时间自动修改用法:` timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }`
        * timestamps选项会在创建文档时自动生成createAt和updateAt两个字段，值都为系统当前时间。并且在更新文档时自动更新updateAt字段的值为系统当前时间
        * 如果不想设置自定义属性名，使用默认属性名则直接设置`timestamps: true`即可

* ***示例***

```javascript

//schema第一个参数是我们自定义的数据类型  第二个参数是管理schema默认的数据类型
var studentSchema = mongoose.Schema({
	name:{type:String,required:true},//数据类型为string，不能非空
	age:{type:Number,default:18},//数据类型为string，默认值18
	study_id:{type:Number,select:true},//学号，默认查询字段
	address:{type:String,lowercase:true},//地址，默认小写
	email:{type:String,match:RegExp(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/)},//邮箱，正则表达式验证
	// phone:{type:String,unique:true,dropDups: true}
},{
	 versionKey: false,//去掉版本锁 __v0
	
	timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }//自动管理修改时间

});

```

## <h2 id=1.5>1.5-完整代码</h2>

```javascript

//导入模块

var mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://localhost/itheima');

//创建schema

//schema第一个参数是我们自定义的数据类型  第二个参数是管理schema默认的数据类型
var studentSchema = mongoose.Schema({
	name:{type:String,required:true},//数据类型为string，不能非空
	age:{type:Number,default:18},//数据类型为string，默认值18
	study_id:{type:Number,select:true},//学号，默认查询字段
	address:{type:String,lowercase:true},//地址，默认小写
	email:{type:String,match:RegExp(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/)},//邮箱，正则表达式验证
	// phone:{type:String,unique:true,dropDups: true}
},{
	 versionKey: false,//去掉版本锁 __v0
	
	timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }//自动管理修改时间

});

//创建model

var student = mongoose.model('student',studentSchema);

//创建Entity

var zhangsan = new student({
	name:'zhangsan',//名字必须要有，否则会报错： name: Path `name` is required.
	address:'ZhongLiang',//字符串都会变成小写
	email:'a12345@qq.com',//邮箱格式不对，添加会报错 Path `email` is invalid (a12345qq.com).
	study_id:2017001,
	// phone:'123456789'
});

//添加数据



student.create(zhangsan,function(err){

	if(err){
		throw err;
	}

	console.log('插入成功' + zhangsan);

});

// student.update({name:'zhangsan'},{age:50},function(err,docs){
// 	if (err) {
// 		throw err;
// 	}
// 	console.log(docs);
// });

```

