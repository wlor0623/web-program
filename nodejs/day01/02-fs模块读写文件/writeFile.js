//1.导入fs文件模块
var fs = require('fs');


//2.写入文件
/**
 * 第一个参数：要写入的文件路径
 * 第二个参数，要写入的数据
 * 第三个参数：写入回调函数 function(err){};报错信息
 */
fs.writeFile('./b.txt','hdhdfhdfhdfhfd',function(err){
    if(err){
        throw err;
    }

    console.log('写入文件成功');
});