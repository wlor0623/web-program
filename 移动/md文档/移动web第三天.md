## 反馈 

1. 导航条下面的按钮不知道有什么用
2. 自己写代码的时候导航条轮播图不知道删除什么
3. 轮播图代码运行有问题 改动了
4. 项目带着些比较好
5. 好难，JS都还给老师了 
6. 学不下去
7. 字体图标和web字体有什么区别
8. file和服务器运行有什么区别
    file相当于是浏览器直接打开一个编译好的html文件(文件直接存储在客户端)
    localhost相当于是浏览器向这台服务器发送一个请求 服务器接收到请求后返回一个html页面(页面的内容是由服务器改变的)
    file里面不支持http请求(不支持请求文件 请求数据等) 静态页面
    localhost里面支持http请求(支持请求文件 请求数据) 动态页面
## 总结
1. 工具提示插件的使用
2. 新闻版块的布局
3. 合作伙伴版块布局
4. 登录模态框的使用
5. 表单的使用
6. bootstrap定制
7. 

## 1. 工具提示的使用

### 1.1 页面结构
```html
     <p class="tooltips">
          <a data-toggle="tooltip" data-placement="top" title="北京市">京</a>
          <a data-toggle="tooltip" data-placement="top" title="实名认证">实</a>
     </p>
```

### 1.2 样式
```css
    >.tooltips {
        width: 100%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 20px;
        text-align: center;
        >a {
            display: inline-block;
            width: 20px;
            height: 20px;
            text-decoration: none;
        }
        >a:first-of-type {
            color: #e92322;
            border: 1px solid #e92322;
        }
        >a:last-of-type {
            color: #0f0;
            border: 1px solid #0f0;
            margin-left: 5px;
        }
    }
```
### 1.3 JS初始化

```js
  // 初始化工具提示
  $('[data-toggle="tooltip"]').tooltip();
```

### 1.4 使用步骤和注意事项

- 注意在使用工具提示插件的时候要注意默认是没有提示效果的需要加上JS初始化工具提示
- 如果发现提示信息没有横向展示是父元素的宽度没有设置100% 因为提示信息是定位的参照父元素的宽度 需要父元素够宽


## 2 新闻版块

### 2.1 栅格系统的列偏移

```html
  <div class="col-md-2 col-md-offset-2">
      <h4>全部新闻</h4>
  </div>
```

### 2.2 tab栏的使用

#### 2.2.1页面结构

```html
    <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#news01" aria-controls="news01" role="tab" data-toggle="tab"><i class="icon-news01"></i></a></li>
        <li role="presentation"><a href="#profile" aria-controls="news02" role="tab" data-toggle="tab"><i class="icon-news02"></i></a></li>
        <li role="presentation"><a href="#news03" aria-controls="news03" role="tab" data-toggle="tab"><i class="icon-news03"></i></a></li>
        <li role="presentation"><a href="#news04" aria-controls="news04" role="tab" data-toggle="tab"><i class="icon-news04"></i></a></li>
    </ul>
```

#### 2.2.2 tab的样式调整

```css
   >.nav-tabs {
      border-bottom: 0;
      >li {
          margin-bottom: 20px;
          >a {
              width: 60px;
              height: 60px;
              border-radius: 50%;
              text-align: center;
              border: 0;
              color: #ccc;
              &:hover {
                  background-color: #e92322;
              }
              >i {
                  font-size: 30px;
              }
          }
          &.active {
              >a {
                  background-color: #e92322;
              }
          }
      }
  }
```

#### 2.2.3 淡入淡出效果的添加

- 在active的元素上添加 fade in 非active的元素加上fade

```html
   <div role="tabpanel" class="tab-pane active fade in" id="news01">
   </div>
   <div role="tabpanel" class="tab-pane fade" id="news02">...</div>
```

## 3. 合作伙伴

### 3.1 页面结构

```
    <section id="partner">
        <div class="container">
            <h3>合作伙伴</h3>
            <ul>
                <li><a href="#"><i class="icon-partner1"></i></a></li>
                <li><a href="#"><i class="icon-partner2"></i></a></li>
                <li><a href="#"><i class="icon-partner3"></i></a></li>
                <li><a href="#"><i class="icon-partner4"></i></a></li>
                <li><a href="#"><i class="icon-partner5"></i></a></li>
                <li><a href="#"><i class="icon-partner6"></i></a></li>
                <li><a href="#"><i class="icon-partner7"></i></a></li>
                <li><a href="#"><i class="icon-partner8"></i></a></li>
                <li><a href="#"><i class="icon-partner9"></i></a></li>
            </ul>
        </div>
    </section>
```

### 3.2 页面样式

```css
  #partner{
      padding: 40px 0;
      >.container{
          >h3{
              text-align: center;
          }
          >ul{
              >li{
                  width:calc(100%/9);
                  float: left;
                  list-style: none;
                  >a{
                      color:#333;
                      text-decoration: none;
                      &:hover{
                          color:#e92322;
                      }
                      >i{
                          font-size: 50px;
                      }
                  }
              }
          }
      }
  }
```

