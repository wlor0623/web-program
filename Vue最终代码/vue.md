###vue

[http://es6.ruanyifeng.com/](http://es6.ruanyifeng.com/)


箭头函数
example:

01.可以简写,参数只有一个时,()可以省略;没有参数,必须加上();
02 可以简写,如果方法体只有一句话,{}可省; -----只包含一个表达式，{ ... }和return省略。

es6 bable 逐渐流行语言

网页头部框架 
[http://mint-ui.github.io/#!/zh-cn](http://mint-ui.github.io/#!/zh-cn)

在项目根目录下 安装命令 npm install mint-ui -S

[http://mint-ui.github.io/#!/zh-cn](http://mint-ui.github.io/#!/zh-cn)

脚手架
vue-clip  默认端口为 8080;




实现中间的路由部分
		1、集成vue-router到项目中
			安装
			main.js中，导入并且集成，Vue.use(xxx)
		
		2、在需要的地方去使用它	
			html中
				router-link：触发路径				
				router-view：占位符
				
			js中
				定义/新建组件
				创建路由对象，设置路由规则(自动帮助我们注册)
				把我们创建好的路由对象，注入到根实例中


	第二次安装
		包:vue-router
		应用场景:在App.vue中间要呈现内容的时候，使用它
		安装方式:cnpm i vue-router -S
### Vue.js安装

4.vue安装包 (淘宝镜像下载)

 npm i cnpm -g  (01先装淘宝镜像)

01.npm i webpack -g   (02-安装webpack)

02.npm i webpack-dev-server -g(03-安装服务器)

检测是否成功:

```
	webpack -v
	webpack-dev-server -v
```

若是报错:

01.复制用户地址:

search-ms:displayname=“Roaming”中的搜索结果&crumb=location:C%3A%5CUsers%5CAdministrator%5CAppData%5CRoaming\npm

(-cache)这个不用

02.打开系统, 

02.1:window7选择上面选项框的路径,

注意(不用删除原来目录 +;英文状态下的;+原来复制过来路径)

02.2 window 10选择下面选项框的路径,

注意(不用删除原来目录 +;英文状态下的;+原来复制过来路径)

npm路径

C:\Users\Administrator\AppData\Roaming\npm   

不成功就删除这三个目录,重装(可搜索文件名)

webpack_modules

webpack

webpack.cmd

### Webpack

webpack的相关介绍文章:

http://zhaoda.net/  大牛网站

http://zhaoda.net/webpack-handbook/    webpack解析说明文本

[https://github.com/zhaoda/webpack-handbook/commits/master]   github网址



练习项目地址:

http://www.huangjiangjun.top/#/home



参考学习文档地址:http://doc.webpack-china.org/concepts/

https://www.cnblogs.com/8899man/p/6514212.html

http://yangyi1024.com/meizi/#/welfare

命令语法:全局

cnpm i webpack-dev-server -g

cnpm i vue --save

cnpm i vue-loader --save-dev    

http://zhaoda.net/webpack-handbook/configuration.html

https://github.com/jantimon/html-webpack-plugin

github.com/jantimon/html-webpack-plugin





创建项目(在项目下shift+右键打开命令窗口)

npm -y (不能有中文字符)    npm init  ()



https://router.vuejs.org/zh-cn/

模块化  : common   
把地址 当作对象进行导出 

事件过滤器:   cnpm i moment -S

newslist  mainjs (rout-link)

## 显示和隐藏TabBar和导航栏的返回按钮

```
要解决问题的关键点:
	监控路由的变化，获取当前的路径
	
	在App.vue中，通过`watch`监控`$route`，为什么要把监控的代码写在App.vue中，因为我们导航栏的返回按钮和底部TabBar是写在App.vue中的
	
步骤:
	1、根据路径来显示和隐藏导航栏上面的返回按钮
		创建一个返回按钮
		给返回按钮添加点击事件，并且通过编程式导航，进行回退
		参考:https://router.vuejs.org/zh-cn/essentials/navigation.html
```

```
	2、根据路径来显示和隐藏底部的TabBar
		还可以使用动态绑定class的方式来实现
		注意点：动态添加class也是根据boolean值
		参考:https://cn.vuejs.org/v2/guide/class-and-style.html
```

### 声明式导航&编程式导航

```
相同点:
	都能进行路由导航，都能前进和后退
	
不同点:
	写法不一样:
		声明式，写在组件的template里面的，是通过router-link来实现的
		
		编程式，写在我们js里面的某个函数中的，它是通过$router.xxx方法来实现的
```

### $route 、$router、routes

```
routes前面没有$，不是Vue对象的属性，它是在设置路由规则的时候，使用的，千万不要写错了
```

```
相同点：
	都是Vue对象的属性
	
不同点：
	作用不同:
		$route:
			1、通过它，获取上一个路由传递过来的参数
			2、通过它，监控路由的变化
			3、获取到当前的路径
		
		$router:编程式导航，路由的前进和后退
		
	写法不同:
		$route:
			获取值 this.$route.params.xxx
			监控变化 $route:function(newValue,oldValue){}
			
		$router:
			前进:$router.push() $router.go(正数)
			后退:$router.go(负数)
```

+shift +6  wpy-beautify  vue  格式化插件

------

http://mint-ui.github.io/#!/zh-cn

http://momentjs.cn/





swipe地址:

photoswipe.com/documentation/api.html



vue生命周期在真实场景下的业务应用

created：

01.进行ajax请求异步数据的获取、初始化数据

02.统计用户行为  (埋点)   记录用户最喜欢哪个组件

记录进入时间    

beforeDestory

01.记录销毁时间

02.记录滚动的offsetY,存在localstorage  13:400px

mounted：

01.挂载元素内dom节点的获取

02.localstorage去取上次偏移量,移动到上次浏览位置   ---- 浏览推荐



nextTick：针对单一事件更新数据后立即操作dom
updated：任何数据的更新，如果要做统一的业务逻辑处理
watch：监听具体数据变化，并做相应的处理

http://www.dcloud.io/hellomui/examples/grid-default.html

http://www.dcloud.io/hellomui/

http://www.dcloud.io/hellomui/examples/grid-default.htmlwe



:问题解决：  stackoverflow.com  baiidu

https://vuex.vuejs.org/zh-cn/