/**
 * Created by MF on 2017/2/25.
 */
define(['jquery','jqueryCookie','nprogress'],function ($, undefined, NProgress) {
	//根据cookie中用户信息显示对应的头像和用户名
	var userInfo = $.cookie('userInfo');
	if(userInfo){
		var name = JSON.parse(userInfo).tc_name;
		var avatar = JSON.parse(userInfo).tc_avatar? JSON.parse(userInfo).tc_avatar: '/img/default.png';
		$('#tc_name').val(name);
		$('#tc_avatar').attr('src', avatar);
	}

	//登录功能
	$('form').on('submit',function () {
		$.ajax({
			url: '/v6/login',
			type: 'post',
			data: $(this).serialize(),
			success: function (data) {
				if(data.code == 200) {
					console.log(data);
					$.cookie('userInfo', JSON.stringify(data.result) ,{path: '/'});
					window.location.href = '/';
				}

			},
			error: function () {
				console.log('用户名或者密码不存在');
			}

		});
		return false;

	});
	/*进度条加载完成*/
	NProgress.done();
});