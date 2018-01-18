var model = require('./js多重回调model.js');

/**
 * 形参：函数声明的参数
 * 实参：函数调用传入的参数
 */

model.addHero('1111',function(err){
    console.log('6.这个函数体是实参2，只有当形参2调用的时候才会执行该函数体');
    if(err){
        console.log('7.整个回调函数结束');
    }
});