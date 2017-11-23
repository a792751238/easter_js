//上一个,下一个滚动——依赖移动类,公共类
define(function (require, exports, module){
	var modMove=require('move.js');
	var modCom=require('common.js');
	
	exports.create=function (id)
	{
		var oDiv=document.getElementById(id);
		var aBtn=modCom.getEle('#'+id+' ol li');
		var oUl=modCom.getEle('#'+id+' ul')[0];
		var aLi=oUl.children;
		
		//1.复制
		oUl.innerHTML+=oUl.innerHTML;
		
		oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';
		
		//2.走
		var now=0;
		for(var i=0;i<aBtn.length;i++)
		{
			(function (index){
				aBtn[i].onclick=function ()
				{
					now=index;
					
					tab();
				};
			})(i);
		}
		
		function tab()
		{
			for(var i=0;i<aBtn.length;i++)
			{
				aBtn[i].className='';
			}
			aBtn[now%aBtn.length].className='active';
			modMove.move(oUl, {left: -now*aLi[0].offsetWidth}, {end: function (){
				if(oUl.offsetLeft<=-oUl.offsetWidth/2)
				{
					oUl.style.left=0;
					now=0;
				}
			}});
		}
		
		//上一个、下一个
		var oBtnPrev=modCom.getByClass(oDiv, 'prev')[0];
		var oBtnNext=modCom.getByClass(oDiv, 'next')[0];
		
		oBtnPrev.onclick=function ()
		{
			now--;
			if(now==-1)now=aBtn.length-1;
			
			tab();
		};
		
		oBtnNext.onclick=function ()
		{
			now++;
			if(now==aBtn.length)now=0;
			
			tab();
		};
	};
});