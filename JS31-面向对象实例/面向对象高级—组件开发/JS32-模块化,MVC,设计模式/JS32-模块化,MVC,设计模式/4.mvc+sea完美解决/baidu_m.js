//模型层,请求数据

define(function (require, exports, module){
	var modCom=require('common.js');
	
	exports.readFromBaidu=function (str, fnSucc)
	{
		modCom.jsonp('http://suggestion.baidu.com/su', {wd: str}, 'cb', function (json)
		{
			fnSucc && fnSucc(json);
		});	
	};
});

//请求数据












