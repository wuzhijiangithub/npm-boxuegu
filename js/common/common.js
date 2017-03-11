define(['jquery','jqueryCookie'],function ($) {
	//左侧边栏讲师管理单击下拉展示
	$('.navs ul').eq(1).prev('a').on('click',function () {
		$(this).next('ul').slideToggle();
	});

	//退出功能
	$('#logout').on('click', function () {
		$.post('/v6/logout', function (data) {
			if(data.code === '200') {

				window.location.href = '/html/home/login.html';
			}
		});
	});
	//显示左侧边栏头像和用户名
	try {
		var userInfo = JSON.parse($.cookie('userInfo'));
	}catch(e) {
		var userInfo = {};
	}

	var avatar = userInfo.tc_avatar ? userInfo.tc_avatar: '/img/default.png';
	var name = userInfo.tc_name? userInfo.tc_name : '该用户未设置用户名';
	$('.aside .profile h4').text(name);
	$('.aside .profile img').attr('src', avatar);

	// 左侧导航定位&多选项下拉显示
	var configPath = {
		'/html/course/add_step1.html': '/html/course/add.html',
		'/html/course/add_step2.html': '/html/course/add.html',
		'/html/course/add_step3.html': '/html/course/add.html',
	}
	var pathname = window.location.pathname;
	pathname = configPath[pathname]?configPath[pathname]:pathname;
	$('.navs a').removeClass('active').filter('[href="'+pathname+'"]').addClass('active').parents('ul').show();
	
	/*发送ajax请求时显示loading正在加载动画*/
	$(document).ajaxStart(function () {
		$('.overlay').show();
	}).ajaxStop(function () {
		$('.overlay').hide();
	});

});