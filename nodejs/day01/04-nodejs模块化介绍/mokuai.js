//1.每一个js文件（模块）都是一个私有的作用域,文件中定义的变量的作用域就是这个文件
//2如果想让外部去访问我这个文件的变量，我们则需要将模块导出

var name = 'name';

var fn = function(){
    console.log('11111');
}

module.exports.a = '111111';

module.exports.name = name;

module.exports.fn = fn;

//其实在每一个模块的最后一行代码，node自动帮我们加上了这个一行代码
//module.exports是node中js文件自带的一个属性，他的作用就是导出模块
//require()函数得到的对象就是module.exports
return module.exports;