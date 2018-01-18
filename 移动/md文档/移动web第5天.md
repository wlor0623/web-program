## 反馈

1. less只能写直接子代 能跳级写吗
2. 都是学过的内容 但是自己做的时候不连贯
3. 轮播图放10张还不是很理解
4. 刚学的布局和以前的布局方法以后哪个会用的多些啊？
5. 对于clearfix清楚浮动不太清楚。
6. 找不到定位fixed

## 总结

1. 顶部搜索框渐变JS
2. 秒杀商品倒计时JS
3. 轮播图无缝轮播
4. 轮播图左右滑动
5. zepto的基本了解
6. zepto的基本使用
7. 使用zepto完成轮播图
8. zepto的定制

## 1. 顶部搜索框渐变

### 1.1 需求： 
    1. 实现顶部搜索框的背景色渐变 (当滚动条滚动的距离在轮播以内的时候会从透明度从0-1) 
     当超过了滚动的距离超过了轮播图的区域就固定一个透明度
### 1.2 实现思路 ：
    1. 添加一个滚动条的滚动事件 不断获取滚动条的距离
    2. 获取轮播图的高度 和 滚动条距离对比
    3. 如果滚动条距离小于轮播图的高度 设置头部的透明度为0-1(最大透明度* 滚动条距离/轮播图的高度) 
    4. 如果滚动条距离大于轮播图的高度 设置一个最大的透明度
### 1.3 JS代码
    ```js
      //1. 添加一个滚动条的滚动事件
      window.addEventListener('scroll', function() {
          //2.获取滚动条的距离
          var scrollTop = document.body.scrollTop;
          //3.获取轮播图容器的高度
          var slideHeight = document.querySelector('#slide').offsetHeight;
          if (scrollTop > slideHeight) {
              document.querySelector('#header').style.backgroundColor = "rgba(201,21,35,1)";
          } else {
              var opcity = scrollTop / slideHeight * 1;
              document.querySelector('#header').style.backgroundColor = "rgba(201,21,35," + opcity + ")";
          }
      });
    ```

## 2. 秒杀商品倒计时

### 2.1 需求：
    1. 实现秒杀倒计时 用总时间 每秒减1秒总时间 减完之后 
      分别求出时分秒 并且分别求出十位个位设置到对应的span
### 2.2 实现思路： 
     1. 定义一个总时间(秒数)
     2. 设置一个定时器每秒执行一次 在定时器里面执行 总时间--
     3. 分别求出时分秒
      时:  10800 / 3600 == 3  总时间 / 3600 == 时
      分: 7300 % 3600 == 100    3800 % 3600 == 200 / 60 总时间 % 3600 / 60 == 分
      秒: 100 % 60 == 40  3640 % 60  == 40  总时间 % 60
      十位: 21 / 10 == 2 十位
      个位: 21 % 10 == 1 个位
      4. 获取所有span分别设置到时分秒对应的区域
      5. 获取当前 时间  和 获取未来时间 (今天中午12点)  用未来时间 - 当前时间
### 2.3 JS代码
    ```js
      // 获取今天中午12点的 毫秒数
      var futureTime = new Date("May 8,2017 12:00:00").getTime();
      var nowTime = new Date().getTime();
      // 未来时间 - 当前时间的秒数 因为他们都是毫秒 所以 / 1000
      var time = (futureTime - nowTime) / 1000;
      //总时间
      // var time = 5 * 60 * 60;
      //设置定时器 每秒执行一次
      setInterval(function() {
          time--;
          var shi = Math.floor(time / 3600);
          var fen = Math.floor(time % 3600 / 60);
          var miao = Math.floor(time % 60);
          var downTimes = document.querySelectorAll('.seckill-downtime > span');
          downTimes[0].innerHTML = Math.floor(shi / 10);
          downTimes[1].innerHTML = Math.floor(shi % 10);
          downTimes[3].innerHTML = Math.floor(fen / 10);
          downTimes[4].innerHTML = Math.floor(fen % 10);
          downTimes[6].innerHTML = Math.floor(miao / 10);
          downTimes[7].innerHTML = Math.floor(miao % 10);
      }, 1000);
    ```


## 3. 轮播图

