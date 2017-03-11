/**
 * Created by MF on 2017/2/25.
 */
define(['jquery','common','nprogress','template'],function ($, undefined, NProgress, template) {
	$.get('/v6/course', function (data) {
		if(data.code == 200){
			console.log(data);
			$('.courses').append(template('cs-ls-form',{list: data.result}));
		}
	})

	/*页面加载完成，进度条结束*/
	NProgress.done();
})