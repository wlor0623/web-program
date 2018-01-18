## 反馈

1. 产品区域还是不太懂
2. 产品区域992-1200的时候文字会掉下来
3. 听的时候很清楚自己写的时候也知道怎么写就是一些bug单词错误要找好久
4. 对于宽度100%不太理解
5. 边讲边练挺好的
6. 总是听着听着睡着

## 总结

1. 移动端的一些基本基础知识
2. 移动京东的项目搭建
3. 公共样式的定义
4. 顶部通栏的布局
5. 轮播图的布局
6. 导航条的布局
7. 秒杀商品布局
8. 京东超市布局

## 原生移动web开发方式  M站就是移动web站点

1. 网页布局几乎是使用百分比布局(流式布局)
2. JS使用原生JS实现 推荐多使用HTML5新增的JSAPI  qs addEventlistener

## 1. 屏幕

1. 屏幕的尺寸 3.5 4.0 5.5指的是对角线的长度 尺寸是固定   一英寸=2.54厘米
2. 屏幕分辨率 PC的分辨率 1366*768px  1366指的是宽的分辨率 768px指的高的分辨率 
  手机的分辨率1334x750像素 1334指的高的分辨率 750指的是宽的分辨率
3. 模拟和真机的设备的像素 375*667px 375指的是设备的真实宽度是375px 667px指的是设备的真实高度是667px

## 2. 长度单位

1. px em pt （相对单位）   in cm (绝对单位)


## 3. 像素密度

1. 像素密度指的是1英寸里面的像素的数量 比如1英寸里面是10px   通常有两种 163 3gs   330 4s 通常超过320的像素密度就是高清屏  计算方式 屏幕的分辨率高的平方+屏幕分辨率的宽的平方开根号 除以 英寸

## 4. 设备独立像素

1. 表示真实像素和分辨率像素的一个比例  比如3gs手机 高度480px 宽度320px 分辨率  真实设备 高度480px 宽度320px 即分辨率和真实像素一样的时候 1pt=1px
   但是有一些设备 高度960px 宽度640px 分辨率  真实设备 高度480px 宽度320px 即分辨率和真实像素一样的时候 1pt=2px  

## 5. 物理像素和CSS像素

1. 物理像素(分辨率的像素) 960*640
2. CSS像素(真实像素)  模拟器里面看见的320*568

## 

## 6. 搭建JD项目结构

1. 创建项目的文件夹
2. 把images lib 文件夹拷到项目里面
3. 创建index.html 创建css文件夹 创建base.css index.css

## 7. 京东首页公共样式

### 7.1 公共样式的作用
  - 1. 公共样式的概念: 即 所有页面都会用到的一些样式 通常会放到一个公共样式里面 通常文件名为base.css或者reset.css
  - 2. 公共样式里面通常放哪些样式： 
    * 1. 样式的重置例如清除默认的元素间距 列表项 边框 等等
    * 2. 一些会经常重复使用到的样式 例如浮动 定位 清除浮动 等等

### 7.2 移动端新增的两个样式初始化
  - 1. 盒模型都设置成border-box ：  box-sizing: border-box;
  - 2. 清除移动端点击高亮的背景色 ：  -webkit-tap-highlight-color:transparent;

## 8. 京东首页顶部的完成

### 8.1 构建京东主体布局容器layout
  1. 在body里面创建一个div设置主体布局容器
      ```html
           <!-- 主页的布局容器 -->
           <div id="layout">
           </div>
      ```
  2. 设置layout的基本样式 宽度 最大和最小宽度 居中 背景色 相对定位
      ```css
        #layout {
            min-width: 320px;
            max-width: 640px;
            margin: 0px auto;
            background-color: #f0f0f0;
        }
      ```

