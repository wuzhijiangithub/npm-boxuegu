/**
 * Created by MF on 2017/2/25.
 */
define(['jquery','common','nprogress','template'],function ($, undefined, NProgress, template) {
	$.get('/v6/category', function (data) {
		if(data.code == 200 ){
			$('.category-table').append(template('category-tpl',{list: data.result}));

		}
	})
	NProgress.done();
})