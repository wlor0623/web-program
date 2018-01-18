var fs = require('fs');


/**
 * 同步操作只能使用try-catch来捕捉异常
 * 异步操作只能通过回调函数的参数err来捕捉异常
 */

try {
    var data = fs.readFileSync('./a.txt');
} catch (error) {
    if(error){

        throw error;
    }
    console.log('读取成功');
}