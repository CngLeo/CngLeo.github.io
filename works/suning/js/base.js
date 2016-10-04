/*
 *author : Leo
 *date : 2016/10/3
*/
function CountDown(option){	//倒计时构造函数
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

function getByClass(oParent, sClass){	//获取Class元素（获取集合）
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

function id(id){	//获取id
	return document.getElementById(id);
}

function view(){	//获取屏幕的宽高值
	return {
		w : document.documentElement.clientWidth,
		h : document.documentElement.clientHeight
	}
}

function bind(obj, ev, fn){		//封装绑定事件
	if(obj.addEventListener){
		return obj.addEventListener(ev, fn, false);
	}else{
		return obj.attachEvent('on'+ev, function(){
			fn.call(obj);
		});
	}
}

function addClass(obj, sClass){  //添加Class
	var aClass = obj.className.split(' ');
	if(!obj.className){
		obj.className = sClass;
		return false;
	}
	for(var i=0; i<aClass.length; i++){
		if(aClass[i] === sClass) return false;
	}
	obj.className += ' ' + sClass;
}

function removeClass(obj, sClass){  //删除Class
	var aClass = obj.className.split(' ');
	if(!obj.className) return false;
	for(var i=0; i<aClass.length; i++){
		if(aClass[i] === sClass){
			aClass.splice(i, 1);
			obj.className = aClass.join(' ');
			break;
		}
	}
}