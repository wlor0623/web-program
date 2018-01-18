//1.导入mongoose模块
var mongoose = require('mongoose');
//2.链接数据库服务  第一个参数：连接数据库服务的id+端口  最后一个路径表示数据库名称
//第二个参数：是否新建客户端  如果为true：新的客户端  一般不用写，省略的话第一次链接则默认为新客户端
mongoose.connect('mongodb://localhost/chicken', { useMongoClient: true });

//3.创建Schema
//schema的作用：确定数据库的数据结构
var schema = {
    name: String ,
    age : {type:Number,default:22}
};

//4.创建模型（collections）
//第一个参数：模型的名字（类似于js中的类，类似于mongodb中的集合）
//第二个参数：schema
var Cat = mongoose.model('Cat', schema);

//5.创建实体 Entity

var kitty = new Cat({ name: 'Zildjian' });

//6.保存到数据库
kitty.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
  }
});

//7.查询所有数据 数据的增删改查是由model来负责（集合collections）
Cat.find(function(err,docs){
    if (err) {
        console.log(err);
      } else {
        console.log(docs);
        console.dir(docs[0]);
      }
});