/*
 * @Author: xyl
 * @Date:   2017-10-30 10:19:15
 * @Last Modified by:   xyl
 * @Last Modified time: 2017-10-30 15:47:32
 */
$(function() {
    // 初始化工具提示插件
    $('[data-toggle="tooltip"]').tooltip()
    $(window).on('resize', function() {
        //如果把图片路径放到JS数组 维护起来也不太方便
        // var largeImg = ['img/slide_01_2000x410.jpg','img/slide_02_2000x410.jpg']
        // 1. 获取屏幕宽度 判断 是大屏还是小屏 以640px条件
        var windowWidth = $(window).width();
        if (windowWidth > 640) {
            //大屏
            var items = $('.carousel-inner .item');
            items.each(function(index, value) {
                //attr方法需要写全名 包含data-
                // var imgSrc = $(value).attr('data-large-image','要设置的值');
                // data函数专门用来获取自定义属性属性名不能写data-
                // data方法是只能获取不能设置值 要设置值只能用attr
                var imgSrc = $(value).data('large-image');
                $(value).html('<a href="#" class="pcImg" style="background-image:url(' + imgSrc + ')"></a>');
            });
        } else {
            //小屏
            var items = $('.carousel-inner .item');
            items.each(function(index, value) {
                var imgSrc = $(value).data('small-image');
                $(value).html('<a href="#" class="mobileImg"> <img src="' + imgSrc + '" alt=""></a>');
            });
        }
    }).trigger('resize');
});
