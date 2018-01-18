

var express = require('express');

var app = express();

/**1.中间件的本质就是一个函数 function(req,res,next)
 * req:请求对象
 * res：响应对象
 * next：下一个中间件
 * 
 */

 /**2.中间件的匹配规则
 * （1）在中间件函数中从栈堆从上往下开始匹配
 * （2）如果一个中间件不满足匹配条件
 *          * 如果调用了next（）方法，则继续匹配
 *          * 如果没有调用next（）方法则停止匹配
 * （3）如果满足匹配条件，则执行该中间件函数代码
 *           * 如果调用了next（）方法，则继续匹配
 *          * 如果没有调用next（）方法则停止匹配
 * （4）按照上面的规则会一直匹配到express中间件的底部
 *  * 默认express有一个兜底的中间件，也就是那个打印`Can Not Get /`
 *      * 如果没有在某一个中间件环节结束匹配（不调用next（）方法），express会一直匹配到最底部
 *  
 * res：响应对象
 * next：下一个中间件
 * 
 */

 /**3.通常我们在中间件中做什么事情呢？
  * 1.给req添加属性或者方法
    * 只要在某一个中间件中添加了属性或者方法，后面所有的中间件都可以获取对象的属性和方法
  2.给res添加属性或者方法
  3.结束响应（优先级最高）

  * 特点：（1）只有中间件后面的环节可以获取前面环节的属性和方法，前面是无法获取后面的
  (2)每一个路径的中间件流程中，添加的属性和方法只能作用于本次请求
            * 每一个不同的路径都是一个不同的中间件匹配规则
  * 
  */

 /**express只有三种方法可以使用中间件
  * app.use(function(req,res,next)) 所有的请求都会进入该方法
  * app.get('/',function(req,res,next));指定get方法，并且匹配到参数路径，会执行该中间件
  app.post('/',function(req,res,next))；指定post方法，并且匹配到参数路径，会执行该中间件
  */



  app.use(function(req,res,next){
    console.log('进入了第一个中间件');

    
    req.laotie = '双击666';
    /**每一个中间件都有一个可选的参数，它是一个方法指向下一个中间件，当我们调用它的时候express会继续
     * 往中间件栈中匹配，如果找到能够匹配的中间件则继续执行
     * 
     */
    next();
  });

  app.get('/',function(req,res,next){
    console.log('进入了第二个中间件');
   // res.send('game over');
   //一旦结束了本次响应，express中间件则停止匹配，如果继续让他匹配则会报错

   console.log(req.laotie);

   req.shigao = '超高';

    next();
  });

  app.use(function(req,res,next){
    console.log('进入了第三个中间件');
    //res.send('game not over');

    console.log(req.shigao);
    
    next();
  });

  app.post('/',function(req,res,next){
    console.log('进入了第四个中间件');
    next();

  });

  app.get('/index',function(req,res,next){
    console.log('进入了第五个中间件');
    console.log(req.shigao);
    next();

  });

  app.use(function(req,res){
    //app.use是所有请求都会进来的中间件
    //这里我们不调用next，就当与兜底
    //此时相当于覆盖了express默认的哪一个兜底的中间件
    res.send('404 Not Found' + req.url);
  });


  app.listen(3003,function(){
      console.log('启动成功');
  });

