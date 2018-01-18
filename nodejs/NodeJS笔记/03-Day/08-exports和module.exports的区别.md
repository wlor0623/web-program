# exports和module.exports区别

* [1.1-地址引用的原理](#1.1)
* [1.2-exports和module.exports区别](#1.2)
* [1.3-总结](#1.3)

## 在每一个模块文件的开始，系统都默认帮我们加上了这么一行代码

* ***这行代码的作用就是让`exports`对象地址引用`module.exports`对象的地址，这样的话我们在导入模块时就不用每一次都写`module.exports`,直接写`exports`即可***

```javascript

exports = module.exports;

```

* <h2>本质上：1.exports仅仅是module.exports的一个地址引用。2.nodejs只会导出module.exports的指向</h2>
    * ***所以xports和module.exports区别本质上也就是地址引用的区别***

## <h2 id=1.1>1.1-地址引用的原理</h2>

* ***假设有现在这么一段代码***

```javascript

var a = {name: 'a'};
var b = a;

console.log(a);
console.log(b);

b.name = 'b';
console.log(a);
console.log(b);

var b = {name: 'c'};
console.log(a);
console.log(b);

```

* ***输出***

```javascript

{ name: 'a' }
{ name: 'a' }
{ name: 'b' }
{ name: 'b' }
{ name: 'b' }
{ name: 'c' }

```

* ***解释：a 是一个对象，b 是对 a 的引用，即 a 和 b 指向同一块内存，所以前两个输出一样。当对 b 作修改时，即 a 和 b 指向同一块内存地址的内容发生了改变，所以 a 也会体现出来，所以第三四个输出一样。当 b 被覆盖时，b 指向了一块新的内存，a 还是指向原来的内存，所以最后两个输出不一样***

## <h2 id=1.2>1.2-exports和module.exports区别</h2>

* 1:默认情况下，exports和module.exports是完全相等的，我们可以使用exports来简写代替module.exports
* 2:在内存地址不变的情况下，同时对export和module.export赋不同的值时，后面的值会覆盖前面的值
* 3:如果xport和module.export分别指向了不同的内存地址，此时export会与module断开连接，两者是两个完全不同的对象不再有任何联系，但是模块的导出始终还是module.export

```javascript

//原理：exports仅仅是module.exports的一个地址引用。nodejs只会导出module.exports的指向

//相当于每一个模块文件的开始，系统都默认帮我们加上了这么一行代码

exports = module.exports;


//1.默认情况下，exports和module.exports是完全相等的，我们可以使用exports来简写代替module.exports


 console.log('1.默认情况下，exports和module.exports是完全相等的，我们可以使用exports来简写代替module.exports');
// var name = '张三';

// function person(name,age){

// 	this.name = name;
// 	this.age = age;
// }


// exports.name = '张三';

// exports.person = person;

// //true
// console.log(exports === module.exports);
// //{ name: '张三', person: [Function: person] }
// console.log(exports);
// //{ name: '张三', person: [Function: person] }
// console.log(module.exports);
// //张三
// console.log(exports.name);

// exports.person('李四',20);

// //李四:20
// console.log(exports.name + ':' + exports.age);


//2.在内存地址不变的情况下，同时对export和module.export赋不同的值时，后面的值会覆盖前面的值
console.log('2.在内存地址不变的情况下，同时对export和module.export赋不同的值时，后面的值会覆盖前面的值');

// var name = '张三';

// function person(name,age){

// 	this.name = name;
// 	this.age = age;
// }

// function programmer(name,age){

// 	this.name = name;
// 	this.age = age;
// }


// //首次赋值属性，相当于开辟了一块内存空间存放该值
// exports.name = '张三';

// exports.person = person;


// //对指向同一内存空间地址的属性赋值，新值会替代旧值
// module.exports.name = '张三';

// module.exports.person = programmer;





// //true
// console.log(exports === module.exports);
// //{ name: '张三', person: [Function: programmer] }
// console.log(exports);
// //{ name: '张三', person: [Function: programmer] }
// console.log(module.exports);
// //张三
// console.log(exports.name);

//3如果xport和module.export分别指向了不同的内存地址，此时export会与module断开连接，两者是两个完全不同的对象不再有任何联系，但是模块的导出始终还是module.export

console.log('3.如果xport和module.export分别指向了不同的内存地址，此时export会与module断开连接，两者是两个完全不同的对象不再有任何联系，但是模块的导出始终还是module.export');

var name = '张三';

function person(name,age){

	this.name = name;
	this.age = age;
}

function programmer(name,age){

	this.name = name;
	this.age = age;
}

//这行代码可以想象以下场景
/**
1.有一个地址a，存放的是person函数
2.module.exports指向的是地址a
3.exports引用了module.export的地址，所以也是指向a
*/
//
exports = person;


//这行代码可以想象以下场景
/**1.有一个地址b，存放的是一个字符串
2.module.exports指向的是地址b
3.由于exports只是引用module.exports地址，此时在没有执行exports = modules.exports这行代码之前，exports指向的还是a地址
*/
module.exports = '张三';




//false
console.log(exports === module.exports);
//[Function: person]
console.log(exports);
//张三
console.log(module.exports);
//person
console.log(exports.name);


```

## <h2 id=1.3>1.3-总结</h2>

* 1:一定要始终记住：模块真正导出的是`module.exports`，而不是`exports`

* 2：开发中尽量避免分别定义module.exports和exports
    * 要么只用module.exports，要么只用exports

* 3.NodeJs开发者建议导出对象用module.exports,导出多个方法和变量用exports
	* ***只是建议而已，具体的适用看个人习惯，因为模块的导出无论适用module.exports还是exports对于使用者而言没有区别***