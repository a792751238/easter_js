
//公共的东西
define(function (requier, exports, module){
	//module——批量输出
	
	//alert(module.exports==exports);
	
	function _getByStr(aParent, str)
	{
		var aChild=[];
		
		for(var i=0;i<aParent.length;i++)
		{
			if(str.charAt(0)=='#')
			{
				var obj=aParent[i].getElementById(str.substring(1));
				
				aChild.push(obj);
			}
			//class
			else if(str.charAt(0)=='.')
			{
				//.xxx[xx=xx]
				if(/\.[\w\-]+\[\w+=\w+\]/.test(str))
				{
					//.class[名字=值]
					var aStr=str.split(/\.|\[|=|\]/g);
					//aStr[0]==空的
					//aStr[1]==class
					//aStr[2]==名字
					//aStr[3]==值
					
					var arr=getByClass(aParent[i], aStr[1]);
					
					for(var j=0;j<arr.length;j++)
					{
						if(arr[j].getAttribute(aStr[2])==aStr[3])
						{
							aChild.push(arr[j]);
						}
					}
				}
				else
				{
					//.class
					var arr=getByClass(aParent[i], str.substring(1));
					
					for(var j=0;j<arr.length;j++)
					{
						aChild.push(arr[j]);
					}
				}
			}
			//标签
			else
			{
				//li	li.box(li#li1)
				
				//标签.class
				//英文、数字.英文、数字、下划线、横划线
				if(/^([a-z0-9]+\.[\w\-]+)$/i.test(str))
				{
					//li.box2
					var aStr=str.split('.');
					//aStr[0]	li		标签
					//aStr[1]	box2	class
					
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					
					var re=new RegExp('\\b'+aStr[1]+'\\b');
					
					for(var j=0;j<arr.length;j++)
					{
						//条件——class
						if(re.test(arr[j].className))
						{
							aChild.push(arr[j]);
						}
					}
				}
				
				//标签#id
				else if(/^([a-z0-9]+#[\w\-]+)$/i.test(str))
				{
					var aStr=str.split('#');
					//aStr[0]		标签
					//aStr[1]		id
					
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					
					for(var j=0;j<arr.length;j++)
					{
						if(arr[j].id==aStr[1])
						{
							aChild.push(arr[j]);
						}
					}
				}
				
				//标签[名字=值]
				else if(/^([a-z0-9]+\[\w+=\w+\])$/i.test(str))
				{
					var aStr=str.split(/\[|=|\]/g);
					//aStr[0]		标签
					//aStr[1]		名字
					//aStr[2]		值
					
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					
					for(var j=0;j<arr.length;j++)
					{
						if(arr[j].getAttribute(aStr[1])==aStr[2])
						{
							aChild.push(arr[j]);
						}
					}
				}
				
				//标签:eq(0)		li:first
				else if(/^([a-z0-9]+:[\w\(\)]+)$/i.test(str))
				{
					var aStr=str.split(':');
					//aStr[0]		标签
					//aStr[1]		伪类
					
					var arg=aStr[1].split(/\(|\)/g);
					/*
					arg[0]		名字-eq/first/odd/has
					arg[1]		参数-0/空/空/input.box
					*/
					
					
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					
					switch(arg[0])
					{
						case 'eq':
							var n=parseInt(arg[1]);
							
							if(!isNaN(n) && n>=0 && n<arr.length)
							{
								aChild.push(arr[n]);
							}
							break;
						case 'first':
							aChild.push(arr[0]);
							break;
						case 'odd':
							for(var j=1;j<arr.length;j+=2)
							{
								aChild.push(arr[j]);
							}
							break;
					}
				}
				
				//普通标签
				else
				{
					//普通标签
					var arr=aParent[i].getElementsByTagName(str);
					
					for(var j=0;j<arr.length;j++)
					{
						aChild.push(arr[j]);
					}
				}
			}
		}
		
		return aChild;
	}
	
	function getByClass(oParent, sClass)
	{
		if(oParent.getElementsByClassName)
		{
			return oParent.getElementsByClassName(sClass);
		}
		
		var aEle=oParent.getElementsByTagName('*');
		
		var re=new RegExp('\\b'+sClass+'\\b');
		var result=[];
		
		for(var i=0;i<aEle.length;i++)
		{
			if(re.test(aEle[i].className))
			{
				result.push(aEle[i]);
			}
		}
		
		return result;
	}
	
	module.exports={
		getStyle:	function (obj, name)
		{
			if(obj.currentStyle)
			{
				return obj.currentStyle[name];
			}
			else
			{
				return getComputedStyle(obj, false)[name];
			}
		},
		getByClass:	getByClass,
		getPos:		function (obj)
		{
			var res={l: 0, t: 0};
			
			while(obj)
			{
				res.l+=obj.offsetLeft;
				res.t+=obj.offsetTop;
				
				obj=obj.offsetParent;
			}
			
			return res;
		},
		getEle:		function (str, aParent)
		{
			var arr=str.replace(/^\s+|\s+$/g, '').split(/\s+/);
			aParent=aParent||[document];
			var aChild=[];
			
			for(var i=0;i<arr.length;i++)
			{
				aChild=_getByStr(aParent, arr[i]);
				aParent=aChild;
			}
			
			return aChild;
		}
	};
	
	/*exports.getStyle=function ()
	{
	};
	
	exports.getByClass=function ()
	{
	};
	
	exports.getPos=function ()
	{
	};*/
});