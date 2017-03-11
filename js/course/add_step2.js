/**
 * Created by MF on 2017/2/25.
 */
define(['jquery','common','nprogress','util','template','uploadify'],function ($, undefined, NProgress, util, template, uploadify) {
	var csId = util.getQueryString('cs_id');

	/*请求课程图片等信息并渲染*/
	$.get('/v6/course/picture',{cs_id: csId}, function (data) {
		if(data.code == 200) {
			$('.steps').html(template('course-add-tpl', data.result));
			$('.cs-aside-ul a').removeClass('active').eq(1).addClass('active');
			/*文件上传功能*/
			$('#cs-img-btn').uploadify({
				buttonClass: 'btn btn-success btn-sm',
				buttonText: '选择图片',
				fileSizeLimit: '2MB',
				fileTypeExts : '*.gif; *.jpg; *.png',
				swf           : '/lib/uploadify/uploadify.swf',
				uploader      : '/v6/uploader/cover',
				fileObjName: 'cs_cover_original',
				formData: {cs_id: csId},
				height: '100%',
				width: '100%',
				onUploadSuccess : function(file, data, response) {
					data = JSON.parse(data);
					$('.picture img').attr('src', data.result.path);
				}

			});


		}
	})
	/*页面加载完成，进度条结束*/
	NProgress.done();
})