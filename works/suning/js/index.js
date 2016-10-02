window.onload = function(){

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