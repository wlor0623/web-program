# nodejs接收post请求参数

* [1.1-浏览器发送post请求参数的方式](#1.1)
* [1.2-服务端接收post请求参数的方式](#1.2)

* ***post请求参数不直接在url路径中拼接，而是放在请求体中发送给服务器***
    * 请求三要素：请求行、请求头、请求体

## <h2 id=1.1>1.1-浏览器发送post请求参数的方式</h2>

* ***post请求参数不能直接在url路径中拼接，所以一般使用ajax请求来发送post请求参数***
    * 通常都是提交form表单数据使用post请求

```html

<script>

  //浏览器中一般使用ajax来发送post请求
  $('#form').on('sunmit', function (e) {
    //禁用表单默认提交事件
    e.preventDefault();
    $.ajax({
      url: 'heroAdd',
      type: 'post',
      dataType: 'json',
      data: $(this).serialize(),
      success: function (data) {
      }
    });
  });
</script>

```

* ***完整代码***

```html

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Hero - Admin</title>
  <!-- 导入jquery -->
  <script src="/node_modules/jquery/dist/jquery.js"></script>
  <!-- bootstrap布局 -->
  <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.css">
  <script src="/node_modules/bootstrap/dist/js/bootstrap.js"></script>
  <style>
    .hero-list img {
      width: 50px;
    }
  </style>
</head>

<body>
  <header>
    <div class="page-header container">
      <h1>
        <a href="/">王者荣耀</a>
        <small>英雄管理器</small>
      </h1>
    </div>
  </header>
  <div class="container hero-list">
    <form id="form">
      <div class="form-group">
        <label for="exampleInputEmail1">英雄名称</label>
        <input type="text" name="name" class="form-control" id="exampleInputEmail1" placeholder="请输入英雄名称">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">英雄性别</label>
        <div class="radio">
          <label>
            <input type="radio" name="gender" id="optionsRadios1" value="男" checked>男
          </label>
          <label>
            <input type="radio" name="gender" id="optionsRadios1" value="女" checked>女
          </label>
        </div>
      </div>
      <div class="form-group">
        <label for="exampleInputFile">英雄图片</label>
        <!-- <input type="file" id="exampleInputFile"> -->
        <p class="help-block">请上传英雄图片.</p>
      </div>
      <button type="submit" class="btn btn-success">点击保存</button>
    </form>
  </div>
</body>

<script>
  //浏览器中一般使用ajax来发送post请求
  $('#form').on('sunmit', function (e) {
    //禁用表单默认提交事件
    e.preventDefault();
    $.ajax({
      url: 'heroAdd',
      type: 'post',
      dataType: 'json',
      data: $(this).serialize(),
      success: function (data) {
      }
    });
  });
</script>

</html>

```


## <h2 id=1.2>1.2-服务端接收post请求参数的方式</h2>

* ***与get请求不同的是，服务端接收post请求参数不是一次就可以获取的，通常需要多次***
    * 一般post请求发送的参数数据要比get请求大得多

* 1.服务端接收表单数据流程
    * （1）如果表单数据量越多，则发送的次数越多，如果比较少，可能一次就发过来了
    * （2）接收表单数据的时候，需要通过监听 req 对象的 data 事件来取数据
    * (3)每当收到一段表单提交过来的数据，req 的 `data` 事件就会被触发一次，同时通过回调函数可以拿到该 段 的数据
        * ***服务端需要自己添加数据流***
    * (4)当接收表单提交的数据完毕之后，会执行req的 `on` 事件

* 2.服务端处理表单数据的逻辑流程
    * （1）对数据进行解码（中文数据提交时会进行url编码）
        *  decodeURI(data)
    * （2）使用querystring对url进行反序列化（解析url将&和=拆分成键值对），得到一个对象
        * ***querystring是nodejs内置的一个专用于处理url的模块，API只有四个，详情见nodejs官方文档***
        * ***post请求参数不能使用url模块解析，因为他不是一个url，而是一个请求体对象***
    * （3）将数据插入到数据库（工作中一般后台的数据存储都是数据库，我们这里暂时使用json代替）
        * ***数据库处理会非常简单，json处理很麻烦***
        * [1]:读取json文件
        * [2]:将读取的字符串转为json对象（文件读取只会获取二进制和字符串）
        * [3]:对象数组插入参数数据
        * [4]:将json对象转为json字符串
        * [5]:json字符串写入文件
        * [6]:服务器响应客户端请求

```javascript

//导入querystring模块（解析post请求数据）
var querystring = require('querystring');

 console.log(req.method);

//1.通过判断url路径和请求方式来判断是否是表单提交
if (req.url === '/heroAdd' && req.method === 'POST') {
    /**服务端接收post请求参数的流程
        * （1）给req请求注册接收数据data事件（该方法会执行多次，需要我们手动累加二进制数据）
        *      * 如果表单数据量越多，则发送的次数越多，如果比较少，可能一次就发过来了
        *      * 所以接收表单数据的时候，需要通过监听 req 对象的 data 事件来取数据
        *      * 也就是说，每当收到一段表单提交过来的数据，req 的 data 事件就会被触发一次，同时通过回调函数可以拿到该 段 的数据
        * （2）给req请求注册完成接收数据end事件（所有数据接收完成会执行一次该方法）
        */
    //创建空字符叠加数据片段
    var data = '';

    //2.注册data事件接收数据（每当收到一段表单提交的数据，该方法会执行一次）
    req.on('data', function (chunk) {
        // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
        data += chunk;
    });

    // 3.当接收表单提交的数据完毕之后，就可以进一步处理了
    //注册end事件，所有数据接收完成会执行一次该方法
    req.on('end', function () {

        //（1）.对url进行解码（url会对中文进行编码）
        data = decodeURI(data);
        console.log(data);

        /**post请求参数不能使用url模块解析，因为他不是一个url，而是一个请求体对象 */

        //（2）.使用querystring对url进行反序列化（解析url将&和=拆分成键值对），得到一个对象
        //querystring是nodejs内置的一个专用于处理url的模块，API只有四个，详情见nodejs官方文档
        var dataObject = querystring.parse(data);
        console.log(dataObject);
    });
}

```

* ***完整代码***

```javascript

//1.导入http模块
var http = require('http');
//导入文件模块
var fs = require('fs');
//导入路径模块
var path = require('path');
//导入querystring模块（解析post请求数据）
var querystring = require('querystring');

//2.创建服务器
var app = http.createServer();

//3.添加响应事件
app.on('request', function (req, res) {

    console.log(req.method);

    //1.通过判断url路径和请求方式来判断是否是表单提交
    if (req.url === '/heroAdd' && req.method === 'POST') {
        /**服务端接收post请求参数的流程
         * （1）给req请求注册接收数据data事件（该方法会执行多次，需要我们手动累加二进制数据）
         *      * 如果表单数据量越多，则发送的次数越多，如果比较少，可能一次就发过来了
         *      * 所以接收表单数据的时候，需要通过监听 req 对象的 data 事件来取数据
         *      * 也就是说，每当收到一段表单提交过来的数据，req 的 data 事件就会被触发一次，同时通过回调函数可以拿到该 段 的数据
         * （2）给req请求注册完成接收数据end事件（所有数据接收完成会执行一次该方法）
         */
        //创建空字符叠加数据片段
        var data = '';

        //2.注册data事件接收数据（每当收到一段表单提交的数据，该方法会执行一次）
        req.on('data', function (chunk) {
            // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
            data += chunk;
        });

        // 3.当接收表单提交的数据完毕之后，就可以进一步处理了
        //注册end事件，所有数据接收完成会执行一次该方法
        req.on('end', function () {

            //（1）.对url进行解码（url会对中文进行编码）
            data = decodeURI(data);
            console.log(data);

            /**post请求参数不能使用url模块解析，因为他不是一个url，而是一个请求体对象 */

            //（2）.使用querystring对url进行反序列化（解析url将&和=拆分成键值对），得到一个对象
            //querystring是nodejs内置的一个专用于处理url的模块，API只有四个，详情见nodejs官方文档
            var dataObject = querystring.parse(data);
            console.log(dataObject);
        });
    }

    if (req.url === '/heroAdd' && req.method === 'POST') {
        fs.readFile('./heroAdd.html', function (err, data) {
            if (err) {
                throw err;
            }
            res.end(data);
        });
    } else if (req.url.indexOf('/node_modules') === 0) {
        fs.readFile(__dirname + req.url, function (err, data) {
            if (err) {
                throw err;
            } else {
                res.end(data);
            }
        });
    } else {
        res.end('请求路径： ' + req.url);
    }
});

//4.监听端口号
app.listen(3000, function () {
    console.log('欢迎来到王者荣耀英雄管理器');
});

```