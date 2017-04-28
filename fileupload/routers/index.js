/**
 * Created by Administrator on 2017/4/28.
 */

var express = require('express'),
	router = express.Router(),
	formidable = require('formidable'),
	fs = require('fs'),
	file_path = 'public/image/';

//返回给html的通用数据
var data;
router.use(function (req, res, next) {
	data = {
		message: ''
	};
	next();
});

/*
* 渲染上传文件首页
* */
router.get('/',function (req, res) {
	res.render('index');
});

/*
* 文件上传过程处理
* */
router.post('/',function (req, res) {
	var form = new formidable.IncomingForm();   //创建上传表单
	form.encoding = 'utf-8';    //设置编码
	form.uploadDir = file_path;     //设置上传目录
	form.keepExtensions = true;     //保留后缀
	form.maxFieldsSize = 2 * 1024 * 1024;   //限制文件大小，2m
	form.multiples = true;      //允许多文件上传

	form.parse(req, function (err, fields, files) {     //错误， 字段域， 文件信息
		if(err){
			data.message = err;
			res.render('error',data);
			return ;
		}

		/*
		 * 保留文件原来名字
		 * */
		if(files.fileInfo.length > 1){
			//如果同时上传多个文件，返回的是数组，对所有数组中的文件重命名
			for(var i = 0; i < files.fileInfo.length;i++){
				fs.renameSync(files.fileInfo[i].path, form.uploadDir + files.fileInfo[i].name);  //重命名*/
			}
		}else{
			//对单一文件进行重命名
			fs.renameSync(files.fileInfo.path, form.uploadDir + files.fileInfo.name);  //重命名*/
			}
		});
		form.on('end', function() {
			data.message = '上传成功';
			data.url = '/';
			res.render('success', data);
		});
});

module.exports = router;