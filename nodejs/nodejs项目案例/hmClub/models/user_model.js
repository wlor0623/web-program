//用户模型：负责用户数据的数据库增删改查

//1.导入mongoose模块
var mongoose = require('mongoose');

//2.创建schema（数据库的数据结构是由schema决定的）

var userSchema = mongoose.Schema({
    email:{type:String,require:true},//用户邮箱，不能为空,验证交给客户端负责
    password:{type:String,require:true},//密码，不能为空
    avatar:{type:String,default:'default_icon.png'},//文章类型，默认为问答
},{timestamps:true});//mongoose自动管理时间  updateAt  createAt

module.exports = mongoose.model('User',userSchema);