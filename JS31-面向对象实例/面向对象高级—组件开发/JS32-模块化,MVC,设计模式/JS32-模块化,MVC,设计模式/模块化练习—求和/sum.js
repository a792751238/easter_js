
//定义模块
define(function (require, exports, module){
	var obj1=require('1.js');  //依赖另两个JS文件
	var obj2=require('2.js');
	
	exports.show=function ()
	{
		alert(obj1.a+obj2.b);
	};
});