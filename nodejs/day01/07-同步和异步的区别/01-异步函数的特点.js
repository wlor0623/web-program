//导入文件模块
var fs = require('fs');

/**异步执行的特点
 * 1.一定有回调函数
 * 2.异步是无序执行（随机执行）
 * 3.异步不会阻塞线程
 * 4.异步执行性能高，耗能低
 * 
 */


fs.readFile('./a.txt',function(err,data){
    if(err){
        throw err;
    }
    console.log('1111');
});

fs.readFile('./a.txt',function(err,data){
    if(err){
        throw err;
    }
    console.log('2222');
});

fs.readFile('./a.txt',function(err,data){
    if(err){
        throw err;
    }
    console.log('3333');
});

fs.readFile('./a.txt',function(err,data){
    if(err){
        throw err;
    }
    console.log('4444');
});

fs.readFile('./a.txt',function(err,data){
    if(err){
        throw err;
    }
    console.log('5555');
});


/**异步编程如果想要有顺序，可以通过两种方式实现  1：异步嵌套  2.同步执行 */

fs.readFile('./a.txt',function(err,data){
    if(err){
        throw err;
    }
    console.log('1111');
    fs.readFile('./a.txt',function(err,data){
        if(err){
            throw err;
        }
        console.log('2222');
        fs.readFile('./a.txt',function(err,data){
            if(err){
                throw err;
            }
            console.log('3333');
            fs.readFile('./a.txt',function(err,data){
                if(err){
                    throw err;
                }
                console.log('4444');
                fs.readFile('./a.txt',function(err,data){
                    if(err){
                        throw err;
                    }
                    console.log('5555');
                });
            });
        });
        
    });
});