### 8.2 构建京东顶部搜索区域
  1. 分析顶部搜索区域的页面结构：  一个大盒子里面包含左边一个图标中间一个表单(表单里面包含一个图标和输入框)右边一个登录超链接
    ```html
        <!-- 顶部通栏 -->
        <header id="topbar">
            <i class="icon-logo"></i>
            <form action="#">
                <i class="icon-search"></i>
                <input type="text" placeholder="请输入">
            </form>
            <a href="#" class="login">登录</a>
        </header>
    ```
  2. 页面的样式
    ```css
      #topbar {
          height: 40px;
          background-color: transparent;
          position: fixed;
          max-width:640px;
          width: 100%;
          z-index: 1;
          >.icon-logo {
              background-image: url(../images/sprites.png);
              background-position: 0 -109px;
              background-size: 200px 200px;
              position: absolute;
              width: 60px;
              height: 24px;
              top: 8px;
              left: 10px;
          }
          >form {
              padding-left: 75px;
              padding-right: 50px;
              >.icon-search {
                  background-image: url(../images/sprites.png);
                  background-position: -60px -109px;
                  background-size: 200px 200px;
                  position: absolute;
                  width: 20px;
                  height: 20px;
                  left: 80px;
                  top: 10px;
              }
              >input {
                  width: 100%;
                  height: 30px;
                  margin-top: 5px;
                  border-radius: 30px;
                  padding-left: 30px;
              }
          }
          >.login {
              position: absolute;
              right: 10px;
              top: 10px;
              color: #fff;
          }
      }
    ```
  3. 移动端2倍图的精灵图使用和原理
      + 移动端为了兼容不同分辨率的屏幕会把图片设计得比较大而让在小分辨率下的手机进行缩放显示
      + 通常有2倍图和3倍图两种图片 
      + 但是页面上显示的区域的宽高只有图片宽高的一半 所以在我们页面使用的时候要把图片压缩一倍放到页面上显示
      + 做法如果是背景图就使用背景大小background-size来设置 如果是图片标签就直接设置img的宽高来设置
  4. logo的背景图设置和搜索框的背景图设置
      ```css
          >.icon-logo {
            background-image: url(../images/sprites.png);
            // 因为图片比真实放到页面上的大1倍 所以要缩小一倍插进来
            background-size: 200px 200px;
            background-position: 0 -109px;
        }
        >.icon-search {
            background-image: url(../images/sprites.png);
            // 因为图片比真实放到页面上的大1倍 所以要缩小一倍插进来
            background-size: 200px 200px;
            background-position: -60px -109px;
        }
      ```
  5. 左右两边固定宽度 中间自适应的布局 的 实现方式 
      + 把左右两边的元素通过定位分别定位在左边和右边
      + 设置表单的宽度100% 同时设置表单距离左边和右边的padding让输入框到中间去而不盖住左右两边的内容

## 9. 京东首页轮播图的布局

1. 轮播图页面结构的分析
    + 1. 在移动端需要实现自动无缝轮播且还要做左右滑动 所以除了在轮播图后面要放第一张之外还要在 第一张之前放最后一张 所以如果真实轮播图是8张就需要10张图
    ```html
       <section id="slide">
            <ul class="clearfix">
                <!-- 在第一张前面放第8张 -->
                <li><a href="#"><img src="images/l8.jpg" alt=" "></a></li>
                <li><a href="#"><img src="images/l1.jpg" alt=" "></a></li>
                <li><a href="#"><img src="images/l2.jpg" alt=" "></a></li>
                <li><a href="#"><img src="images/l3.jpg" alt=" "></a></li>
                <li><a href="#"><img src="images/l4.jpg" alt=" "></a></li>
                <li><a href="#"><img src="images/l5.jpg" alt=" "></a></li>
                <li><a href="#"><img src="images/l6.jpg" alt=" "></a></li>
                <li><a href="#"><img src="images/l7.jpg" alt=" "></a></li>
                <li><a href="#"><img src="images/l8.jpg" alt=" "></a></li>
                <li><a href="#"><img src="images/l1.jpg" alt=" "></a></li>
                <!-- 在第8张后面放第一张 -->
            </ul>
        </section>
    ```
