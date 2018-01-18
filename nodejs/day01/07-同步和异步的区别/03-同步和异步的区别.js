//导入文件模块
var fs = require('fs');

/**同步和异步区别
 * 1.同步没有回调函数，有返回值
 *  * 异步有回调函数，无返回值
 * 2.同步优先异步执行
 *  * 异步要等待所有的同步都执行完再执行
 * 3.同步是有序执行（从上往下）
 *  * 异步无序执行
 * 4.异步执行如果出现异常，通过回调函数的err来捕捉
 *  * 同步异常捕捉使用try-catch
 *      * try-catch只支持捕捉同步异常不支持捕捉异步异常
 */


/**代码编译执行顺序
 * 1.编译器从上往下逐行编译代码
 * 2.如果该行代码是同步操作，则立即执行
 * 3.如果该行代码是异步操作，则将异步的回调函数放入一个栈堆中（回调循环）
 * 4.编译器一直重复第二步和第三步知道所有代码都编译完成
 * 5.编译器开始执行栈堆中的异步代码（无序）
 */

 //同步步操作读取文件的数据时通过返回值获取的
 var data = fs.readFileSync('./a.txt');
 console.log('111111');


 fs.readFile('./a.txt',function(err,data){
    if(err){
        throw err;
    }
    console.log('666666');
});



 var data = fs.readFileSync('./a.txt');
 console.log('22222');

 fs.readFile('./a.txt',function(err,data){
    if(err){
        throw err;
    }
    console.log('777777');
});

 var data = fs.readFileSync('./a.txt');
 console.log('33333');

 fs.readFile('./a.txt',function(err,data){
    if(err){
        throw err;
    }
    console.log('8888888');
});

 var data = fs.readFileSync('./a.txt');
 console.log('44444');

 fs.readFile('./a.txt',function(err,data){
    if(err){
        throw err;
    }
    console.log('99999');
});

 var data = fs.readFileSync('./a.txt');
 console.log('55555');

 fs.readFile('./a.txt',function(err,data){
    if(err){
        throw err;
    }
    console.log('10101010110');
});