### 3.1 需求：
    1. 实现轮播图无缝自动轮播
    2. 实现轮播图的左右滑动和预览图片
    3. 实现轮播滑动结束后判断切换到上一张和下一张和回弹
    4. 实现轮播图切换后小圆点也跟着变动
### 3.2 实现自动无缝轮播
    1. 定义一个轮播的索引index=1
    2. 定义一个定时器每2秒走一次 每次index++
    3. 设置轮播图容器的偏移index*slideWidth 同时添加过渡
    4. 添加一个过渡完成事件判断当轮播图从第8张到第一张走完的时候切换到第一张的真实位置
    5. 同时清除过渡 设置位移到第一张的真实位置
      
### 3.3 实现轮播图滑动

####  3.3.1移动端的touch事件

1. touchstart 触摸开始触发
2. touchmove 触摸中会触发 持续触发
3. touchend 触摸结束触发
4. touchcancel 触摸中断会触发(了解)
5. 注意这3个事件只能用addEventListener这个方法添加事件

#### 3.3.2 touch对象

1. touchs 屏幕上的手指对象
2. targetTouches 元素上的手指对象
3. changedTouches 改变后的手指对象
4. 用法 touches 和 targetTouches用法一样 在touchstart 和 touchmouve 用来获取手指对象  在touchend事件里面不能用前两个因为手指都已经离开屏幕 屏幕和元素上就不存在手指对象   changedTouches通常是用在touchend事件

#### 3.3.3 touch对象里面的属性

1. clientX clientY 获取手指距离视口左上角的位置
2. pageX pageY 获取手指距离页面左上角的位置(包含滚动条的)
3. screenX screenY 获取手指距离屏幕最上角的位置
4. 通常在移动端没有滚动条 所以 clientX 和 pageX 和 screenX 通常使用  client系列


#### 3.3.4 实现滑动拖拽元素

1. 注册滑动事件 滑动开始滑动中
2. 分别创建滑动开始的位置和滑动中的位置滑动距离的变量
3. 在开始的时候距离滑动开始是xy位置
4. 在滑动中的时候记录滑动中的xy位置
5. 用滑动中的xy的位置-滑动开始的xy的位置求到滑动的距离
6. 把滑动的距离设置到元素的位移上translate(x,y)
7. 如果要实现连续滑动要在滑动结束的时候每次记录最后结束的位置 下一次滑动加上这个位置

#### 3.3.5 事件源对象e.target

1. 作用就是用来获取当前触发这个事件的元素 这样可以给body或者document注册事件来获取里面真正触发事件的元素


#### 3.3.6 实现轮播图的滑动操作

1. 给轮播图容器添加滑动开始和滑动中事件
2. 在滑动开始的事件里面记录滑动开始手指的位置
3. 在滑动中的时候记录滑动中手指的位置
4. 用滑动中手指的位置-滑动开始手指的位置 求得滑动的距离
5. 将滑动距离作为偏移加上轮播图已经到达的位置 设置到轮播图容器上 同时清除过渡

#### 3.3.7 实现滑动结束后的判断翻页还是回弹

1. 给轮播图容器添加滑动结束事件
2. 判断distanceX的值有没有超过一张图的1/3
3. 如果超过1/3再判断distanceX的值是正值还是负值
4. 如果是正值 则表示从左往右滑 切换到上一张 index-- 设置位移设置过渡
5. 如果是负值 则表示从右往左滑 切换到下一张 index++ 设置位移设置过渡
6. 如果distanceX的值不超过一张图的1/3则回弹 index没有变化直接设置位移设置过渡
7. 当轮播图从第1张往左滑动到第8张滑动完的时候要切换到第8张的真实位置
8. 在过渡完成事件里面判断index<=0的时候index=8 清除过渡设置位移
9. 同时在滑动结束后再次重新添加定时器

