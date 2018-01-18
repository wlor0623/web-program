var querystring = require('querystring');

var errHandler = require('../errHandle.js');


/**注意：这里不能直接导入articleModel模块，因为该模块的内部只是定义的文章的数据结构，并没有初始化mongoose
 * 这里要想使用articleModel拥有数据库增删改查操作，首先mongoose必须要连接mongodb数据库，而mongoose连接操作是由
 * index_model负责的
 * 结论：应该通过导入index_model来获取articleModel对象
 */
var articleModel = require('../models/index_model.js').Article;

var controller = module.exports;

//1.显示添加文章界面
controller.showArticleAdd = function (req, res) {
    //默认express加载的是views文件夹下模板文件，如果该模板文件在views文件夹下的子文件夹中，则路径需要加上子文件夹（会自动帮我们join）
    res.render('article/articleAdd.html',{
        user:req.session.user//将cookie数据传入模板中
    });
}

//2.添加文章到数据库
controller.doArticleAdd = function (req, res) {
    /**思路分析
     * 1.接收post请求的参数
     * 2.将文章数据添加到数据库
     * 3.响应返回添加结果
     * 
     */


    //1.接收请求的参数
    var body = req.body;


    //2.添加到数据库
    //2将文章数据添加到数据库

    //2.1 创建一个实体entity
    var article = new articleModel({
        title: body.title,
        content: body.content,
        articleType: body.articleType,
        user_id : body.user_id,
    });

    //2.2 插入到数据库
    articleModel.create(article, function (err, doc) {
        //2.3 如果添加失败则响应返回
        if (err) {
            //    res.end(JSON.stringify({
            //        err_code : 500,
            //        err_message : err.message
            //    }));
            //express有一个自带的可以直接响应json对象的方法，它在内部帮我们做了转换
            res.json(errHandler(500, err));
        }
        res.json(errHandler(0));

    })



    // console.log(req.url);
    // //1.接收post请求的参数
    // var reqData = '';
    // req.on('data', function (chunk) {
    //     reqData += chunk;
    // })
    // req.on('end', function () {
    //     //1.2解析post数据
    //     var body = querystring.parse(reqData);

    //     //2将文章数据添加到数据库

    //     //2.1 创建一个实体entity
    //     var article = new articleModel({
    //         title: body.title,
    //         content: body.content,
    //         articleType: body.articleType
    //     });

    //     //2.2 插入到数据库
    //     articleModel.create(article, function (err, doc) {
    //         //2.3 如果添加失败则响应返回
    //         if (err) {
    //             //    res.end(JSON.stringify({
    //             //        err_code : 500,
    //             //        err_message : err.message
    //             //    }));
    //             //express有一个自带的可以直接响应json对象的方法，它在内部帮我们做了转换
    //             res.json({
    //                 err_code: 500,
    //                 err_message: err.message
    //             });
    //         }
    //         res.json({
    //             err_code: 0,
    //             err_message: null
    //         });

    //     })
    // });

}

//3.显示文章详情界面
controller.showArticleInfo = function (req, res) {

    /**思路分析
     * 1.获取请求的参数
     * 2.查询数据库
     * 3.文章查看数+1
     * 4.保存到数据库
     * 5.响应返回渲染数据的html模板
     * 
     */

    //1.获取请求的参数
    var query = req.query;
    //2.查询数据库
    /**mongoose的id属性有一个下划线_id,如果只是读取它的值，下划线可以省略`id`,如果是改变他的值下划线不能省略`_id`
     */
    articleModel.findById(query.id, function (err, doc) {
        if (err) {
            res.json(errHandler(500, err));
        }

        console.log(doc);
        //3.文章查看数+1
        doc.visits += 1;
        //4.保存到数据库，更新数据库
        /**通常我们更新数据库使用update，这里为什么用create也可以主要是因为我的id是一致的
         * 如果我们保存到数据库使用create（插入数据），如果你插入的数据的id与数据库中已存在的数据id一致则会覆盖
         */
        articleModel.create(doc, function (err) {
            if (err) {
                res.json(errHandler(500, err));
            }
            //5.响应返回渲染数据的文章详情模板
            res.render('article/articleInfo.html', {
                article: doc,
                user:req.session.user//这里传值的作用就是判断当前用户是否拥有编辑该文章的权限
            });
        })
    })

}

//4.显示文章编辑界面
controller.showArticleEdit = function (req, res) {
    /**思路分析
     * 1.获取get请求参数文章id
     * 2.通过参数文章id查询数据库
     * 3.响应返回渲染的html
     * 
     */

    //1.获取get请求的参数
    var query = req.query;
    //2.查询数据库
    articleModel.findById(query.id, function (err, doc) {
        if (err) {
            res.json(errHandler(500, err));
        }

        //3.响应返回渲染好的html模板
        res.render('article/articleEdit.html', {
            article: doc
            
        });
    })

}

//5.编辑文章
controller.doArticleEdit = function (req, res) {
    /**思路分析
     * 1.获取post请求参数
     * 2.更新到数据库
     * 3.响应返回处理结果
     */

    //1.获取post请求参数
    var body = req.body;

    console.log(body);
    //2.更新到数据库
    articleModel.update({
        _id: body.id
    }, body, function (err) {

        //3.响应返回处理结果

        if (err) {
            res.json(errHandler(500, err));
        }

        res.json(errHandler(0));
    })

}