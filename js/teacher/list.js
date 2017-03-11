/**
 * Created by MF on 2017/2/25.
 */
define(['jquery','common','nprogress','template'],function ($, undefined, NProgress, template) {
	/*讲师列表缓存*/
	var teacherListCache = undefined;
	teacherListCache = undefined;
	if(teacherListCache){
		$('#teacher-list-tbody').html(teacherListCache);
	}else {
		//讲师列表
		$.get('/v6/teacher',function (data) {
			if(data.code == 200){
				var html = template('teacher-list-tpl', data);
				teacherListCache = JSON.stringify(data.result);
				$('#teacher-list-tbody').html(html);
			}
		});
	}

	/*
	*查看讲师信息
	* */
	$('#teacher-list-tbody').on('click', '.teacher-view-btn',function () {
		$.get('/v6/teacher/view', {
			tc_id: $(this).parent().attr('data-id')
		}, function (data) {
			if(data.code == 200){
				console.log(data.result);
				var html = template('teacher-view-tpl', data.result);
				$('#teacherModal').html(html);
			}

		});
	});
	//讲师状态注销-启用切换
	$('#teacher-list-tbody').on('click', '.teacher-status-btn',function () {
		var $self = $(this);
		$.post('/v6/teacher/handle', {
			tc_id: $(this).parent().attr('data-id'),
			tc_status: $(this).parent().attr('data-status')
		}, function (data) {
			if(data.code == 200){
				$self.html(data.result.tc_status == 0 ? '启 用' : '注 销');
				$self.parent().attr('data-status', data.result.tc_status);
			}

		});
	});

	/*
	* 搜索指定讲师
	* */
	$('.teacher-search-btn').on('click', function () {
		var keyWord = $('.teacher-search-input').val();
		var reg = new RegExp(keyWord);
		var dataArr =[];


		var teacherData = {};
		try {
			 teacherData = JSON.parse(teacherListCache);

		}catch (e){};
		for(var i=0, len = teacherData.length; i < len; i++) {
			//如果姓名和手机号中任一符合则显示
			if(reg.test(teacherData[i].tc_name) || reg.test(teacherData[i].tc_cellphone)) {
				dataArr.push(teacherData[i]);
			}

		}
		var html = template('teacher-list-tpl', {
			result: dataArr
		});
		$('#teacher-list-tbody').html(html);
		return false;
	})


	/*进度加载完毕*/
	NProgress.done();
})