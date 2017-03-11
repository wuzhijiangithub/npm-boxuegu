/**
 * Created by MF on 2017/2/25.
 */
define(['jquery','common','nprogress'],function ($, undefined, NProgress) {

	$('.create-cs-btn').on('click', function () {
		$.post('/v6/course/create',$('#create-cs-form').serialize(), function (data) {
			if(data.code == 200) {
				window.location.href = '/html/course/add_step1.html?cs_id='+data.result.cs_id;
			}

		});
		return false;
	});
	/*页面加载完毕，进度条完成*/
	NProgress.done();
})