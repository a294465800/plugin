/**
 * Created by Administrator on 2017/4/28.
 */

//加载express
var express = require('express');

//加载模版引擎
var swig = require('swig');

//加载body-parser，用于处理post数据
var bodyParser = require('body-parser');

//创建app应用 => NodeJs Http.createServer();
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

/*
* 设置静态文件托管
* __dirname获取当前文件的绝对路径，拼接public后就是静态文件的根目录
* */
app.use('/public',express.static(__dirname + '/public'));

/*
	配置应用模版
	定义当前应用所使用的模版引擎
	第一个参数：模版引擎的名称，同时也是模版文件的后缀；第二个参数表示用于解释处理模版内容的解释方法
*/
app.engine('html',swig.renderFile);

//设置模版文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set('views','./views');

/*
	注册所使用的模版引擎，第一个参数必须是 view engine,
	第二个参数和app.engine这个方法中定义的模版引擎的名称（第一个参数）是一致的
*/
app.set('view engine','html');

/*
* 划分路由
* */
app.use('/',require('./routers/index'));
app.use('/api',require('./routers/ajax'));

//监听http请求
app.listen(8083);
console.log('开始监听8083端口...');