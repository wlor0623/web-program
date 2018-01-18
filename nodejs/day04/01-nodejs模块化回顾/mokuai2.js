var mokuai1 = require('./mokuai1.js');

var mokuai = module.exports;

mokuai.name = '这里是模块2';

mokuai.fn = function(){
    console.log('22222');
};

mokuai1.fn();
