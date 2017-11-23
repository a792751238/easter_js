//页面控制层
define(function (require, exports, module){
	var modM=require('baidu_m.js');
	var modV=require('baidu_v.js');
	
	module.exports=
	{
		createList:	function (txtId)
		{
			var oTxt=document.getElementById(txtId);
			
			oTxt.onkeyup=function ()
			{
				//C——找M要数据；把数据给V
				modM.readFromBaidu(this.value, function (json){
					modV.createList(json.s);
				});
			};
		},
		createRelated:	function (txtId, btnId)
		{
			var oTxt2=document.getElementById(txtId);
			var oBtn2=document.getElementById(btnId);
			
			oBtn2.onclick=function ()
			{
				modM.readFromBaidu(oTxt2.value, function (json){
					modV.createRelated(json.s);
				});
			};
		}
	};
});