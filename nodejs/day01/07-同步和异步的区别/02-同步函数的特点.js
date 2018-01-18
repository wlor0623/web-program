//导入文件模块
var fs = require('fs');

/**同步执行的特点
 * 1.没有回调函数，但是有返回值
 * 2.同步是有序执行（从上往下执行）
 * 3.同步会阻塞线程
 * 4.同步执行性能低，耗能高
 */

 //同步操作读取文件的数据时通过返回值获取的
 var data = fs.readFileSync('./a.txt');
 console.log('111111');
 var data = fs.readFileSync('./a.txt');
 console.log('22222');

 

 var data = fs.readFileSync('./a.txt');
 console.log('33333');

 var data = fs.readFileSync('./a.txt');
 console.log('44444');

 var data = fs.readFileSync('./a.txt');
 console.log('55555');