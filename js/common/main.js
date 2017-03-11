/**
 * Created by MF on 2017/2/25.
 */
requirejs.config({
	baseUrl: '/',
	paths: {
		/*第三方插件库*/
		jquery: './lib/jquery/jquery.min',
		jqueryCookie: './lib/jquery-cookie/jquery.cookie',
		bootstrap: './lib/bootstrap/js/bootstrap',
		nprogress: './lib/nprogress/nprogress',
		template: './lib/artTemplate-3.0.1/template',
		datepicker: './lib/bootstrap-datepicker/js/bootstrap-datepicker',
		localeDatepicker: './lib/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
		uploadify: './lib/uploadify/jquery.uploadify',
		ckeditor: './lib/ckeditor/ckeditor',
		region: './lib/region/jquery.region',


		//自己写的js文件
		util: './js/common/util',
		index: './js/index',
		common: '/js/common/common',
		courseAdd: '/js/course/add',
		addStep1: '/js/course/add_step1',
		addStep2: '/js/course/add_step2',
		addStep3: '/js/course/add_step3',
		category: '/js/course/category',
		categoryAdd: '/js/course/category_add',
		courseList: '/js/course/list',
		topic: '/js/course/topic',
		login: '/js/home/login',
		repass: '/js/home/repass',
		settings: '/js/home/settings',
		teacherAdd: '/js/teacher/add',
		teacherList: 'js/teacher/list',
		userList: 'js/user/list',
		userProfile: 'js/user/profile',
	},
	shim: {
		bootstrap: {
			deps: ['jquery']
		},
		localeDatepicker: {
			deps: ['jquery','datepicker']
		},
		uploadify: {
			deps: ['jquery']
		}

	}
});
require(['nprogress'],function (NProgress) {
	NProgress.start();
});
require(['jquery','bootstrap']);

//根据URL中路径名加载不用的js文件
(function (window) {
	var pathname = window.location.pathname;
	require(['jquery','jqueryCookie'],function ($, undefined) {
		//如果是登录页面，根据cookie判断是否登录过
		if(pathname === '/html/home/login.html' && $.cookie('PHPSESSID')){
			window.location.href = '/';

		}else if(pathname !== '/html/home/login.html' && !$.cookie('PHPSESSID')) {
			window.location.href = '/html/home/login.html';
		}
		switch (pathname) {
			case "/" :
				require(['index']);
				break;
			/*------------crouse-------------------*/
			case "/html/course/add.html" :
				require(['courseAdd']);
				break;
			case "/html/course/add_step1.html" :
				require(['addStep1']);
				break;
			case "/html/course/add_step2.html" :
				require(['addStep2']);
				break;
			case "/html/course/add_step3.html" :
				require(['addStep3']);
				break;
			case "/html/course/category.html" :
				require(['category']);
				break;
			case "/html/course/category_add.html" :
				require(['categoryAdd']);
				break;
			case "/html/course/list.html" :
				require(['courseList']);
				break;
			case "/html/course/topic.html" :
				require(['topic']);
				break;
			/*----------home-------------*/
			case "/html/home/login.html" :
				require(['login']);
				break;
			case "/html/home/repass.html" :
				require(['repass']);
				break;
			case "/html/home/settings.html" :
				require(['settings']);
				break;
			/*--------------teacher-------------*/
			case "/html/teacher/add.html" :
				require(['teacherAdd']);
				break;
			case "/html/teacher/list.html" :
				require(['teacherList']);
				break;
			/*----------------user-----------------*/
			case "/html/user/list.html" :
				require(['userList']);
				break;
			case "/html/user/profile.html" :
				require(['userProfile']);
				break;
		}
	})

})(window);
