

//1.内置模块直接被编译成二进制文件，加载nodejs的内存中
var http = require('http');

//2  1.文件模块的加载使用的是文件的路径
//   2.文件模块如果使用相对路径，不受到node执行命令的影响
//   3。文件模块的后缀名可以不写
var mokuai = require('./02-文件模块');

//3 第三方模块加载，使用模块名加载     
   // * 第三方模块加载本质是加载整个文件夹

var template = require('art-template');

console.log(template);