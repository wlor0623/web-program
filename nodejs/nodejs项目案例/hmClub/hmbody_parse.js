var querystring = require('querystring');

module.exports = function (req, res, next) {

    console.log(req.url);
    //解析post请求
    if (req.method === 'POST') {
        //1.接收post请求的参数
        var reqData = '';
        req.on('data', function (chunk) {
            reqData += chunk;
        })
        req.on('end', function () {
            req.body1 = querystring.parse(reqData);

            console.dir(req.body1);

            //一旦加载了该中间件，如果是post请求直接通过req.body获取请求的参数，如果不是post，req.body则为空
             //继续匹配后面的中间件
             next();
        });
    }else{
        //如果是get则不获取直接匹配下一个中间件
        next();
    }

   
}