
//定义模块
define(function (require, exports, module){ //不要修改原参数名字
	//require		请求——引入(依赖的接口)
	//exports		导出——给外面用(对外的接口)
	//module		模块,批量
	
	//var a=12;
	
	//只有输出的东西，才会在模块上出现
	exports.a=12; //相当于放在一个全局对象上了
	
	exports.show=function ()
	{
		alert('ABC');
	};
});

