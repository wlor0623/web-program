
// var model = module.exports;

// model.name = "尼古拉斯赵四";
// model.age = 32;

// model.eat = function(){
//     console.log('随叫随到');
// };

// model.shuijiao = function(){
//     console.log('一觉到天亮');
// };

//1.记住：模块真正导出的一定是module.exports
// module.exports = '老铁';

//2.其实每一个文件中都有一个变量叫做exports,每一个模块在第一行都有这样的一个代码
//这行代码不用写，是默认已经写好的
// exports = module.exports;

exports.name = "道格森张三";
exports.play = function(){
    console.log('今晚吃鸡');
};

// module.exports = '落地成盒';

/**
 * 1.exports和moduel.exports默认情况下指向的是同一个对象
 * 2.但是一个模块真正导出的还是module.exports
 * 3.开发时尽量不要同时使用module.exports和exports
 *  * 要么只用exports，要么只用module.exports
 */



