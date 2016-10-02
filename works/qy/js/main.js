

//  联系电话：13138740090	彭创	大家都叫我Leo， 数字 6 的意思


window.onload = function(){
	Leo.app.toTip();
	Leo.app.toBanner();
	Leo.app.toSel();
	Leo.app.toRun();

	/* 面向对象Products */
	var productsList = document.getElementById('products_list');
	var products = [];
	var strDOM = '';
	for(var i=0; i<dataProducts.name.length; i++){
		products.push( new Product({
			imgSrc:dataProducts.imgSrc[i],
			name:dataProducts.name[i],
			price:dataProducts.price[i]
		}) );
		strDOM += products[i].bindDOM();
	}
	productsList.innerHTML = strDOM;
}


var Leo = {};
Leo.tools = {};
Leo.tools.getStyle = function(obj, attr){
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj, false)[attr];
	}
}
Leo.tools.getByClass = function(parent, iClass){
	var aEle = parent.getElementsByTagName('*');
	var arr = [];
	for (var i = 0; i < aEle.length; i++) {
		if (aEle[i].className == iClass) {
			arr.push( aEle[i] );
		}
	}
	return arr;
}

Leo.ui = {};
Leo.ui.textChange = function(obj, str){
	obj.onfocus = function(){
		if ( obj.value == str ) {
			obj.value = '';
		}
	}

	obj.onblur = function(){
		if ( obj.value == '' ) {
			obj.value = 'Search website';
		}
	}
}
Leo.ui.fadeIn = function(obj){

	var iCur = Leo.tools.getStyle(obj, 'opacity')
	if (iCur == 1) {return false;}

	clearInterval( obj.timer );
	var value = 0;
	obj.timer = setInterval(function(){
		var ispeed = 5;
		if (value ==100) {
			clearInterval(obj.timer);
		}else{
			value += ispeed;
			obj.style.filter = 'alpha(opacity='+value+')';
			obj.style.opacity = value/100;
		}
	},30);
}
Leo.ui.fadeOut = function(obj){
	
	var iCur = Leo.tools.getStyle(obj, 'opacity')
	if (iCur == 0) {return false;}

	clearInterval( obj.timer );
	var value = 100;
	obj.timer = setInterval(function(){
		var ispeed = -5;
		if (value == 0) {
			clearInterval(obj.timer);
		}else{
			value += ispeed;
			obj.style.filter = 'alpha(opacity='+value+')';
			obj.style.opacity = value/100;
		}
	},30);
}
Leo.ui.scrollLeft = function(obj,old,now){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){

		var iSpeed = (now - old)/ 10;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

		if (now == old) {
			clearInterval(obj.timer);
		}else{
			old += iSpeed;
			obj.style.left = old + 'px';
		}
	},30);
}

