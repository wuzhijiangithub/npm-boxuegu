/**
 * Created by MF on 2017/2/25.
 */
define(['jquery','common','nprogress','template','datepicker','localeDatepicker','uploadify','ckeditor','region'],
	function ($, undefined, NProgress, template, datepicker, localeDatepicker, uploadify, undefined, region) {
	/*查看个人中心*/
	$.get('/v6/teacher/profile', function (data) {
		if(data.code == 200){
			console.log(data);
			var html = template('settings-tpl', data.result);
			$('.profile-form').html(html);
			/*配置上传头像*/
			$('#upfile').uploadify({
				swf: '/lib/uploadify/uploadify.swf',
				uploader: '/v6/uploader/avatar',
				fileObjName: 'tc_avatar',
				fileTypeExts: '*.gif; *.jpg; *.png',
				height: $('.preview').height(),
				buttonText: '',

				onUploadSuccess: function(file, data) {
					var data = JSON.parse(data);
					$('.preview img').attr('src', data.result.path);
				}
			});


			/*配置日期控件*/
			$('.datepicker-settings').datepicker({
				language: 'zh-CN',
				format: 'yyyy-mm-dd',
				startDate: '2016-01-01',
				endDate: new Date(),

			});

			/*配置省市区三级联动控件*/
			$('#region').region({
				url: '/lib/region/region.json'
			});
			//配置个人介绍富文本编辑
			var edit = CKEDITOR.replace('ckeditor', {
				toolbarGroups: [
					{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
					{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
					{ name: 'links' },
					{ name: 'insert' },
					{ name: 'forms' },
					{ name: 'tools' },
					{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
					{ name: 'others' },
				]
			});
			window.edit = edit;
		}
	});

	/*保存个人中心资料*/
	/*事件委托*/
		$('.profile-form').on("click",".save-profile-btn", function () {
			$('#ckeditor').val(edit.getData());
			var hometown = $('#region option:selected').map(function (i, val) {
				return val.innerHTML;

			});
			console.log();
			$.post('/v6/teacher/modify', $('.profile-form').serialize()+"&tc_hometown="+hometown.toArray().join('|'), function (data) {
					if(data.code == 200){
						window.location.reload();

					}else {
						console.log('原密码错误')
					}
				});


			return false;
		})


	/*页面加载完毕*/
	NProgress.done();
})