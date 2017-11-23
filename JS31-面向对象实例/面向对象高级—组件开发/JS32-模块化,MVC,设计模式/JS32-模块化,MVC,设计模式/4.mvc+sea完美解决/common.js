//公共部分

define(function (require, exports, module){
	exports.jsonp=function (url, data, cbName, fnSucc)
	{
		var fnName='jsonp_'+Math.random();
		fnName=fnName.replace('.','');
		
		data[cbName]=fnName;
		
		window[fnName]=function (json)
		{
			fnSucc && fnSucc(json);
			
			oHead.removeChild(oS);
			window[fnName]=null;
		};
		
		var oS=document.createElement('script');
		
		var arr=[];
		for(var i in data)
		{
			arr.push(i+'='+data[i]);
		}
		
		oS.src=url+'?'+arr.join('&');
		
		var oHead=document.getElementsByTagName('head')[0];
		
		oHead.appendChild(oS);
	};
});








