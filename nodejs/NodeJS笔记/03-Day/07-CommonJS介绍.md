# CommonJS介绍

* ***上一小节我们见识到了nodejs模块化思想的好处，接下来我们暂时停止项目的开发，来进一步学习模块化的工作原理***

* [1.1-什么是CommonJS](#1.1)
* [1.2-CommonJS与AMD及CMD的关系](#1.2)

## <h2 id=1.1>1.1-什么是CommonJS</h2>

* <http://www.commonjs.org/>

* 1.CommonJS由来：JavaScript是一个强大面向对象语言，它有很多快速高效的解释器。官方JavaScript标准定义的API是为了构建基于浏览器的应用程序。其实JavaScript设计之初不仅仅是针对客户端设计的语言。后来只是由于Web的迅速流行，加之Netscape和微软之间之争过早的将JavaScipt标准化，导致目前JS仅仅包括基本的API，并不是具有服务端编程语言的特性。
    * CommonJS API定义很多普通应用程序（主要指非浏览器的应用，例如服务端）使用的API，从而填补了这个空白。它的终极目标是提供一个类似Python，Ruby和Java标准库。这样的话，开发者可以使用CommonJS API编写应用程序，然后这些应用可以运行在不同的JavaScript解释器和不同的主机环境中。在兼容CommonJS的系统中，你可以实用JavaScript程序开发
        * 服务器端JavaScript应用程序命令行工具   
        * 图形界面应用程序  
        * 混合应用程序（如，Titanium或Adobe AIR）

* 2.CommonJS规范：根据CommonJS规范，一个单独的文件就是一个模块。加载模块使用require方法，该方法读取一个文件并执行，最后返回文件内部的exports对象。 
    * require - 用来引入依赖
    * export - 用来导出模块，包括标识符(identifier)和模块内容(contents)
    * 模块不能够循环依赖

## <h2 id=1.2>1.2-CommonJS与AMD及CMD的关系</h2>

* 这三个规范都是为javascript模块化加载而生的，都是在用到或者预计要用到某些模块时候加载该模块，使得大量的系统巨大的庞杂的代码得以很好的组织和管理。模块化使得我们在使用和管理代码的时候不那么混乱，而且也方便了多人的合作。

* CommonJS 加载模块是同步的，所以只有加载完成才能执行后面的操作。像Node.js主要用于服务器的编程，加载的模块文件一般都已经存在本地硬盘，所以加载起来比较快，不用考虑异步加载的方式，所以CommonJS规范比较适用。但如果是浏览器环境，要从服务器加载模块，这是就必须采用异步模式。所以就有了 AMD  CMD 解决方案。 



* 1.用途区别
    * CommonJS是服务端的模块化规范
    * AMD和CMD是客户端（浏览器）的模块化规范

* 2.加载区别
    * CommonJS和CMD都是同步加载模块化规范
    * AMD是异步加载模块化规范

* 3.平台区别
    * CommonJS是`Nodejs`使用的规范
    * AMD（Asynchronous Module Definition 异步模块定义）是 `RequireJS` 在推广过程中对模块定义的规范化产出 
    * CMD（Common Module Definition通用模块定义） 是 SeaJS 在推广过程中对模块定义的规范化产出
