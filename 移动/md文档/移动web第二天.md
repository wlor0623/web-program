## 反馈

1. 讲课不够激情 太平淡 多开车 上高速 黑三林
2. 语速有点快 ，有些时候听不清楚
3. 字体图标的使用不太懂
4. 栅格系统的使用不太懂


## 总结

1. less预处理器的语法
2. 使用轮播图插件
3. 轮播图背景图的改造
4. 特色介绍版块(栅格系统的使用 媒体对象的使用(a不能套a))
5. 立即预约 左浮动 和右浮动的使用
6. tab栏的使用 (知道tab栏标题和面板之间的关联关系 data-toggle控制开关)
7. 面板组件的改造 一左一右的面板 让头部右浮动 身体外边距等于头部的宽度



## 1. less的使用

### 1.1 使用less预处理器(引入和编译)

  1. 引入less文件 <link rel="stylesheet/less" href="index.less">(注意rel="stylesheet/less")
  2. 引入less编译器文件 <script src="lib/less/less.js"></script> 用来动态加载less文件并创建style标签把CSS放到style标签里面
  3. 注意使用服务器访问页面  localhost形式 不能用file

### 1.2 less基本语法

1.   定义变量 @变量名:变量值
2.   使用变量 属性:变量名
3.   注释  // 会被删除 /**/不会被删除
4.   嵌套的使用          
     ```css
        .container .row div{} //css写法
        .container{  //less写法
          .row{
            div{

            }
          }
        }
     ```

### 1.3 less语法的&的意思 

```css
  li.active{//css语法
    color:#666;
  }
  li{//less语法
    &.active{
      color:#666;
    }
  }
```

```css
  a:hover{//css语法

  }
  a{//less语法
    &:hover{
      color:#ccc;
    }
  }
```

```css
  div::before{//css语法
    content:"";
  }
  div{//less语法
    &::before{
      content:"";
    }
  }
```

####  1.3.1 &的应用场景
        1. 伪类的时候会用到
        2. 伪元素的时候
        3. 交集选择器或者兄弟选择器
        ```css
        div{
          &+div{
            
          }
          &~div{
    
          }
        }
        ```

## 2. 导航条

### 2.1 导航条的基本布局
```html
  <!-- 导航条 -->
  <nav class="navbar navbar-default" role="navigation">
      <div class="container">
          <!-- 品牌和切换分组是为了获得更好的手机显示 -->
          <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="#">
                  <i class="icon-icon"></i>
                  <i class="icon-logo"></i>
              </a>
          </div>
          <!--导航条的链接 -->
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul class="nav navbar-nav">
                  <li class="active"><a href="#">我要投资</a></li>
                  <li><a href="#">我要借款</a></li>
                  <li><a href="#">平台介绍</a></li>
                  <li><a href="#">新手专区</a></li>
                  <li><a href="#">最新动态</a></li>
                  <li><a href="#">微论坛</a></li>
              </ul>
              <ul class="nav navbar-nav navbar-right">
                  <li><a href="#">个人中心</a></li>
              </ul>
          </div>
          <!-- /.navbar-collapse -->
      </div>
      <!-- /.container-fluid -->
  </nav>
```

### 2.2 导航条的样式修改

```css
  .navbar-default {
        background-color: #fff;
        margin-bottom: 0;
        >.container {
            >.navbar-header {
                >.navbar-brand {
                    line-height: 50px;
                    display: block;
                    height: 80px;
                }
            }
            >.navbar-collapse {
                >.navbar-nav {
                    >li {
                        >a {
                            line-height: 48px;
                            border-bottom: 2px solid transparent;
                        }
                        &.active {
                            >a {
                                background-color: #fff;
                                border-bottom: 2px solid #e92322;
                            }
                        }
                        &:hover {
                            >a {
                                border-bottom: 2px solid #e92322;
                            }
                        }
                    }
                }
            }
        }
    }
```

## 3. 轮播图

### 3.1 轮播图插件的使用

```html
  <!-- 轮播图区域 -->
  <section id="slide">
      <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
          <!-- 指示器 下面的小圆点 -->
          <ol class="carousel-indicators">
              <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
              <li data-target="#carousel-example-generic" data-slide-to="1"></li>
              <li data-target="#carousel-example-generic" data-slide-to="2"></li>
              <li data-target="#carousel-example-generic" data-slide-to="3"></li>
          </ol>
          <!-- 轮播图的轮容器 -->
          <div class="carousel-inner" role="listbox">
              <!-- item是轮播图的每一项 -->
              <div class="item active" style="background-image:url(img/slide_01_2000x410.jpg)">
              </div>
              <div class="item" style="background-image:url(img/slide_02_2000x410.jpg)">
              </div>
              <div class="item" style="background-image:url(img/slide_03_2000x410.jpg)">
              </div>
              <div class="item" style="background-image:url(img/slide_04_2000x410.jpg)">
              </div>
          </div>
          <!-- Controls -->
          <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
              <span class="glyphicon glyphicon-chevron-left"></span>
              <span class="sr-only">Previous</span>
          </a>
          <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
              <span class="glyphicon glyphicon-chevron-right"></span>
              <span class="sr-only">Next</span>
          </a>
      </div>
  </section>
```

### 3.2 轮播图的大图背景图处理

```css
#slide {
    >.slide {
        >.carousel-inner {
            >.item {
                height: 410px;
                background-repeat: no-repeat;
                background-position: center center;
            }
        }
    }
}
```

## 4. 特色介绍