### 3.4 轮播图JS代码

 ```js
        //定义一个index表示当前轮播图的索引从1开始因为轮播图默认有1张图偏移
        var index = 1;
        var slide = document.querySelector('#slide');
        var slideWidth = slide.offsetWidth;
        var slideUl = slide.querySelector('ul:first-of-type');
        var timer;
        function startTimer() {
          timer = setInterval(function() {
              //index每次++切换到下一张
              index++;
              //添加过渡
              slideUl.style.transition = "all 0.2s";
              //设置位移 记得带px单位
              slideUl.style.transform = "translateX(-" + index * slideWidth + "px)";
          }, 1000);
        }
        startTimer();
        //添加一个过渡完成事件
        slideUl.addEventListener('transitionend', function() {
            if (index >= 9) {
                index = 1;
                slideUl.style.transition = "none";
                slideUl.style.transform = "translateX(-" + index * slideWidth + "px)";
            }else if(index <= 0){
                index = 8;
                slideUl.style.transition = "none";
                slideUl.style.transform = "translateX(-" + index * slideWidth + "px)";
            }
        });
        var startX, moveX, distanceX;
        //添加滑动开始事件
        slideUl.addEventListener('touchstart', function(e) {
            //获取滑动开始的位置
            startX = e.touches[0].clientX;
            //在滑动开始的时候清除定时器 不让再自动轮播
            clearInterval(timer);
        });
        //添加滑动中事件
        slideUl.addEventListener('touchmove', function(e) {
            moveX = e.touches[0].clientX;
            //计算滑动的距离
            distanceX = moveX - startX;
            //设置滑动距离+当前轮播图的位置偏移 注意用()包起来先计算不然容易拼成字符串
            slideUl.style.transform = "translateX(" + (-index * slideWidth + distanceX) + "px)";
            //滑动中的时候距离很小所以不再需要过渡 清除过渡
            slideUl.style.transition = "none";
        });
        //添加滑动结束事件
        slideUl.addEventListener('touchend', function() {
            //判断滑动的距离有没有超过一张图的1/3因为滑动的距离可能是负值 所以取绝对值判断
            if (Math.abs(distanceX) > (slideWidth * 1 / 3)) {
                //如果滑动距离大于0表示从左往右滑切换到上一张index--
                if (distanceX > 0) {                
                    index--;
                    slideUl.style.transition = "all 0.2s";
                    slideUl.style.transform = "translateX(-" + index * slideWidth + "px)";
                } else if (distanceX < 0) {//如果滑动距离小于0表示从右往左滑切换到下一张index++
                    index++;
                    slideUl.style.transition = "all 0.2s";
                    slideUl.style.transform = "translateX(-" + index * slideWidth + "px)";
                }
            } else {
                slideUl.style.transition = "all 0.2s";
                slideUl.style.transform = "translateX(-" + index * slideWidth + "px)";
            }
            //滑动结束后重新开始定时器
            startTimer();
        });

      ```

## 4. zepto的基本介绍

1. 是一个移动端的JS框架 类似于jquery 使用的方式和jquery几乎一模一样
2. 特点就是轻量级 分模块

## 5. zepto的基本使用

1. 引包 
      1. 注意 zepto是分模块的 主模块里面只包含了5个基本的包
      2. 例如要使用一些高级的jquery的选择器 selector.js
      3. 要使用动画 fx.js
      4. 要使用touch相关事件 touch.js


## 6. 使用zepto实现轮播图

1. 定义index=1索引 添加定时器  index++
2. 执行轮播轮播操作 animate函数
    slideUl.animate({
      要执行动画的属性:值
    },动画的执行时间,动画执行的速度,动画执行完毕的回调函数(类似于过渡完成事件)) 
    在动画完成事件里面进行判断index>=9 index=1 设置样式    slideUl.css('transform','translateX('+(-index*slideWidth)+'px)'); 判断index<=0 index=8 设置样式    slideUl.css('transform','translateX('+(-index*slideWidth)+'px)');


3. 实现轮播图的滑动
      1. zepto自带了滑动的事件 swipeLeft （从右往左滑动） swipeRight (从左往右滑)
      2. swipeLeft  切换到下一张 index++ 调用动画
      3. swipeRight  切换到上一张 index-- 调用动画
4. 实现小圆点的切换
      1. 在动画完成事件里面 indicators.removeClass("active").eq(index-1).addClass("active"); 移除所有active 给index-1添加active


## 7. zepto的定制

1. 可以把一些依赖的包放到一个文件里面
2. 安装nodejs
3. 安装依赖包 npm install
4. 编辑make文件 的41 行 modules = (env['MODULES'] || 'zepto event ajax form ie fx selector touch').split(' ')
5. 运行编译的命令 npm run-script dist