2. 轮播图的样式修改 
    ```css
        #slide {
          overflow: hidden;
          position: relative;
          >ul:first-of-type {
              width: 1000%;
              transform: translateX(-10%);
              >li {
                  width: 10%;
                  float: left;
                  img {
                      display: block;
                      width: 100%;
                  }
              }
          }
          >ul:last-of-type {
              width: 128px;
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              bottom: 10px;
              >li {
                  width: 6px;
                  height: 6px;
                  float: left;
                  border-radius: 50%;
                  border: 1px solid #fff;
                  margin-left: 10px;
              }
          }
      }
    ```
    + 1. 有10张图片每一张图片的宽度都等于整个slide容器的宽度所以ul的宽度是slide容器的10倍即1000%
    + 2. ul里面的每一张图也就是li的宽度等于slide容器的宽度也是ul的1/10 即宽度10% 同时添加浮动
    + 3. 但是默认要显示的图片的第一张第一张的真实位置在第二个li里面所以要让ul有一个默认的1张图的偏移 transform: translateX(-10%);    
    + 4. 小圆点设置定位居中 left:50%;  left是相对于父元素的宽度   transform: translateX(-50%); translateX是相对于自身的宽度

## 10. 京东首页导航条的布局

1. 导航条结构 : 一个ul 里面放8个li导航项里面有a和img和p标签

  ```html
       <!-- 导航条 -->
        <nav id="nav">
            <ul class="clearfix">
                <li>
                    <a href="#">
                  <img src="images/nav0.png" alt=" ">
                  <p>导航菜单</p>
                  </a>
                </li>
                <li>
                    <a href="#">
                  <img src="images/nav1.png" alt=" ">
                  <p>导航菜单</p>
                  </a>
                </li>
                <li>
                    <a href="#">
                  <img src="images/nav2.png" alt=" ">
                  <p>导航菜单</p>
                  </a>
                </li>
                <li>
                    <a href="#">
                  <img src="images/nav3.png" alt=" ">
                  <p>导航菜单</p>
                  </a>
                </li>
                <li>
                    <a href="#">
                  <img src="images/nav4.png" alt=" ">
                  <p>导航菜单</p>
                  </a>
                </li>
                <li>
                    <a href="#">
                  <img src="images/nav5.png" alt=" ">
                  <p>导航菜单</p>
                  </a>
                </li>
                <li>
                    <a href="#">
                  <img src="images/nav6.png" alt=" ">
                  <p>导航菜单</p>
                  </a>
                </li>
                <li>
                    <a href="#">
                  <img src="images/nav7.png" alt=" ">
                  <p>导航菜单</p>
                  </a>
                </li>
            </ul>
        </nav>
  ```
2. 导航条的样式修改 

  ```css
    #nav {
        padding: 5px;
        background-color: #fff;
        >ul {
            >li {
                width: 25%;
                float: left;
                text-align: center;
                >a {
                    display: block;
                    img {
                        width: 60px;
                    }
                    p {
                        margin:5px 0;
                        font-size: 14px;
                    }
                }
            }
        }
    }
  ```
- 整个导航区域背景色白色 但是要注意给导航条ul添加清除浮动 不然导航条容器没有高度
- 流式布局的使用 w25% 浮动 内容里面的图片宽度固定
- 子元素和父元素之间的间距用padding
- 兄弟元素之间的距离用margin

## 11. 京东首页秒杀商品和京东超市布局

