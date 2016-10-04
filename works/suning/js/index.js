
window.onload = function(){
	upTimes(); //更新抢购倒计时
	fnTab(); //banner图片轮播
}

function upTimes(){
	var oUpItem = document.getElementById('updeta_time');

	var aUpEle = getByClass(oUpItem, "time_item");
	
	var oCountDown = new CountDown({
		endtime : "2016/12/12 23:59:59",
		dayEle:aUpEle[0],
		hourEle:aUpEle[1],
		minEle:aUpEle[2],
		secondEle:aUpEle[3]
	});

	setInterval(upTime, 1000);

	function upTime(){
		oCountDown.start();
	}
}

function fnTab(){
	var oBanner = id('banner');
	var oList = oBanner.getElementsByTagName('ul')[0];
	var aNav = id('numList').getElementsByTagName('li');
	var iNow = 0;	//当前状态值
	var startPageX = 0; //手指按下时记录的pageX值；
	var iX = 0; //记录oList具体移动的距离
	var iStartX = 0;
	var iw = view().w //屏幕的可视宽
	var iTimer = null;

	autoPlay();
	function autoPlay(){ //自动轮播
		iTimer = setInterval(function(){
			iNow++;
			iNow %= aNav.length;
			tab();
		}, 2000);
	}

	function tab(){	//切换轮播图及numList状态
		iX = -iNow*iw;
		oList.style.transition = ".5s";
		oList.style.WebkitTransform = oList.style.transform = "translateX("+iX+"px)";
		for(var i=0; i<aNav.length; i++){
			removeClass(aNav[i], 'active');
		}
		addClass(aNav[iNow], 'active');
	}

	bind(oBanner, "touchstart", fnStart);
	bind(oBanner, "touchmove", fnMove);
	bind(oBanner, "touchend", fnEnd);

	function fnStart(ev){
		clearInterval(iTimer);
		oList.style.transition = "none";
		var ev = ev || window.event;
		var touchList = ev.changedTouches[0];
		startPageX = touchList.pageX;
		iStartX = iX;

	}

	function fnMove(ev){
		var ev = ev || window.event;
		var touchList = ev.changedTouches[0];
		var disX = touchList.pageX - startPageX;
		iX = iStartX + disX;
		oList.style.WebkitTransform = oList.style.transform = "translateX("+iX+"px)";
	}

	function fnEnd(){
		iNow = iX/iw;
		iNow = -Math.round(iNow);
		//console.log(iNow);

		if(iNow<0){
			iNow=0;
		}else if(iNow>aNav.length-1){
			iNow=aNav.length-1;
		}
		tab();
		autoPlay();
	}
}