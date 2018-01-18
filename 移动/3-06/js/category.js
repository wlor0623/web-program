/*
 * @Author: xyl
 * @Date:   2017-11-03 14:31:39
 * @Last Modified by:   xyl
 * @Last Modified time: 2017-11-03 19:37:26
 */

window.addEventListener('load', function() {
    // 调用左侧 效果
    slideLeft();
});
// 左侧滑动效果
function slideLeft() {
    // 1. 获取要滑动的ul
    var slideUl = document.querySelector('.category-left ul');
    // 2. 定义滑动开始的Y 滑动中的Y 滑动距离Y  当前已经滑动到的Y
    var startY = moveY = distanceY = currentY = 0;
    // 3. 添加滑动开始事件
    slideUl.addEventListener('touchstart', function(e) {
        // 4.距离开始 Y位置
        startY = e.touches[0].clientY;
    });
    // 5. 添加滑动中事件
    slideUl.addEventListener('touchmove', function(e) {
        // 6. 距离滑动中的Y位置
        moveY = e.touches[0].clientY;
        // 7. 求滑动的距离 moveY-startY
        distanceY = moveY - startY;
        // 12. 判断要设置滑动的值 是否在最大和最小的范围区间 小于最大的值 大于最小的值 才允许设置滑动
        if ((currentY + distanceY) < maxSlide && (currentY + distanceY) > minSlide) {
            // 8. 给左侧要滑动的ul设置位移
            slideUl.style.transform = 'translateY(' + (currentY + distanceY) + 'px)';
            slideUl.style.transition = 'none';
        }

    });
    // 9. 添加滑动结束事件 
    slideUl.addEventListener('touchend', function() {
        //10. 记录每次的滑动距离
        currentY += distanceY;
        //13.判断当前滑动的值 是否大于最大定位值
        if (currentY > maxPostion) {
            // 如果大于最大定位值 滑动到最大的定位值
            slideUl.style.transform = 'translateY(' + maxPostion + 'px)';
            slideUl.style.transition = 'all 0.2s';
            //当改变位置的时候currentY也要更新
            currentY = maxPostion;
        }
        //14.判断当前滑动的值 是否小于最小定位值
        if (currentY < minPosition) {
            // 如果小于最小定位值 滑动到最小的定位值      
            slideUl.style.transform = 'translateY(' + minPosition + 'px)';
            slideUl.style.transition = 'all 0.2s';
            currentY = minPosition;
        }
    });
    // 11. 定义一些滑动的限制 限制如果往下滑最多滑动到200px的位置 
    // 滑动范围是在滑动的时候判断用
    // 最大允许滑动的值
    var maxSlide = 200;
    // 最小允许滑动的值 -(ul的高-div的高+200)
    // ul的高
    var slideUlHeight = slideUl.offsetHeight;
    // ul父元素div的高
    var categoryLeftHeight = document.querySelector('.category-left').offsetHeight;
    //最小允许滑动的值
    var minSlide = -(slideUlHeight - categoryLeftHeight + 200);
    // 13. 当松开手之后 如果当前位移的值超过了 最大允许定位的值 和 最小允许定位的值的时候 
    //          要回到最大定位或者最小定位值
    // 定位的值是在送开手的时候判断用
    // 最大的定位值 div和ul的 顶部粘在一起的时候
    var maxPostion = 0;
    //最小的定位值 div和ul 底部黏在一起的时候
    var minPosition = -(slideUlHeight - categoryLeftHeight);

    // 15. 实现点击的时候让当前点击的li移动到顶部
    // 16. 获取所有li元素
    var lis = document.querySelectorAll('.category-left ul li');
    // 17. 给父元素添加点击事件 在父元素点击事件里面是可以获取到真正点击的子元素        
    // 绑定了fastclick之后直接添加click事件就可以
    slideUl.addEventListener('click', function(e) {
        // 18.清空所有Li的active类名
        for (var i = 0; i < lis.length; i++) {
            lis[i].classList.remove('active');
            // 给所有li添加一个索引号
            lis[i].index = i;
        }
        //19.给当前的点击的li添加active类名 e.target获取的是a
        var li = e.target.parentNode;
        li.classList.add('active');
        var slideHeight = -li.index * li.offsetHeight;
        // 20.判断当前位移的时候是否超过最小定位值
        if (slideHeight < minPosition) {
            // 就位移到最小的定位值-700
            currentY = minPosition;
        } else {
            //如果没超过就按照计算的值位移
            currentY = slideHeight
        }
        //21.设置位移
        slideUl.style.transform = 'translateY(' + currentY + 'px)';
        slideUl.style.transition = 'all 0.2s';
    });
    //自己封装tap事件
    // tap(slideUl, setClick)
    // $(slideUl).on('tap',setClick);    
    function setClick(e) {
        // 18.清空所有Li的active类名
        for (var i = 0; i < lis.length; i++) {
            lis[i].classList.remove('active');
            // 给所有li添加一个索引号
            lis[i].index = i;
        }
        //19.给当前的点击的li添加active类名 e.target获取的是a
        var li = e.target.parentNode;
        li.classList.add('active');
        var slideHeight = -li.index * li.offsetHeight;
        // 20.判断当前位移的时候是否超过最小定位值
        if (slideHeight < minPosition) {
            // 就位移到最小的定位值-700
            currentY = minPosition;
        } else {
            //如果没超过就按照计算的值位移
            currentY = slideHeight
        }
        //21.设置位移
        slideUl.style.transform = 'translateY(' + currentY + 'px)';
        slideUl.style.transition = 'all 0.2s';

    }

    function tap(dom, callback) {
        var isMove = false;
        dom.addEventListener('touchstart', function() {});
        dom.addEventListener('touchmove', function() {
            // console.log('touchmove');
            isMove = true;
        });
        dom.addEventListener('touchend', function(e) {
            if (isMove == false) {
                //没有触发move就是单击事件
                // 执行单击事件需要执行的代码
                //把当前touchend事件的事件源参数传给回调函数
                callback(e);
            }
            isMove = false;
        });
    }
}

function slideRight() {

}
