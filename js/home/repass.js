/**
 * Created by MF on 2017/2/25.
 */
define(['jquery','common','nprogress'],function ($, undefined, NProgress) {
	/*
	 * 更改密码
	 * */
	$('.repass-btn').on("click", function () {

		$.post('/v6/teacher/repass',$('.rapass-form').serialize(), function (data) {
			if(data.code == 200){
				console.log('修改成功');
			}
		});
		return false;
	})
	NProgress.done();
})