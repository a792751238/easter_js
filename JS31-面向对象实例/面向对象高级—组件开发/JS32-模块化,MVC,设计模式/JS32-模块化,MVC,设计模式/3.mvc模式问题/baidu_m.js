

//模型层,请求数据
function readFromBaidu(str, fnSucc)
{
	var fnName='jsonp_'+Math.random();
	fnName=fnName.replace('.','');
	
	window[fnName]=function (json)
	{
		fnSucc && fnSucc(json);
		
		oHead.removeChild(oS);
		window[fnName]=null;
	};
	
	var oS=document.createElement('script');
	oS.src='http://suggestion.baidu.com/su?wd='+str+'&cb='+fnName;
	
	var oHead=document.getElementsByTagName('head')[0];
	
	oHead.appendChild(oS);
}











