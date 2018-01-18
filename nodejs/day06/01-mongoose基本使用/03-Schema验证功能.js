var mongoose = require('mongoose');

//1.连接数据库
mongoose.connect('mongodb://127.0.0.1/heroAdmin');

//2.创建Scema

var heroSchema = mongoose.Schema({
    name : {type:String,required:true},//name属性不能为空，非空字段，如果为空则添加报错
    age : {type:Number,default:18,min:1,max:100},//默认值是18,最小值是1，最大值是100
    address : {type:String,select:true},//默认搜索字段，一般用不上，我们直接用唯一的id来搜索
    phone : {type:String,unique:true,index:true},//数据库中phone的值不能重复，唯一字段
    nickname:{type:String,lowercase:true},//自动将转成小写
    email:{type:String,match:RegExp(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/)}
});

//3.model是由scema来创建的

var OldFe = mongoose.model('OldFe',heroSchema);

//4.实体entity是由model来创建的（entity是model类的一个实例化对象）

var fe1 = new OldFe({
    name:'laotie111',
    age : 22,
    phone:'1100',
    nickname:'AAAAAbbbbbbCCCC',
    email:'125435@qq.com'
});

//5.添加数据

OldFe.create(fe1,function(err){
    if(err){
        console.log('老铁插入失败' + fe1);
        return;
    }

    console.log('老铁插入成功' + fe1);
})