### 11.1 秒杀商品的布局

  - 秒杀商品结构 : 分为秒杀的标题和秒杀的内容  
      + 秒杀标题里面包含图标 文字和秒杀倒计时和更多
      + 秒杀内容里面包含 列表里面列表里面分别有图片和价格

  ```html
        <!-- 秒杀商品 -->
        <div class="seckill">
            <!-- 秒杀商品标题 -->
            <div class="seckill-title clearfix">
                <div class="icon-seckill">
                    <img src="images/seckill-icon.png" alt="">
                </div>
                <div class="seckill-name">
                    掌上秒杀
                </div>
                <div class="seckill-downtime">
                    <span>0</span>
                    <span>0</span>
                    <span>:</span>
                    <span>0</span>
                    <span>0</span>
                    <span>:</span>
                    <span>0</span>
                    <span>0</span>
                </div>
                <div class="seckill-more">
                    更多>
                </div>
            </div>
            <!-- 秒杀商品内容 -->
            <div class="seckill-content">
                <ul class="clearfix">
                    <li><a href="#">
                  <img src="images/detail01.jpg" alt="">
                  <p>￥10.00</p>
                  <p>￥10.00</p>
                </a></li>
                    <li><a href="#">
                  <img src="images/detail01.jpg" alt="">
                  <p>￥10.00</p>
                  <p>￥10.00</p>
                </a></li>
                    <li><a href="#">
                  <img src="images/detail01.jpg" alt="">
                  <p>￥10.00</p>
                  <p>￥10.00</p>
                </a></li>
                </ul>
            </div>
        </div>
  ```
    2. 秒杀商品的样式
      + 秒杀商品的整体白色背景色 但是注意要分别给标题和内容清除浮动不然没有高度
      + 头部图标的宽高调整 width: 20px; height: 25px;   
      + 图标和秒杀文字和倒计时都浮动左边 更多浮动在右边
      + 倒计时的第3个和第6个样式不一样使用nth-of-type(3n)选中3和6个
      + 秒杀商品内容的百分比布局33.33% 浮动
      + 商品的价格添加中划线    text-decoration: line-through;
  ```
    .seckill{
        background-color: #fff;
        >.seckill-title{
            padding: 0 10px;
            line-height: 40px;
            >.icon-seckill{
                float: left;            
                >img{
                    width: 20px;
                    height: 25px;                    
                }
            }
            >.seckill-name{
                float: left;
                font-size: 14px;
                color:#d8505c;
                margin-left: 10px;
            }
            >.seckill-downtime{
                margin-left: 10px;
                float: left;
                >span{
                    color:#fff;
                    background-color: #000;
                    width: 15px;
                    height: 15px;
                    line-height: 15px;
                    text-align: center;
                    display: inline-block;
                    &:nth-of-type(3n){
                        background-color: #fff;
                        color:#000;
                    }
                }
            }
            >.seckill-more{
                float: right;
                font-size: 14px;
            }
        }
        >.seckill-content{
            >ul{
                >li{
                    width: 33.33%;
                    float: left;
                    border-right: 1px solid #ccc;
                    &:last-of-type{
                        border-right: none;
                    }
                    >a{
                        display: block;
                        text-align: center;
                        >img{
                            width: 60%;
                        }
                        >p{
                            font-size: 12px;
                            &:first-of-type{
                                color:#d8505c;
                            }
                            &:last-of-type{
                                text-decoration: line-through;
                            }
                        }
                    }
                }
            }
        }
    }
  ```

### 11.2 京东超市商品布局

1. 京东超市页面结构： 
    + 分为京东超市标题和京东超市内容 
    + 标题里面包含一个h4
    + 内容里面包含左右两个商品容器里面分别放置超链接和商品图片
    ```html
        <!-- 京东超市 -->
        <div class="product">
          <div class="product-title">
            <h4>京东超市</h4>
          </div>
          <div class="product-content clearfix">
            <div class="product-left">
              <a href="#" class="br">
                <img src="images/cp1.jpg" alt="">
              </a>
            </div>
            <div class="product-right">
              <a href="#" class="bb">
                <img src="images/cp2.jpg" alt="">
              </a>
              <a href="#">
                <img src="images/cp3.jpg" alt="">
              </a>
            </div>
          </div>
        </div>
    ```

