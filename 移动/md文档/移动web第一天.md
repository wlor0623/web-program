##  总结 
1. 移动web介绍和两种开发方式(响应式开发方式 原生的开发方式)
2. 响应式的原理(CSS3的媒体查询)
3. 响应式开发框架(Bootstrap) 的介绍和基本信息 好处  版本
4. 了解框架和库的区别 主导者不一样 
5. 入门Bootstrap 起步 下载和引包
6. 阅读Bootstrap的文档 了解常用的全局CSS样式 和 组件 和JS插件
7. 搭建微金所项目目录结构
8. 创建主页引包 设置网页字体和空结构
9. 构建顶部通栏
10. container版心容器的使用和原理
11. 字体图标的生成 和使用
12. 栅格系统的使用和4个档次的尺寸范围

## 移动web前言

1. 移动web ： 移动端手机浏览器或者微信里面浏览的网页
2. 移动APP ： 手机上需要下载安装的应用程序

## 1. 移动web介绍
### 1.1 3 天 响应式开发 一套代码运行多个终端 优点:开发快 维护快 适配好  缺点加载速度慢 
### 1.2 3 天 纯原生移动web开发 一套代码运行一个端 优点: 加载速度快 缺点开发慢  维护慢 适配差
### 1.3 应用场景 : 
  1. 响应式开发用在一些新建的网站(PC和移动同时出来) 对加载速度要求不是很高
  2. 纯原生移动web开发 一般会用在一些已经有PC端上线的网站 再次开发移动端  移动端需要加载速度很快的网站

## 2. 响应式开发原理

### 2.1 CSS3的媒体查询： 通过查询屏幕的的宽度来指定某个宽度区间的网页布局
### 2.2 常见设备的屏幕宽度
  1.  超小屏幕（移动设备）    768px以下
  2.  小屏设备    768px-992px
  3.  中等屏幕    992px-1200px
  4.  宽屏设备    1200px以上

## 2.3 媒体查询的语法
          
```css
    @media screen and (条件){
        //满足条件执行CSS代码
    }

    and的前后必须有空格  条件通常只有两个 min-width max-width

    @media (条件){
        //满足条件执行CSS代码
    }

    可以简写省略 screen and
```


## 2.4 媒体查询的写法的顺序和特性

### 2.4.1 条件判断有两种 min-width 屏幕宽度大于等于某个值生效  max-width 屏幕宽度小于等于某个值的时候生效

### 2.4.2 条件判断的参考值通常有以下4个

      w > 1200  大屏幕 大屏PC设备
      992 < w < 1200  中屏幕 老式电脑
      768 < w< 992  小屏幕 平板设备
      w < 768 超小屏幕 手机

### 2.4.3 媒体查询判断的顺序说明

1.如果使用min-width条件判断的时候 条件判断大小 要从小到大写

  ```css
    @media screen and (min-width: 768px){
        body{
            background-color: green;
        }
    }
    /*w:992~1200 blue  min-width: 992px:当屏幕的宽度大于等于992的时候*/
    @media screen and (min-width: 992px){
        body{
            background-color: blue;
        }
    }
    /*w>1200 pink*/
   @media screen and (min-width: 1200px){
        body{
            background-color: pink;
        }
    }
    
  ```
2.如果使用max-width条件判断到时候 条件判断大小 要从大到小写

  ```css
    @media screen and (max-width: 1200px) {
        body {
            background-color: green;
        }
    }
    /*max-width: 992px:宽度在992以下*/

    @media screen and (max-width: 992px) {
        body {
            background-color: blue;
        }
    }
    /*max-width: 768px:宽度在768以下*/

    @media screen and (max-width: 768px) {
        body {
            background-color: pink;
        }
    }

  ```

### 2.3.4 写法的特性有两个

  1. 向上兼容 就是只写了小的判断 大的判断没有写但是在大屏幕下也会生效
  2. 向下覆盖 同时写了小的判断和大的判断 满足大的条件会生效大的条件的样式 大的条件写在后面会把小的条件的样式覆盖


### 2.3.5 使用媒体查询实现网页布局

1. 在大屏幕下显示4列 中屏幕显示3列 小屏幕显示2列 超小屏幕显示1列
      
      ```css
        /*w 768~992  每一行放置两个子元素  50%*/
        @media screen and (min-width: 768px){
            .box > div{
                width: 50%;
            }
        }
        /* w 992~1200 每一行放置三个子元素  33.33%*/
        @media screen and (min-width: 992px){
            .box > div{
                width: 33.33%;
            }
        }
        /*w >1200 每一行放置四个子元素 25%*/
        @media screen and (min-width: 1200px){
            .box > div{
                width: 25%;
            }
        }
      ```

