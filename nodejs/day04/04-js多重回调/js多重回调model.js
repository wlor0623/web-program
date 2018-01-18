
var fs = require('fs');

//这是函数1：获取所有数据
//callback1：形参1
function getAllData(callback1){
    console.log('2.这是函数1：获取所有数据  开始调用');
    fs.readFile('./a.txt',function(err,data){
        console.log('3.形参1开始调用实参1，给实参1传入了两个参数');
        callback1(err,data)
    })

};

//hero:英雄对象  callback:形参2
module.exports.addHero = function(hero,callback2){
    console.log('1.进入添加英雄函数');
    //1.调用函数1
    getAllData(function(err,data){
        console.log('4.这个函数体是实参1，它被调用了');
        if(err){
            console.log('5.形参2开始调用实参2，给实参2传入了一个参数err');
            callback2(err);
        }

        console.log('5.形参2开始调用实参2，给实参2传入了一个参数null');
        callback2(null);
    })
}

