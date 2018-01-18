var categoryEffect = {};

categoryEffect.prototype = {
    searchEffect: function() {
        /**
         * 需求： 当滚动条滚动的距离在轮播图高度的范围内 搜索框的透明度渐变
         *  （滚动条滚动的距离/轮播图的高度） 如果超过了轮播高度的范围固定透明度1
         */
        /**
         * 实现思路：
         *  1. 添加滚动条滚动的事件scroll
         *  2. 在事件里获取滚动条滚动的距离
         *  3. 获取轮播图的高度
         *  4. 判断距离是否小于轮播高度  如果小于就计算透明度设置
         *      如果大于就固定设置1
         */
        // 1. 添加滚动条滚动的事件scroll
        window.addEventListener('scroll', function() {
            // 2. 在事件里获取滚动条滚动的距离
            var scrollTop = document.documentElement.scrollTop;
            // var scrollTop = document.body.scrollTop;  
            // 3. 获取轮播图的高度      
            var slideHeight = document.querySelector('#slide').offsetHeight;
            // 4. 判断距离是否小于轮播高度  
            if (scrollTop < slideHeight) {
                // 如果小于就计算透明度设置
                var opacity = scrollTop / slideHeight;
                document.querySelector('#topbar').style.backgroundColor = 'rgba(255,0,0,' + opacity + ')';
            } else {
                document.querySelector('#topbar').style.backgroundColor = 'rgba(255,0,0,1)';
            }
        });
    },
    countDownEffect: function() {
        /**
         * 需求： 有一个总时间（秒数） 每秒总时间-- 
         *  把减完之后的总时间分别计算时分秒设置到页面的倒计时标签上
         * 实现思路：
         *  1. 定义一个总时间(秒数)
         *  2. 要定一个定时器  1000毫秒
         *  3. 在定时器里面让总时间--
         *  4. 分别求减完后的总时间的时分秒
         *      3600  / 3600 == 1  7200 / 3600 == 2 因为一个小时等于3600秒
         *      时 =  总时间 / 3600
         *      3700把小时部分去掉之后 再求剩下的分钟  总时间%3600/60 
         *      分 = 总时间 % 3600 / 60
         *      100 % 60 只要除以除不尽的部分（余数部分）都是秒数
         *      秒 = 总是 % 60
         *  5. 把时分秒的个位(时/10)和十位(时%10)分别放到页面的span上
         */
        // 总时间的= 未来的时间-当前的时间 的秒数
        // new Date("month dd,yyyy hh:mm:ss"); 
        // 1509595200 是 1970 1.1.0:0:0 至12点的秒数  getTime()获取的是毫秒数
        // var futureTime = new Date('Nov 02,2017 12:00:00').getTime()/1000;
        // 注意如果用数字表示月 数字的从0开始 0-11
        var futureTime = new Date(2017, 10, 2, 12, 0, 0).getTime() / 1000;
        console.log('futureTime' + futureTime);
        //当前时间
        var nowTime = new Date().getTime() / 1000;
        console.log('nowTime' + nowTime);
        // console.log(futureTime - nowTime);
        // 1. 定义一个总时间(秒数)
        var time = Math.floor(futureTime - nowTime);
        // var time = 3600;
        // 5. 把时分秒的个位(时/10)和十位(时%10)分别放到页面的span上
        var spans = document.querySelectorAll('.seckill-count-down span');
        // 2. 要定一个定时器  1000毫秒
        var timeId = setInterval(function() {
            // 3. 在定时器里面让总时间--
            time--;
            if (time <= 0) {
                time = 0;
                // 当倒计时到了的时候清除时钟
                clearInterval(timeId);
            }
            // 4. 分别求减完后的总时间的时分秒
            // 时 =  总时间 / 3600 
            var hour = time / 3600;
            // 分 = 总时间 % 3600 / 60
            var minute = time % 3600 / 60;
            // 秒 = 总是 % 60
            var second = time % 60;
            // 向下取整
            spans[0].innerHTML = Math.floor(hour / 10);
            spans[1].innerHTML = Math.floor(hour % 10);
            spans[3].innerHTML = Math.floor(minute / 10);
            spans[4].innerHTML = Math.floor(minute % 10);
            spans[6].innerHTML = Math.floor(second / 10);
            spans[7].innerHTML = Math.floor(second % 10);
        }, 1000);
    },
    slideEffect: function() {
        /**
         * 需求： 
         *     1. 实现自动无缝轮播图
         *     2. 轮播图的小圆点跟着轮播图的切换而切换
         *     3. 轮播图支持滑动能够预览上一张或者下一张图
         *     4. 当滑动松开手的时候切换图片 或者回弹
         * 实现思路：
         *     1. 定义一个图片的索引
         *     2. 定义一个定时器（每隔多少毫秒切换一张图）
         *     3. 在定时器里面索引要++
         *     4. 计算当前索引的图片需要位移的距离设置到轮播图ul上
         *     5. 给当前轮播图ul添加过渡效果 要慢慢的切换
         *     6. 给slideUl添加一个过渡完成的事件 等第8张切换到第一张图过渡完成后（图片切换完成了）
         *     7. index==9的时候就是第8张到第一张图切换完毕了的时候
         *     8. index=1 设置位移迅速到1的位置（清除过渡效果）
         *     9. 获取所有小圆点的li
         *     10. 等轮播图切换完成后 清空所有li的active 再给当前的li[index-1]添加active
         */
        // 1. 定义一个图片的索引 因为默认轮播图的ul就有一张图的偏移 当前索引是1
        var index = 1;
        // 2. 定义一个定时器（每隔多少毫秒切换一张图）
        //轮播图的ul元素
        var slideUl = document.querySelector('#slide ul:first-of-type');
        // 是一张图的宽度
        var slideWidth = document.querySelector('#slide').offsetWidth;
        //获取所有小圆点Li
        var lis = document.querySelectorAll('#slide ul:last-of-type li');
        var timeId = null;
        // 是否允许滑动
        var flag = true;

        function startTime() {
            timeId = setInterval(function() {
                // 3. 在定时器里面索引要++
                index++;
                // 判断当切换到第10图（索引是9）的时候 跳回到第一张的位置
                //判断不能直接写要等到第8张到第一张图的切换完成之后才能判断调回去 等过渡完成了才能切换
                // 4. 计算当前索引的图片需要位移的距离设置到轮播图ul上
                slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
                // "字符串"+变量+"字符串"
                // '字符串'+变量+'字符串'
                //5 给当前轮播图ul添加过渡效果 要慢慢的切换
                // 过渡的1s其实需要1s加个几十毫秒他是会比时钟慢一点点 过渡时间不能和定时器一模一样
                slideUl.style.transition = 'all 0.2s';
                flag = false;
            }, 1000);
        }
        startTime();
        // 6. 给slideUl添加一个过渡完成的事件 等第8张切换到第一张图过渡完成后（图片切换完成了）
        // 过渡完成事件有点bug如果切换到别的页面过渡不会执行 事件也不会执行 判断要写的严谨一些
        slideUl.addEventListener('transitionend', function() {
            //过渡完成后就可以滑动
            flag = true;
            console.log(index);
            //7. index==9的时候就是第8张到第一张图切换完毕了的时候 尽量写大于等于9
            if (index >= 9) {
                // 第一张图是页面的第二个标签 索引是1
                //8. 设置索引回1 设置位移和清除过渡
                index = 1;
                slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
                // 清除过渡 因为是要迅速跳到第一张图的位置
                slideUl.style.transition = 'none';
            }
            //判断当从第一张往左滑动到第8张滑动完毕后（过渡完成后）
            if (index <= 0) {
                // index回调第8张图的真实位置
                index = 8;
                //设置位移到第8张图的位置
                slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
                // 清除过渡 因为是要迅速跳到第8张图的位置
                slideUl.style.transition = 'none';
            }
            //9. 遍历删除所有小圆点的active
            for (var i = 0; i < lis.length; i++) {
                // classList类名操作 添加删除查询 替换
                lis[i].classList.remove('active')
            }
            //10. 给当前index对应(图片是1开始小圆点是0开始要减一)的小圆点添加active 
            lis[index - 1].classList.add('active');
        });
        // 开始的X 滑动中的X 滑动的距离X
        var startX = moveX = distanceX = 0;
        slideUl.addEventListener('touchstart', function(e) {

            startX = e.touches[0].clientX;
            //清除定时器 滑动的时候不需要自动轮播
            clearInterval(timeId);
        });
        slideUl.addEventListener('touchmove', function(e) {
            //判断如果flag == true允许滑动的时候才执行获取滑动中的位置计算设置距离的代码
            if (flag == true) {
                // console.log('touchmove'+distanceX);
                moveX = e.touches[0].clientX;
                distanceX = moveX - startX;
                //设置位移的时候要加上轮播图本来就已经位移的值比如轮播已经位移到-1000px+10 -990px
                slideUl.style.transform = 'translateX(' + (-index * slideWidth + distanceX) + 'px)';
                //滑动的时候已经很慢了不需要过渡 清除过渡
                slideUl.style.transition = 'none';
            }
        });

        slideUl.addEventListener('touchend', function() {
            // 判断flag==true才能切换图片
            console.log('touchend' + distanceX);
            /*判断滑动的距离(取绝对值因为距离有可能是负值)是否超过了一张图的1/3 */
            if (Math.abs(distanceX) > (slideWidth / 3)) {
                //如果超过1/3就翻页
                // 判断滑动的距离是正还是负值
                if (distanceX > 0) {
                    //正值 表示从左往右滑 切换到上一张
                    index--;
                    // 设置位移和过渡让当前轮播图位移到上一张的位置
                    slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
                    slideUl.style.transition = 'all 0.2s';
                    flag = false;
                } else {
                    //负值 表示从右往左滑 切换到下一张
                    index++;
                    // 设置位移和过渡让当前轮播图位移到下一张的位置
                    slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
                    slideUl.style.transition = 'all 0.2s';
                    flag = false;
                }
            } else {
                // 不超过1 / 3 就回弹
                // 设置位移和过渡让当前轮播图的原来位置
                slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
                slideUl.style.transition = 'all 0.2s';
                flag = false;
            }
            //滑动开始清除了时钟 滑动结束重新添加回时钟
            startTime();
            //当上一次滑动结束后把上一次的距离清空 每次滑动结束他的滑动距离也没用了所以要清空
            startX = moveX = distanceX = 0;
        });

        /*添加节流阀： 限制当过渡还没完成的时候是不允许滑动的
            1. 定义一个变量 flag = true (默认是可以滑动的)
            2. 如果添加了过渡效果 就把flag = false;
            3. 判断 如果flag == true才能执行滑动的操作
            4. 过渡完成事件触发后（过渡完成） flag = true*/
    }
}
