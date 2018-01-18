var http = require('http');
//导入js文件模块
var render = require('./render.js');

console.log( require('./mokuai1.js'));
console.log( require('./mokuai2.js'));

console.log(render);

var server = http.createServer();

server.on('request',function(req,res){
    
    render();

});


server.listen(3000,function(){
    console.log('111');

    
});