### 3.3 calc函数的使用

- 可以通过calc函数动态设置百分比的宽度

```
     width:calc(100%/9);
```


## 4. 登录模态框

### 4.1 模态框的结构

```
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>

```

### 4.2 在登录按钮上调用模态框

```html
   <a href="" class="btn btn-link" data-toggle="modal" data-target="#myModal">登录</a>
```


## 5. 表单的使用 全局CSS>表单

### 5.1 表单结构

```html
    <form class="form-horizontal">
        <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
            <div class="col-sm-10">
                <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
            </div>
        </div>
        <div class="form-group">
            <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
            <div class="col-sm-10">
                <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <div class="checkbox">
                    <label>
                        <input type="checkbox"> Remember me
                    </label>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="btn btn-default">Sign in</button>
            </div>
        </div>
    </form>
```

## 6. bootstrap的定制

1. 官网右上角有一个定制按钮
2. 修改里面的一些默认值 栅格系统的列数可以改成15
3. 点击下面的编译并下载 (定制好的bootstrap)



## 总结

1. 移动web的概念： 在移动端浏览器访问的网页
2. 移动端的开发方式：
    1. 响应式开发方式： 一个页面兼容多个终端 兼容好 代码冗余加载慢 开发维护快
    2. 原生移动web开发方式： 针对每个端都写一套页面 代码加载速度快 开发维护慢
3. 响应式开发原理： CSS3媒体查询
    @media (){

    }
    min-width:屏幕宽度大于等于值的时候生效  从小到大写
    max-width：屏幕宽度小于等于值的时候生效 从大到小写
    向上兼容： 只写了小的判断 没有写大的 min-width:768 在1300也能生效
    向下覆盖：同时写了小的和大的 大的判断的样式会把小的覆盖
4. 响应式开发框架bootstrap
  1. 下载
  2. 引入
    引入css
    引入jquery
    引入bootstrap.js
5. 框架里面的内容 全局CSS样式
    1. container版心容器 固定宽度且居中一个100%的
    2. 栅格系统 分为行和列 一行默认是12列 有4个档次 col-lg col-md col-sm col-xs
    3. 响应式工具 hidden-档次
    4. 按钮 
    5. bootstrap官方的字体图标（组件）
6. 搭建微金所项目 制作顶部通栏结构

7. 自定义的字体图标
    1. 有图标文件
    2. 去icomoon.io网站去生成字体文件
    3. 使用生成好的样式和字体文件
    4. 使用样式里面图标对应的类名
8. less预处理器
    1. 变量  @变量名:变量值
    2. 嵌套  跟标签结构一样写CSS选择器结构  &表示当前的元素
    3. 混合  定义函数 如果有参数 (形参:默认值)
    4. 注释 // 会被删除 /**/不会被删除
    5. 引入 @import "demo.less";
9. less编译
    1. 页面里面引入less文件 rel="stylesheet/less"
    2. 引入less的编译器文件 less.js
    3. 使用服务器访问页面
10. 使用less实现顶部通栏的样式
11. 导航条插件的使用
    组件 》 导航条
    导航条有一个移动端的显示按钮
    把默认的导航条删除了下拉菜单 表单
    添加了多个导航项
    把品牌文字换成图标
    设置高度给子元素设置和行高50px

12. 轮播图插件的使用
    1. JS插件》轮播图 .carousel
    2. pc端轮播图 使用背景图实现 设置高度和背景居中
    3. 移动端轮播图 使用img标签实现
    4. 使用JS响应式轮播图 通过获取屏幕宽度判断是PC还是移动分别插入对应的pcImg 和mobileImg 图片路径存储到item的自定义属性里面 data-large-image data-small-image
13. 特色介绍
    1. 栅格系统
    2. 媒体对象 组件》媒体对象
14. 立即预约
    1. 快速浮动 》 全局CSS样式 》 辅助类 》 快速浮动
    2. 情景文本颜色 》 全局CSS样式 》 辅助类 》 情景文本颜色
15. 产品区域
    1. 标签页的使用 JS插件 》 标签页
    2. 左边自适应右边固定宽度布局  右边定位到右边 左边加margin-right 或者给父元素加上pading-right
    3. 工具提示插件 JS插件 》 工具提示 使用JS手动初始化
16. 新闻区域
    1. 栅格系统的列偏移 col-md-offset-2
    2. 标签页
17. 登录
    1. 模态框 》 JS插件 》 模态框
    2. 表单 》 全局CSS样式 》 表单
18. 导航条吸顶 
    1. affix JS插件 》 affix
19. 移动端添加滚动条
    1. 有一个父容器 overflow-x:auto;
    2. 有一个子元素 宽度超过父元素
20. 定制 
    1. 官网 》 定制按钮 可以定制自动的bootstrap 比如栅格改成15列