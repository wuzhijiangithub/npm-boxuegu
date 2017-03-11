/**
 * Created by MF on 2017/2/25.
 */
define(['jquery','common','nprogress','util','template','ckeditor'],function ($, undefined, NProgress, util, template, undefined) {
	var csId = util.getQueryString('cs_id');
	/*获取当前课程基本信息并渲染*/
	$.get('/v6/course/basic',{cs_id: csId}, function (data) {
		if(data.code == 200) {
			console.log(data);
			$('.steps').html(template('course-add-tpl', data.result));
			$('.cs-aside-ul a').removeClass('active').eq(0).addClass('active');
			/*顶级分类改变时发送请求获取当前顶级分类对应的所有子级分类*/
			$('.cg-top-select').on('change', function () {
				var cgId = $(this).val();
				$.ajax({
					type: 'get',
					url: '/v6/category/child',
					data: {cg_id: cgId},
					success: function (data) {
						if(data.code == 200) {
							var cgChildsTpl =   '{{ each list}}\
							<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>\
							{{ /each }}';
							var render = template.compile(cgChildsTpl);
							var html = render({list: data.result});
							$('.cg-childs-select').html(html);
						}else {
							$('.cg-childs-select').html('');
						}
					},
					error: function () {
						$('.cg-childs-select').html('');
					}
				})

			});
			/*手动触发顶级分类发生改变事件，给子级分类渲对应的值*/
			$('.cg-top-select').trigger('change');
			/*富文本编辑器*/
			var ckeditor = CKEDITOR.replace('ckeditor');
			/*保存课程基本信息*/
			$('.save-base-btn').on('click', function () {
				ckeditor.updateElement();
				$.post('/v6/course/update/basic',$('#add-base-form').serialize() +'&cs_id='+ csId, function (data) {
					if(data.code==200) {
						window.location.href = './add_step2.html?cs_id='+csId;
					}
				});
				return false;
			});

		}
	})
	/*页面加载完成，进度条结束*/
	NProgress.done();
})