# path路径模块使用

* ***在nodejs中，我们使用相对路径`./`,`../`去读取一个文件资源时，这个相对路径并不是相当于当前文件的，而是相对于终端执行node命令时的路径，也就是说我们在终端哪一个路径去启动我们的node，那么我们的js代码中的相对路径就是相当于这一个路径***


## 1.1-node中读取文件相对路径

* 在node.js中，提供了一个path模块，在这个模块中，提供了许多使用的，可被用来处理与转换路径的方法与属性。下面我们就来对这些方法与属性做一下介绍。

```javascript

//1.导入路径模块
var path = require('path');

//2.文件相对路径
console.log('./helloworld.html');

//3.文件的绝对路径

//这两个变量是每一个模块都有的，他们获取到的是真实的绝对路径，不受node终端执行命令的影响
console.log(__dirname);//当前文件所在文件夹的绝对路径
console.log(__filename);//当前文件的绝对路径

//这是path模块提供的获取绝对路径的方法，受到node终端执行命令的影响
//获取到的绝对路径是当前执行node程序所在的路径
console.log(path.resolve('./helloworld.html'));

// //4.路径的合并
// /*使用这种方式合并路径与使用'+'加号合并拼接路径的区别就是
// 会自动识别参数字符串帮我们添加'/'，我们无需手动添加路径分隔符'/'
//  */
var path1 = __dirname;
var path2 = '/helloworld.html';
//将多个参数组合成一个 path  path.join([path1], [path2], [...])
var myPath = path.join(path1,path2);
console.log(myPath);

//5.路径的解析
/**返回值是一个对象，将一个完整的路径解析为五个部分
* root：根磁盘（C://   D://）
* dir:文件所在文件夹路径 \04-源代码\02-Day\01-path路径模块
* base:文件的路径  helloworld.html
* ext:文件拓展名  html
* name:文件名  hellowworld
*/
var parsePath = path.parse(myPath);
console.log(parsePath);
console.log('文件所在磁盘：' + parsePath.root);
console.log('文件所在目录：' + parsePath.dir);
console.log('文件相对路径：' + parsePath.base);
console.log('文件拓展名：' + parsePath.ext);
console.log('文件名：' + parsePath.name);

```