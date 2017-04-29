/**
 * Created by Administrator on 2017/4/28.
 */
var a = 0;
$(function () {
	var btnSub = $('#btnSub'),
		errorTip = $('#errorTip'),
		file_info = document.getElementById('file-info'),
		typeTip = $('#typeTip'),
		file_list = document.getElementById('file_list'),
		file_num = $('#file_num');
	var files = [];
	var fd = new FormData();

	btnSub.on('click',function(){
		var length = file_info.files.length;

		errorTip.css('display','none');
		typeTip.css('display','none');

		if(!length)
		{
			errorTip.css('display','block');
			return false;
		}
		//获取文件后缀名
		for(var i = 0;i < length; i++){
			var extName = file_info.files[i].name.substring(file_info.files[i].name.lastIndexOf('.'),file_info.files[i].name.length).toLowerCase();
			if(extName !== '.png' && extName !== '.jpg'){
				typeTip.css('display','block');
				return false;
			}
		}
		for (var i = 0, j = files.length; i<j;i++){
			fd.append('files',files[i]);
		}

		var xhrOnProgress = function(fun) {
			xhrOnProgress.onprogress = fun; //绑定监听
			//使用闭包实现监听绑
			return function() {
				//通过$.ajaxSettings.xhr();获得XMLHttpRequest对象
				var xhr = $.ajaxSettings.xhr();
				//判断监听函数是否为函数
				if (typeof xhrOnProgress.onprogress !== 'function')
					return xhr;
				//如果有监听函数并且xhr对象支持绑定时就把监听函数绑定上去
				if (xhrOnProgress.onprogress && xhr.upload) {
					xhr.upload.onprogress = xhrOnProgress.onprogress;
				}
				return xhr;
			}
		};
		var progress = $('.file_load');
		var percentage = $('.percent');
		var cancel = $('.file_cancel');
		$.ajax({
			type: 'post',
			url: '/',
			data: fd,
			processData: false,
			contentType: false,
			xhr: xhrOnProgress(function (e) {
					var percent = (e.loaded / e.total * 100 | 0);//计算百分比
					progress.val(percent);
					progress.html(percent);
					percentage.html(percent + '%');
					if(progress.val() === 100){
						cancel.html('成功');
						cancel.off();
						files = [];
					}
				})
		});
		return false;
	});
	$('#file-info').change(function () {
		errorTip.css('display','none');
		typeTip.css('display','none');
		file_list.innerHTML = '';

		var html = '';
		Array.prototype.push.apply(files, file_info.files);
		for(var file in files){
			html += '<li><p>' + files[file].name + '</p><span class="file_cancel">取消</span><br><progress class="file_load" value="0" max="100">0</progress><span class="percent">0</span></li>';
		}
		file_list.innerHTML = html;
		$('#file-info').css('color',"#fff");
		file_num.html('你已经选择了' + files.length + '个文件');

		$('.file_cancel').on('click',function () {
			var $this_li = $(this).closest('li');
			var name = $this_li.find('p').text();
			$this_li.hide();
			files = files.filter(function (file) {
				return file.name !== name;
			});
		});
	});
});