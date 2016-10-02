/*
 *author：Leo
*/
function CountDown(option){
	this._init(option);
}

CountDown.prototype = {
	constructor:CountDown,
	_init:function(option){
		this.endtime = option.endtime || 0;
		this.dayEle = option.dayEle || 0;
		this.hourEle = option.hourEle || 0;
		this.minEle = option.minEle || 0;
		this.secondEle = option.secondEle || 0;
	},
	start:function(){
		var endTime = new Date(this.endtime);
		var nowTime = new Date();
		var diff_s = ( endTime.getTime() - nowTime.getTime() )/1000;

		if(diff_s < 0){
			diff_s = 0;
		}

		var day = parseInt( diff_s/3600/24 );
		var hour = parseInt( diff_s/3600%24 );
		var min = parseInt( diff_s/60%60 );
		var second = parseInt( diff_s%60 );

		day = day < 10? "0"+day : day;
		hour = hour < 10? "0"+hour : hour;
		min = min < 10? "0"+min : min;
		second = second < 10? "0"+second : second;

		this.dayEle.innerHTML = day;
		this.hourEle.innerHTML = hour;
		this.minEle.innerHTML = min;
		this.secondEle.innerHTML = second;
	}
}

function getByClass(oParent, sClass)
{
 var aEle=oParent.getElementsByTagName('*');
 var aResult=[];
 var re=new RegExp('\\b'+sClass+'\\b', 'i');
 var i=0;
 
 for(i=0;i<aEle.length;i++)
 {
  //if(aEle[i].className==sClass)
  //if(aEle[i].className.search(sClass)!=-1)
  if(re.test(aEle[i].className))
  {
   aResult.push(aEle[i]);
  }
 }
 
 return aResult;
}