Leo.app = {};
Leo.app.toTip = function(){
	var oText1 = document.getElementById('text1');
	var oText2 = document.getElementById('text2');

	Leo.ui.textChange(oText1, 'Search website');
	Leo.ui.textChange(oText2, 'Search website');

}
Leo.app.toBanner = function(){
	var oParent = document.getElementById('banner');
	var aLi = oParent.getElementsByTagName('li');
	var iNow = 0;
	var timer = setInterval(auto,3000);

	var oPrevBg = Leo.tools.getByClass(oParent, 'prev_bg')[0];
	var oPrev = Leo.tools.getByClass(oParent, 'prev')[0];
	var oNextBg = Leo.tools.getByClass(oParent, 'next_bg')[0];
	var oNext = Leo.tools.getByClass(oParent, 'next')[0];
	//console.log( oPrevBg );

	function auto(){
		if (iNow == aLi.length-1) {
			iNow = 0;
		}else{
			iNow++;
		}
		for (var i = 0; i < aLi.length; i++) {
			Leo.ui.fadeOut( aLi[i] );
		}
		Leo.ui.fadeIn( aLi[iNow] );

	}
	function autoPrev(){
		if (iNow == 0) {
			iNow = aLi.length-1;
		}else{
			iNow--;
		}
		for (var i = 0; i < aLi.length; i++) {
			Leo.ui.fadeOut( aLi[i] );
		}
		Leo.ui.fadeIn( aLi[iNow] );

	}

	oPrevBg.onmouseover = oPrev.onmouseover = function(){
		oPrev.style.display = 'block';
		clearInterval( timer );
	}
	oNextBg.onmouseover = oNext.onmouseover = function(){
		oNext.style.display = 'block';
		timer = clearInterval( timer );
	}
	oPrevBg.onmouseout = oPrev.onmouseout = function(){
		oPrev.style.display = 'none';
		timer = setInterval(auto,3000);
	}
	oNextBg.onmouseout = oNext.onmouseout = function(){
		oNext.style.display = 'none';
		timer = setInterval(auto,3000);
	}

	oPrev.onclick = function(){
		autoPrev();
	}
	oNext.onclick = function(){
		auto();
	}

}
Leo.app.toSel = function(){
	var oSel = document.getElementById('sel');
	var aBtn = oSel.getElementsByTagName('a');
	var aUl = oSel.getElementsByTagName('ul');
	var aH2 = oSel.getElementsByTagName('h2');

	for (var i = 0; i < aBtn.length; i++) {
		aBtn[i].index = i;
		aBtn[i].onclick = function(ev){
			var ev = ev || window.event;
			var This = this;
			for (var i = 0; i < aUl.length; i++) {
				aUl[i].style.display = 'none';
			}

			aUl[this.index].style.display = 'block';
			document.onclick = function(){
				aUl[This.index].style.display = 'none';
			}
			ev.cancelBubble = true;

			(function(aUl){

				var aLi = aUl[This.index].getElementsByTagName('li');
				for (var i = 0; i < aLi.length; i++) {
					aLi[i].onmouseover = function(){
						for (var i = 0; i < aLi.length; i++) {
							aLi[i].className = '';
						}
						this.className = 'active';
					}
					aLi[i].onclick = function(){
						aH2[This.index].innerHTML = this.innerHTML;

					}
				}

			})(aUl);

		}
	}

}
Leo.app.toRun = function(){
	var oRun = document.getElementById('run');
	var oPrev = Leo.tools.getByClass(oRun,'list_btn_L')[0];
	var oNext = Leo.tools.getByClass(oRun,'list_btn_R')[0];
	var oUl = oRun.getElementsByTagName('ul')[0];
	var aLi = oRun.getElementsByTagName('li');

	oUl.innerHTML += oUl.innerHTML;
	oUl.style.width = aLi[0].offsetWidth * aLi.length + 'px';
	var iNow = 0;
	oPrev.onclick = function(){
		//alert(123);
		if (iNow == 0) {
			iNow = aLi.length/2;
			oUl.style.left = -oUl.offsetWidth/2 + 'px';
		}
		Leo.ui.scrollLeft( oUl, -iNow*aLi[0].offsetWidth, -(iNow-1)*aLi[0].offsetWidth );
		iNow--;
	}
	oNext.onclick = function(){
		//alert(123);
		if (iNow == aLi.length/2) {
			iNow = 0;
			oUl.style.left = 0;
		}
		Leo.ui.scrollLeft( oUl, -iNow*aLi[0].offsetWidth, -(iNow+1)*aLi[0].offsetWidth );
		iNow++;
	}
}


/*这里是面向对象的produce列表*/
var dataProducts ={
					imgSrc:['images/main_list/1.gif','images/main_list/2.gif','images/main_list/3.gif','images/main_list/4.gif','images/main_list/5.gif','images/main_list/6.gif','images/main_list/7.gif','images/main_list/8.gif','images/main_list/9.gif','images/main_list/10.gif','images/main_list/11.gif','images/main_list/12.gif'],
					name:['Product Name1','Product Name2','Product Name3','Product Name4','Product Name5','Product Name6','Product Name7','Product Name8','Product Name9','Product Name10','Product Name11','Product Name12'],
					price:['$12.90','$12.92','$12.95','$12.94','$12.90','$12.93','$12.96','$12.98','$12.99','$12.92','$12.94','$12.97']

				};


function Product(option){
	this._init(option);
}

Product.prototype = {
	constructor:Product,
	_init:function(option){
		this.name = option.name;
		this.imgSrc = option.imgSrc;
		this.price = option.price;
	},
	bindDOM:function(){
		var str = '<li>\
	                      <p><a href="#"><img src="'+this.imgSrc+'" alt=""></a></p>\
	                      <p class="name">'+this.name+'</p>\
	                      <p>Price: <span>'+this.price+'</span></p>\
	              </li>';
	    return str;
	}
}

