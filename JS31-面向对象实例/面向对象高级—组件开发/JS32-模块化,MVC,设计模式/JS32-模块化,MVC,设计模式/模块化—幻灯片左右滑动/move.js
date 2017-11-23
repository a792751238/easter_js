//通用移动类
define(function (require, exports, module){
	exports.move=function (obj, json, options)
	{
		function getStyle(obj, name)
		{
			if(obj.currentStyle)
			{
				var value=obj.currentStyle[name];
			}
			else
			{
				var value=getComputedStyle(obj, false)[name];
			}
			
			if(name=='opacity')
			{
				return Math.round(parseFloat(value)*100);
			}
			else
			{
				return parseInt(value);
			}
		}
		
		options=options||{};
		options.time=options.time||700;
		options.type=options.type||'buffer';
		
		var time=options.time;
		var type=options.type;
		
		if(typeof time=='string')
		{
			switch(time.toLowerCase())
			{
				case 'slow':
					time=3000;
					break;
				case 'normal':
					time=1000;
					break;
				case 'fast':
					time=500;
					break;
				case 'veryfast':
					time=200;
					break;
				case 'veryslow':
					time=10000;
					break;
			}
		}
		
		var count=parseInt(time/30);
		var n=0;
		
		var dis={};
		var start={};
		
		for(var i in json)
		{
			start[i]=getStyle(obj, i);	//start->{width: 200, height: 300}
			dis[i]=json[i]-start[i];	//dis->{width: 300, height: 100}
		}
		
		clearInterval(obj.timer);
		obj.timer=setInterval(function (){
			n++;
			
			for(var i in json)
			{
				switch(type.toLowerCase())
				{
					case 'linear':
						var a=n/count;
						var cur=start[i]+dis[i]*a;
						break;
					case 'buffer':
						var a=1-n/count;
						var cur=start[i]+dis[i]*(1-a*a*a);
						break;
					case 'acc':
						var a=n/count;
						var cur=start[i]+dis[i]*(a*a*a);
						break;
				}
				
				if(i=='opacity')
				{
					obj.style.filter='alpha(opacity:'+cur+')';
					obj.style.opacity=cur/100;
				}
				else
				{
					obj.style[i]=cur+'px';
				}
			}
			
			if(n==count)
			{
				clearInterval(obj.timer);
				
				options.end && options.end();
			}
		}, 30);
	};
});