### 4.1 网格系统
```html
    <div class="row">
      <div class="col-sm-6 col-md-4">
      </div>
      <div class="col-sm-6 col-md-4">
      </div>
      <div class="col-sm-6 col-md-4">
      </div>
      <div class="col-sm-6 col-md-4">
      </div>
      <div class="col-sm-6 col-md-4">
      </div>
      <div class="col-sm-6 col-md-4">
      </div>
    </div>
```

### 4.2 媒体对象类型
```html
     <div class="media">
        <a href="#">
            <div class="media-left">
                <i class="icon-meiyuan"></i>
            </div>
            <div class="media-body">
                <h4 class="media-heading">支付交易保障</h4>
                <p>银联支付全程保障财产安全</p>
            </div>
        </a>
    </div>
```
### 4.3 响应式辅助类工具
```html
     <section id="features" class="hidden-xs">
     </section>
```

- hidden-xx

## 5. 立即预约

### 5.1 pull-left 左浮动
```html
    <div class="pull-left">
              <i class="icon-naozhong"></i>现在有<span class="text-danger">458</span>人在排队，累计预约交易成功<span class="text-danger">7409</span>次。 什么是预约投标？ <a href="#" class="text-danger">立即预约</a>
   </div>
```
### 5.2 pull-right 右浮动
```html
    <div class="pull-right">
              <a href="#"> <i class="icon-video"></i>微金所企业宣传片</a>
    </div>
```
### 5.3 text-danger的使用
```html
    <span class="text-danger">458</span>
```

## 6. 产品推荐

### 6.1 产品推荐tab栏的使用

```html
<!-- tab栏标题 -->
<ul class="nav nav-tabs" role="tablist">
<li role="presentation" class="active"><a href="#product1" role="tab" data-toggle="tab">特别推荐</a></li>
<li role="presentation"><a href="#product2" role="tab" data-toggle="tab">微投资</a></li>
<li role="presentation"><a href="#product3" role="tab" data-toggle="tab">微小宝</a></li>
<li role="presentation"><a href="#product4" role="tab" data-toggle="tab">微消费</a></li>
<li role="presentation"><a href="#product5" role="tab" data-toggle="tab">微增利</a></li>
<li role="presentation"><a href="#product6" role="tab" data-toggle="tab">微金宝</a></li>
<li role="presentation"><a href="#product7" role="tab" data-toggle="tab">微转让</a></li>
<li role="presentation" class="pull-right"><a href="#product8" role="tab" data-toggle="tab">更多</a></li>
</ul>
```

```html
<!-- tab面板-->
<div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="product1">1
    </div>
    <div role="tabpanel" class="tab-pane" id="product2">2</div>
    <div role="tabpanel" class="tab-pane" id="product3">3</div>
    <div role="tabpanel" class="tab-pane" id="product4">4</div>
    <div role="tabpanel" class="tab-pane" id="product5">5</div>
    <div role="tabpanel" class="tab-pane" id="product6">6</div>
    <div role="tabpanel" class="tab-pane" id="product7">7</div>
    <div role="tabpanel" class="tab-pane" id="product8">8</div>
</div>
```

### 6.2 产品推荐tab栏标题的样式修改

```css
.nav-tabs {
    >li {
        a {
            font-size: 16px;
            color: #333;
            border: 0;
            &:hover {
                background-color: transparent;
            }
        }
        &.active {
            >a {
                background-color: transparent;
                border-bottom: 3px solid @mainColor;
            }
        }
    }
}
```

### 6.3 产品推荐 tab面板的栅格布局

```html
  <div role="tabpanel" class="tab-pane active" id="product1">
    <div class="row">
        <div class="col-md-4 col-sm-6">
        </div>
        <div class="col-md-4 col-sm-6">
        </div>
        <div class="col-md-4 col-sm-6">
        </div>
        <div class="col-md-4 col-sm-6">
        </div>
        <div class="col-md-4 col-sm-6">
        </div>
        <div class="col-md-4 col-sm-6">
        </div>
    </div>
  </div>
```

### 6.4 产品推荐 产品面板的使用

```html
  <div class="panel panel-default active">
      <div class="panel-heading">
          <p><strong>8</strong><sub>%</sub></p>
          <p>年率利</p>
      </div>
      <div class="panel-body">
          <h4>新手体验标008期</h4>
      </div>
  </div>
```

### 6.5 产品推荐 产品面板左边自适应右边固定的样式调整

```css
  .panel-default {
      >.panel-heading {
          float: right;
          width: 120px;
          height: 160px;
          border-bottom: 0;
          border-left: 1px dashed #ccc;
          background-color: #fff;        
      }
      >.panel-body {
          margin-right: 120px;
          height: 160px;
      }
  }
```

### 6.6 产品推荐产品面板的两个小半圆

```css
.panel-heading {
  &::before,
  &::after {
      content: "";
      position: absolute;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #f0f0f0;
      left: -8px;
  }
  &::before {
      top: -8px;
      box-shadow: 1px 1px 1px #ccc;
  }
  &::after {
      bottom: -8px;
      box-shadow: -1px -1px 1px #ccc;
  }
}
```

### 6.7 产品推荐的左边的栅格系统

```html
<div class="row">
  <div class="col-xs-6">
      <p>起步价</p>
      <p><strong>1000.00</strong><sub>万</sub></p>
  </div>
  <div class="col-xs-6">
      <p>起步价</p>
      <p><strong>1000.00</strong><sub>万</sub></p>
  </div>
</div>
```