2. 京东超市样式修改
    + 标题样式修改 调整 标题的行高 给h4添加一个伪元素定位在文字左边
    + 设置h4的字体大小和去掉加粗 同时相对定位
    + 内容样式的修改  分别设置 左边和右边盒子的宽度50% 浮动
    + 在设置盒子里面的超链接和图片宽度100%
    + 定义一些公共的边框类 上下左右 边框 分别在需要的标签上加
  ```css
    .product{
        margin-top: 10px;
        background-color: #fff;
        >.product-title{
            padding-left: 10px;
            line-height: 30px;
            border-bottom: 1px solid #ccc;
            >h4{
                position: relative;
                font-weight: normal;
                padding-left: 10px;
                font-size: 14px;
                &::before{
                    content: "";
                    height: 16px;
                    width: 4px;
                    background-color: #d8505c;
                    position: absolute;
                    left: 0;
                    top: 8px;
                }
            }
        }
        >.product-content{
            >.product-left{
                width: 50%;
                float: left;
                >a{
                    display: block;
                    >img{
                        width: 100%;
                    }
                }
            }
            >.product-right{
                width: 50%;
                float: right;
                >a{
                    display: block;
                    >img{
                        width: 100%;
                    }
                }
            }
        }
    }
    .bl{
        border-left: 1px solid #ccc;
    }
    .br{
        border-right: 1px solid #ccc;
    }
    .bt{
        border-top: 1px solid #ccc;
    }
    .bb{
        border-bottom: 1px solid #ccc;
    }
  ```


  ## 总结

    1. 原生移动web的开发方式： 样式和JS都是原生写的  使用流式布局(百分比)
    2. 移动端基础知识 
      1. 屏幕尺寸 指的是什么 屏幕对角线的长度
      2. 常见单位 相对单位 px em pt 绝对单位 in cm
      3. 像素密度： 1英寸里面能够放的像素的数量 像素密度越大屏幕越清晰 大于330px高清屏
      4. 设备独立像素 ： 1pt 在iphone3gs （屏幕分辨率和真实大小一样） 1pt=1px 1pt在iphone5下（屏幕分辨率是真实大小的2倍） 1pt=2px
      5. 物理像素(分辨率像素)和CSS像素(真实像素模拟看见的像素)
      6. 分辨率PC端1366*768 1366是宽度 768的高度 移动端1344*750 1344的高 750是宽
    3. 搭建JD项目 把项目依赖的文件夹拷贝过来 创建项目文件index.html base.less index.less
    4. 引入base.less index.less文件
    5. 写base.less样式初始化 样式重置 公共样式 移动端盒模型border-box 去掉移动端点击高亮-webkit-tap-highlight-color:transparent;
    6. 搭建京东主体布局容器
      div#layout  最大宽度640最小宽度300居中背景色
    7. 创建主页的空结构
    8. 制作顶部通栏 
      1.图标的使用（移动端有2倍的概念因为移动端分辨率是真实的2倍所以图片设计按照分辨率设计得比较大在移动端使用的时候要缩小一倍来页面展示） 设置background-size:200px 200px;背景定位也要缩小1倍
      2.左右两边固定宽度中间自适应的布局 ： 左右两边分别绝对定位在左右两边中间使用margin（不能加width:100%）或者padding 
    9. 轮播图的制作
      1.轮播图结构 8张图 页面需要10张  第一张是第8张图 最后是第一张图
      2.ul占整个轮播图的1000% li占ul的10%浮动  img占li100%
      3. 小圆点 定位居中在底部 （slide容器要有高度 清除或者overflow:hidden）
    10. 导航条的制作
     1. 百分比布局 ul>li25%浮动 设置文字图片居中
    11. 秒杀商品制作
      1. 秒杀商品标题 图标(设置宽度是自身一半) 文字调整大小颜色 倒计时设置背景色宽高行高和倒计时span一样15px
      2. 秒杀商品内容 ul>li 33.33% 浮动 >img w60% 居中 文字颜色 中划线
    12. 京东超市制作
      1. 京东超市标题 h4>伪元素设置背景宽高定位到左边
      2. 京东超市内容 分为左边和右边 左右两个各占50%浮动 图片w100%加边框 公共样式边框
