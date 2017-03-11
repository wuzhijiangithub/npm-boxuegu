/**
 * Created by MF on 2017/2/25.
 */
define(['jquery','common','nprogress','util','template'],function ($, undefined, NProgress, util, template) {
	
	function CategotyManager() {
		this.cgId = util.getQueryString('cg_id');
		this.isEidt = !!this.cgId;
		this.getDataUrl =  this.isEidt? '/v6/category/edit': '/v6/category/top';//获取原始分类数据
		this.saveDataUrl = this.isEidt? '/v6/category/modify': '/v6/category/add';//保存分类
		this.init();
	}
	CategotyManager.prototype = {
		init: function () {
			var self = this;
			this.getData(function (data) {
				if(self.isEidt) {
					self.render(data);
					self.submit();
				}else {
					self.render({top:data});
					self.submit();
				}

			});
		},

		getData: function (fn) {
			$.get(this.getDataUrl,{cg_id: this.cgId}, function (data) {
				if(data.code == 200){
					fn&&fn(data.result);
					console.log(data);
				}
			});
		},
		render: function (data) {
			console.log(data);

			$('.category-add').html(template('category-add-tpl', data));
		},
		submit: function () {
			var self = this;
			$('.save-cg-btn').on('click', function () {
				var data = self.isEidt? ($('#add-cg-form').serialize()+"&cg_id="+
				self.cgId) : $('#add-cg-form').serialize();
				console.log(data);
				$.post(self.saveDataUrl, data, function (data) {
					if( data.code == 200 ) {
						window.location.href = '/html/course/category.html'
					}
				})
				return false;
			})

		}
	}
	new CategotyManager();
	NProgress.done();
})