2. 原理就是通过媒体查询判断条件改变盒子的宽度

## 3. 响应式开发框架 Bootstrap介绍

1. 特点：灵活简介，代码优雅，美观大方
2. 好处：Bootstrap 让我们的Web开发更简单，更快捷
3. 版本：目前市面上使用最多的是3.x.x版本 除此之外还有2.3.2对IE8支持 还有4.0.0的alpha内部测试版
4. 相关链接: [中文官网](http://v3.bootcss.com/) [使用Bootstrap构建的网站](http://expo.bootcss.com/)


## 4. 库和框架的区别

1. jquery : 库  便捷的DOM (你想实现什么功能就调用什么方法)(主导者是你 你调用库)
2. Bootstrap : 框架 界面工具集 框架是他来控制你 (框架制定好了一系列规则 你按照规则填坑)(主导者是框架 是框架调用你)(会用就行) 可以实现整个网站大多数
3. 插件： fullpage 功能比较单一 只是实现了网页里面的某个或几个功能

## 5. Bootstrap的基本使用

### 5.1 下载: 去Bootstrap官网[中文官网](http://v3.bootcss.com/) 的起步里面下载生产环境的Bootstrap 解压之后把整个文件夹放到项目里面来
### 5.2 引入Bootstrap

  1. 先引入Bootstrap的CSS(如果想要主题可以在引入带主题的CSS)
  2. 再引入自己的CSS
  3. 先引入jquery(因为Bootstrap依赖jquery)
  4. 再引入Bootstrap的JS
  5. 再引入自己的JS

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>Bootstrap 101 Template</title>

    <!-- Bootstrap -->
    <link href="lib/bootstrap/css/bootstrap.css" rel="stylesheet">

    <!-- html5 shiv是为了让低版本IE支持html5新标签  -->
    <!-- respond.js是为了让低版本IE支持CSS3媒体查询 -->
    <!-- 但是注意respond.js需要在服务器下运行 就是localhost 不能再file下运行不然无法工作 -->
    <!-- 条件注释 IE版本小于IE9 条件成立就执行下面的代码  如果条件不成立就是注释不执行 -->
    <!--[if lt IE 9]>
      <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
  
    <!-- bootstrap的JS插件依赖jquery 所以要先引入jquery -->
    <script src="lib/jquery/jquery.min.js"></script>
    <!-- 在引入Bootstrap的JS文件 -->
    <script src="lib/bootstrap/js/bootstrap.min.js"></script>
  </body>
</html>
```

### 5.3 引包的顺序 
  1. 先引入第三方的框架
  2. 再引入自己的文件
  3. CSS放到head里面引入(有些特殊的JS文件对页面渲染有作用的要放到head中)
  4. js放到body结束标签是上面引入

### 5.4 视口

1. 视口: 浏览器的可视窗口 在PC端是会受到浏览器窗口变化而变化
2. 视口在PC端是可视窗口(会变的) 在移动端有一个固定的值 通常是默认980
3. 但是默认移动端的时候980会造成网页的缩放或者出滚动条
4. 解决移动端默认视口会造成网页缩放和滚动条 设置meta标签设置默认是视口的宽度等于设备的宽度
    <meta name="viewport" content="width=device-width">

5. 视口的其他属性 初始化缩放 initial-scale=1.0 是否允许用户缩放 user-scalable=no 最大 maximum-scale=1.0 和最小缩放  minimum-scale=1.0
6. meta:vp+tab 凡是写移动端页面一来就是加上视口

### 5.5 浏览器兼容模式

1.  <meta http-equiv="X-UA-Compatible" content="IE=edge">  
2. http-equiv="X-UA-Compatible" 表示设置IE浏览器的兼容模式  
3. content="IE=edge" 表示让IE浏览器用最新的渲染引擎渲染页面


## 6. Bootstrap文档

### 6.1 基础CSS样式

- [概要](http://v3.bootcss.com/css/#overview) (常用)
    + 布局容器
- [栅格系统](http://v3.bootcss.com/css/#grid) (常用)
    + __xs__ : 超小屏幕 手机 (<768px)
    + __sm__ : 小屏幕 平板 (≥768px)
    + __md__ : 中等屏幕 桌面显示器 (≥992px)
    + __lg__ : 大屏幕 大桌面显示器 (≥1200px)
- [预置排版样式](http://v3.bootcss.com/css/#type)
    + 统一预制标签样式
    + 文本对齐 (常用)
    + 改变大小写 
- [代码样式](http://v3.bootcss.com/css/#code)
    + 页面输出代码
- [表格样式](http://v3.bootcss.com/css/#tables)
    + 各种表格样式
- [表单样式](http://v3.bootcss.com/css/#forms)
    + 各种表单组合的样式
- [按钮样式](http://v3.bootcss.com/css/#buttons)
    + 各种按钮颜色 和 按钮大小等样式 (常用)
- [图片样式](http://v3.bootcss.com/css/#images)
    + 图片圆角的样式
- [辅助工具类](http://v3.bootcss.com/css/#helper-classes)
    + 内容块居中 (常用)
    + 快速浮动 和 清除浮动 (常用)
    + 显示隐藏 (常用)
- [响应式工具类](http://v3.bootcss.com/css/#responsive-utilities) (常用)
    + __hidden-xx__ : 在某种屏幕下隐藏
    + __visible-xx__ : 在某种屏幕尺寸下显示
- 基础CSS这块只是将我们常用想一些元素的样式做了美化,如果需要使用直接拿过来用就行了
 
### 6.2 预制界面组件
- [导航](http://v3.bootcss.com/components/#nav) (常用)
- [导航条](http://v3.bootcss.com/components/#navbar) (常用)
- [面包屑导航](http://v3.bootcss.com/components/#breadcrumbs)
- [下拉菜单](http://v3.bootcss.com/components/#dropdowns) (常用)
- [按钮式下拉菜单](http://v3.bootcss.com/components/#btn-dropdowns)
- [按钮组](http://v3.bootcss.com/components/#btn-groups)
- [输入框组](http://v3.bootcss.com/components/#input-groups)
- [警告框](http://v3.bootcss.com/components/#alerts)
- [页头](http://v3.bootcss.com/components/#page-header)
- [分页](http://v3.bootcss.com/components/#pagination)
- [列表组](http://v3.bootcss.com/components/#list-group) (常用)
- [面板](http://v3.bootcss.com/components/#panels) (常用)
- [媒体对象](http://v3.bootcss.com/components/#media) (常用)
- [进度条](http://v3.bootcss.com/components/#progress)
- [Glyphicons字体图标](http://v3.bootcss.com/components/#glyphicons) (常用)
- [标签](http://v3.bootcss.com/components/#labels)
- [徽章](http://v3.bootcss.com/components/#badges)
- [缩略图](http://v3.bootcss.com/components/#thumbnails)
- [大屏幕](http://v3.bootcss.com/components/#jumbotron)
- [嵌入内容](http://v3.bootcss.com/components/#responsive-embed)
- [内嵌](http://v3.bootcss.com/components/#wells)
- 将我们日常使用的一些功能块例如下拉菜单,提前写好,我们使用时直接找到对应的demo然后拿回来做相应调整就行了

### 6.3 Javascript 插件
- [模态对话框](http://v3.bootcss.com/javascript/#modals) (常用)
- [下拉菜单](http://v3.bootcss.com/javascript/#dropdowns) (常用)
- [滚动监听](http://v3.bootcss.com/javascript/#scrollspy) (常用)
- [标签页](http://v3.bootcss.com/javascript/#tabs) (常用)
- [工具提示](http://v3.bootcss.com/javascript/#tooltips)
- [弹出框](http://v3.bootcss.com/javascript/#popovers)
- [警告框](http://v3.bootcss.com/javascript/#alerts)
- [按钮](http://v3.bootcss.com/javascript/#buttons)
- [折叠面板](http://v3.bootcss.com/javascript/#collapse) (常用)
- [轮播图](http://v3.bootcss.com/javascript/#carousel) (常用)
- [吸顶效果](http://v3.bootcss.com/javascript/#affix) (常用)
    + data-spy="affix"
    + data-offset-top="什么位置出现"
    + data-offset-bottom="什么位置消失"
    
### 6.4 Javascript插件依赖情况
  - [jQuery](https://github.com/jquery/jquery)
  > Bootstrap 框架中的所有JS组件都依赖jquery实现

## 7. 微金所项目搭建

### 7.1 搭建Bootstrap页面骨架及项目目录结构

```
├─ /weijinsuo/ ··················· 项目所在目录
└─┬─ /css/ ······················· 我们自己的CSS文件
  ├─ /font/ ······················ 使用到的字体文件
  ├─ /img/ ······················· 使用到的图片文件
  ├─ /js/ ························ 自己写的JS脚步
  ├─ /lib/ ······················· 从第三方下载回来的库【只用不改】
  ├─ /favicon.ico ················ 站点图标
  └─ /index.html ················· 入口文件
```
#### 7.1.1 约定编码规范

##### 1. HTML约定
1. 在head中引入必要的CSS文件,优先引入第三方的CSS,方便我们自己的样式覆盖
2. 在body末尾引入必要的JS文件,优先引入第三方的JS文件,注意JS文件之间的依赖关系
比如Bootstrap.js 依赖jquery,那就应该先引入jquery.js 然后引用Bootstrap.js

##### 2. CSS约定
1. 除了公共级别的样式,其余样式全部由模块前缀
2. 尽量使用直接子代选择器 少用间接子代选择器避免误杀

### 7.2 创建主页 引入相应的文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>页面标题</title>
  <link rel="stylesheet" href="lib/bootstrap/bootstrap.css">
  <link rel="stylesheet" href="index.css">
</head>
<body>
  <script src="lib/jquery/jquery.js"></script>
  <script src="lib/bootstrap/bootstrap.js"></script>
  <script src="index.js"></script>
</body>
</html>
```

### 7.3 在我们默认样式表中讲默认字体设置为

```css
body{
  font-family: "Helvetica Neue", Helvetica, Microsoft Yahei, Hiragino Sans GB, WenQuanYi Micro Hei, sans-serif;
}
```

### 7.4 完成页面空结构
  > 先划分好页面的大容器,然后具体看每一个容器的单独情况

  ```html
    <!--  头部区域 -->
    <header></header>
    <!-- /头部区域 -->
    <!--  广告轮播 -->
    <section></section>
    <!-- /广告轮播 -->
    <!--  立即预约 -->
    <section></section>
    <!-- /立即预约 -->
    <!--  产品介绍 -->
    <section></section>
    <!-- /产品介绍 -->
    <!--  新闻资讯 -->
    <section></section>
    <!-- /新闻资讯 -->
    <!--  合作伙伴 -->
    <section></section>
    <!-- /合作伙伴 -->
    <!-- 脚注区域 -->
    <footer></footer>
    <!-- /脚注区域 -->
  ```

### 7.5 构建顶部通栏
  ```html
      <div class="topbar hidden-xs hidden-sm">
          <div class="container">
              <div class="row">
                  <div class="col-md-2 text-center">
                      <i class="icon-mobilephone"></i> 手机微金所 <i class="glyphicon glyphicon-chevron-down"></i>
                  </div>
                  <div class="col-md-5 text-center"> <i class="icon-telephone"></i> 4006-89-4006（服务时间：9:00-21:00）
                  </div>
                  <div class="col-md-2 text-center">常见问题 财富登录</div>
                  <div class="col-md-3 text-center">
                      <a href="" class="btn btn-danger">免费注册</a>
                      <a href="" class="btn btn-link">登录</a>
                  </div>
              </div>
          </div>
      </div>
  ```
#### 7.5.1 container 类 (版心)

- 用于定义一个固定宽度且居中的版心
  ```html
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <title>Document</title>
        <style>
        html,
        body {
            margin: 0;
            padding: 0;
        }

        .container {
            height: 200px;
            width: 100%;
            background-color: #f40;
            margin: 0 auto;
        }

        @media (min-width:768px) {
            .container {
                width: 750px;
            }
        }

        @media (min-width:992px) {
            .container {
                width: 970px;
            }
        }

        @media (min-width:1200px) {
            .container {
                width: 1170px;
            }
        }
        </style>
    </head>

    <body>
        <div class="container">
        </div>
        </script>
    </body>

    </html>
  ```



#### 7.5.2 栅格系统

```html
<div class="row">
  <div class="col-md-2">
  </div>
  <div class="col-md-5">
  </div>
  <div class="col-md-2">
  </div>
  <div class="col-md-3">
  </div>
</div>
```

#### 1. row类

```html
<div class="row">
</div>
```

#### 2. col-*\*-\* 类
```html
<div class="col-md-3">
</div>
```
- col-xs-[列数]：在超小屏幕下展示几份
- col-sm-[列数]：在小屏幕下展示几份
- col-md-[列数]：在中等屏幕下展示几份
- col-lg-[列数]：在大屏幕下展示几份
- __xs__ : 超小屏幕 手机 (<768px)
- __sm__ : 小屏幕 平板 (≥768px)
- __md__ : 中等屏幕 桌面显示器 (≥992px)
- __lg__ : 大屏幕 大桌面显示器 (≥1200px)
> 此处顶部通栏已经被划分为四列
> text-center的作用就是让内部内容居中显示

#### 7.5.3 字体图标 

##### 1. [字体图标生成网站](https://icomoon.io/)
```css
@font-face {
    font-family: 'itcast';
    src: url('../fonts/MiFie-Web-Font.eot') format('embedded-opentype'), url('../fonts/MiFie-Web-Font.svg') format('svg'), url('../fonts/MiFie-Web-Font.ttf') format('truetype'), url('../fonts/MiFie-Web-Font.woff') format('woff');
}

[class^="icon-"],
[class*=" icon-"] {
    /*注意上面选择器中间的空格
我们使用的名为itcast的字体就是最上面的@font-face的方式声明*/
    /*当字体名字之间有空格的都要用引号引起来 ,如果没有空格的话可以不用引号*/
    font-family: itcast;
}
```
##### 2. 字体格式
- eot : embedded-opentype
- svg : svg
- ttf : truetype
- woff : woff

##### 3. 字体图标生成步骤

1. 进入 https://icomoon.io/ 网站
2. 点击右上角 icomoonApp
3. 点击左上角 import icons
4. 选中所有导入的图标
5. 点击右下角 generate font
6. 点击左上角 preferences 设置字体名称 和 类名前缀
7. 点击download
8. 解压生成好的压缩包 里面有demo.html
9. 打开demo.html能够查看图标对应类名
10. 使用 的时候 把 fonts文件夹放到项目 并且引入style.css（这里面就定义了那些图标的类名）

##### 3. 字体图标的使用步骤
1. 得下载或者生成或者去借(去别的网站拿)一个字体文件
2. 使用@font-face定义一个字体名称 
         1. 先指定字体的名称font-family:"字体名称";
         2. 引入这个字体名称对应的字体文件 如果不考虑兼容只引入ttf src:url(路径.ttf) format("truetype")
3. 定义一个图标的类名来使用图标
         1. 先使用图标对应的字体名称font-family:"字体名称";
         2. 指定图标的编码放到类名的伪元素的content里面 content: "\e945";
         3. 清除默认的斜体 
4. 在页面使用定义好的图标的类名就可以了



## 总结

1. 移动web ： 移动端浏览器显示的网页
2. 移动web的两种开发方式
    1. 响应式开发方式：一套代码运行多个终端  开发快维护快加载慢 适配好 用在一些新建的网站对速度要求不高的
    2. 纯原生移动web开发 ：分别写两套代码 开发慢维护慢加载快 适配差 用在一些已经上线的了PC再次开发移动web 对加载速度要求高的网页
3. 响应式开发原理
    1. CSS3媒体查询实现
    2. 媒体查询语法
      @meida screen and (){
        sreen and 可以省略 如果不省略 and前后要有空格

      }
    3. 媒体查询的条件判断和顺序说明
        1. 媒体查询有两个条件判断 min-width: 屏幕宽度大于等于某个值成立 条件判断要从小到大写
        2. max-width：屏幕宽度小于等于某个值成立 条件判断要从大到小写
    4. 媒体查询的特性
        1. 向上兼容 ： 没有写大的判断 也能生效小屏幕的判断
        2. 向下覆盖 ： 同时写了小和大屏幕的判断 大屏幕在后面会覆盖小屏幕的样式
4. 响应式开发框架Bootstrap： 灵活简介 代码优雅 美观大方

5. 使用Bootstrap框架
    1. 下载 
    2. 引入bootstrap 
          1. 先引入bootstrap.css
          2. 引入jquery
          3. 引入bootstrap.js
6. 视口 ： 浏览器可视窗口移动端设置视口和设备一样宽 快捷键meta:vp
6. 布局容器 .container : 固定宽度且居中 .container-fluid 宽度100%
7. 栅格系统
    1. 栅格系统的4个档次
      col-xs w<768
      col-sm 768<w<992
      col-md 992<w<1200
      col-lg w>1200
    2. 栅格系统默认一行分为12列
      分成4列 col-xx-3
      分理3列 col-xx-4
      分理2列 col-xx-6
      分理1列 col-xx-12

  8. 搭建微金所项目 fonts css/font.css img lib

  9. 创建Index.html 引包 先引入第三方 再引入自己的

  10. 创建页面的骨架
  11. 搭建顶部通栏 .container>.row>col-md-2col-md-5col-md-2col-md-3
  12. 字体图标
      1. bootstrap官方图标 组件》字体图标 拷贝图标类名即可
      2. 自己生成字体图标 icomoon.io网站生成
      3. 引入生成好的字体图标样式文件同时字体文件要放在旁边
  13. bootstrap的按钮 全局CSS 》 按钮 
