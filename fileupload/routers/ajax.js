/**
 * Created by Administrator on 2017/4/29.
 */
var express = require('express'),
	router = express.Router();

var responeData;

router.use(function (req, res, next) {
	responeData = {

	};
	next();
});

/*
 * ajax
 * */
router.post('/file_list',function (req, res) {
	var files = req.body;
	console.log(files);
	responeData.files = files;
	res.json(responeData);
});


module.exports = router;