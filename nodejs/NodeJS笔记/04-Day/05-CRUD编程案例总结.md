# CRUD编程案例总结

* ***到目前为止，我们的英雄管理器开发就告一段落了，这是一个后台开发中比较典型的CRUD案例，本小节我们来总结一下在这个案例中我们掌握了哪一些技术点***
    * C：create添加
    * R：retrieve查询
    * U：update更新
    * D：delet删除

* 本案例非常全面且系统的讲解了nodejs的使用及服务器开发的入门知识

* 1.服务器编程流程
    * 获取请求
    * 处理请求
    * 响应请求

* 3.模块化
    * 模块的种类
        * 核心模块
            * fs:文件处理
            * http：网络服务器搭建
            * path：文件路径
            * url:网络请求解析
        * 第三方模块
            * art-template:模板引擎
            * formidable:文件上传
            * jquery:获取dom及ajax异步请求
        * 自定义模块
    * 模块加载规则
    * 模块的缓存机制

* 4.使用模块化来封装代码
    * 将不同的功能封装到不同的模块

* 5.客户端与服务端交互流程
    * （1）客户端浏览器发送请求
    * （2）服务端
        * `index.js`项目入口文件接收请求
        * `router.js`负责路由分发（将不同的请求交给不同的controller去处理）
        * `controller.js`负责根据业务逻辑处理请求(C层)
            * `model.js`负责提供数据（数据库的增删改查）M层
            * `views`html模板，负责展示数据(V层)
            * 如果是服务端渲染，controller还负责将M层的数据模板引擎渲染到V层
    * （3）响应返回
        * 由C层完成`controller.js`



