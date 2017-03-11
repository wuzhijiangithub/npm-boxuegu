/**
 * Created by MF on 2017/2/25.
 */
define(['jquery','common','nprogress','util','template'],function ($, undefined, NProgress, util, template) {
	var csId = util.getQueryString('cs_id');

	/*请求课程图片等信息并渲染*/
	$.get('/v6/course/lesson',{cs_id: csId}, function (data) {
		if(data.code == 200) {
			var isEdit = true;
			$('.steps').html(template('course-add-tpl', data.result));
			$('.cs-aside-ul a').removeClass('active').eq(2).addClass('active');
			//点击课时添加按钮显示添加模拟框
			$('.add-ct-btn').on('click', function () {
				isEdit = false;
				$('#chapterModal').html(template('chapterModal-tpl', {}));
				$('#chapterModal').modal();
			});


			//点击编辑课时请求
			$(".ct-edit-btn").on('click', function () {
				isEdit = true;

				$.get('/v6/course/chapter/edit',{ct_id: $(this).parent().attr('data-id')}, function (data) {
					if(data.code == 200) {
						$('#chapterModal').html(template('chapterModal-tpl', data.result));
						$('#chapterModal').modal();
						$('.save-ct-btn').text('编辑');
					}
				});
			});
			/*添加并保存课时*/
			$(document).on('click', '.save-ct-btn', function () {
				console.log(isEdit);
				var data = $('.modal-form').serialize()+"&ct_cs_id="+csId+"&ct_is_free="+($('.checkbox input')[0].checked? 1: 0);
				$.ajax({
				 type: 'post',
				 url: isEdit?'/v6/course/chapter/modify': '/v6/course/chapter/add',
				 data: isEdit? (data + "&ct_id="+$('#ct-btn-div').attr('data-id')): data,
				 success: function (data) {
					 console.log(123);
					 if(data.code == 200) {
						window.location.reload();
					 }
				 }
				})
			})
		}
	})

	/*页面加载完毕，进度条结束*/
	NProgress.done();
})