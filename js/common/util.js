/**
 * Created by MF on 2017/3/1.
 */
define(['util'], {
	getQueryString: function (key) {
		var search = location.search.slice(1);

		// 使用&符号得到每一个key=val
		var searchArr = search.split('&');
		var tempArr = null;
		var searchObj = {};

		// 遍历数组中的每一个key=val字符串，使用=号劈开，
		// 然后以key为名，val为值添加到searchObj对象中。
		for( var i =0, len = searchArr.length; i < len; i++) {
			tempArr = searchArr[i].split('=');
			searchObj[ tempArr[0] ] = tempArr[1];
		}

		// 有参数返回指定值，没有参数返回全部值
		return arguments.length? searchObj[key]: searchObj;
	},

})