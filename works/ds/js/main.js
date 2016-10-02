// JavaScript Document

$(function(){
	//切换搜索框
	(function(){
		var aLi = $('#menu li');
		var arrText = [
						'例如：荷棠鱼坊烧鱼 或 樱花日本料理',
						'例如：昌平区育新站龙旗广场2号楼609室',
						'例如：万达影院双人情侣券',
						'例如：东莞出事了，大老虎是谁？',
						'例如：北京初春降雪，天气变幻莫测'
					  ];
		var iNow = 0;
		var oText = $('#searchText').find('.search_text');
		oText.val(arrText[iNow]);
		aLi.each(function(index){
			$(this).click(function(){
				aLi.attr('class','gradient');
				$(this).attr('class','active');
				iNow = index;
				oText.val(arrText[iNow]);
			});
		});
		oText.focus(function(){
			if( $(this).val() == arrText[iNow] ){
				$(this).val('');
			}	
		});
		oText.blur(function(){
			if( $(this).val() == '' ){
				$(this).val(arrText[iNow]);
			}	
			
		});
	})();
	//update文字弹动
	(function(){
		var oUpdate = $('#update');
		var oUl = oUpdate.find('ul');
		var iH = null;
		var arrData = [
							{ 'name':'angular', 'time':1, 'title':'那些灿烂华美的瞬间'},
							{ 'name':'创', 'time':2, 'title':'广东3天抓获涉黄疑犯'},
							{ 'name':'Chuang', 'time':3, 'title':'国台办回应王郁琦'},
							{ 'name':'LeoLeo', 'time':4, 'title':'那些灿烂华美的瞬间'},
							{ 'name':'幢幢', 'time':5, 'title':'那些灿烂华美的瞬间'},
							{ 'name':'畅畅', 'time':6, 'title':'广东3天抓获涉黄疑犯'},
							{ 'name':'大床', 'time':7, 'title':'国台办回应王郁琦'},
							{ 'name':'窗窗', 'time':8, 'title':'那些灿烂华美的瞬间'}
					  ]
		var str = '';
		var oPrev = $('#prev');
		var oNext = $('#next');
		var iNow = 0;
		var timer = null;
		for(var i=0; i<arrData.length; i++){
			str += '<li><strong><a href="#">'+arrData[i].name+'</a></strong><span>'+arrData[i].time+'分钟前</span><a href="#">写了一篇新文章：'+arrData[i].title+'</a></li>';
		}
		oUl.html( str );
		iH = oUl.find('li').height();
		//console.log( iH );
		oPrev.click(function(){
			doMove(-1);
		});
		oNext.click(function(){
			doMove(1);
		});
		
		autoPlay();
		
		oUpdate.hover(function(){
			clearInterval(timer);	
		},function(){
			autoPlay();	
		});
		
		function autoPlay(){
			timer = setInterval(function(){
				doMove(-1);	
			},2000);	
		}
		function doMove( num ){
			iNow += num;
			if( Math.abs(iNow) > arrData.length-1 ){
				iNow = 0;
			}
			if(iNow > 0){
				iNow = -(arrData.length-1);
			}
			oUl.stop().animate({ 'top':iH*iNow },1000);	
		}
	})();
	// options 按钮切换
	(function(){
		
		fnTab($('.toTab1'), $('.toCon1'), 'click');
		fnTab($('.toTab2'), $('.toCon2'), 'click');
		fnTab($('.toTab3'), $('.toCon3'), 'mouseover');
		fnTab($('.toTab4'), $('.toCon4'), 'mouseover');
		
		function fnTab(TabNav, TabCon, Events){
			var aElen = TabNav.children();
			var oA = aElen.find('a');
			TabCon.hide().eq(0).show();
			aElen.each(function(index){
				$(this).on(Events, function(){
					aElen.removeClass('active').addClass('gradient');
					$(this).removeClass('gradient').addClass('active');
					oA.attr('class','triangle_down_grey');
					$(this).find(oA).attr('class','triangle_down_red');
					TabCon.hide().eq(index).css('display','block');
				});	
			});
		}	
	})();
	//pic 精彩推荐图片的淡入淡出
	(function(){
		var oPic = $('#pic');
		var aUlLi = oPic.find('ul li');
		var aOlLi = oPic.find('ol li');
		var oP = oPic.find('p');
		var arr = ['爸爸去哪儿~~','清纯小美眉，漂亮动人！！','性感火爆，女人中的女人~~']
		var iNow = 0;
		var timer = null;
		
		fnFade();
		autoPlay();
		
		aOlLi.each(function(index) {
            $(this).click(function(){
				iNow = index;
				fnFade();
			});
        });
		oPic.hover(function(){
			clearInterval(timer);	
		},function(){
			autoPlay(); 	
		});
		function fnFade(){
			aUlLi.each(function(i) {
                if(i != iNow){
					aUlLi.eq(i).fadeOut().css('ZIndex','1');
					aOlLi.eq(i).removeClass('active');
				}else{
					aUlLi.eq(iNow).fadeIn().css('ZIndex','2');
					aOlLi.eq(iNow).addClass('active');
				}
				oP.text(arr[iNow]);
            });	
		}
		function autoPlay(){
			timer = setInterval(function(){
				iNow++;
				iNow %= arr.length;
				fnFade();
			},3000);	
		}
		
	})();
	// 日历提示
	(function(){
		var oDiv = $('.calendar');
		var aLi = oDiv.find('ol li');
		var oImg  = $('.calendar li img');
		var oInfo = $('.future_info');
		var aSpan = $('.calendar h3 span');
		var aImg = oInfo.find('img');
		var oStrong = oInfo.find('strong');
		var oP = oInfo.find('p');
		
		oImg.hover(function(){
			var iT = $(this).parent().position().top - 30;
			var iL = $(this).parent().position().left + 55;
			var index = $(this).parent().index()%aSpan.size();
			
			//console.log( index );
			
			$(this).parent().addClass('active');
			oInfo.show().css({ 'top':iT, 'left':iL });
			oP.text( $(this).attr('info') );
			aImg.attr('src', $(this).attr('src'));
			oStrong.text(aSpan.eq(index).text());
		},function(){
			$(this).parent().removeClass('active');
			oInfo.hide();
		});	
	})();
	//BBS论坛
	(function(){
		var aLi = $('.bbs li');
		aLi.mouseover(function(){
			aLi.removeClass('active').eq($(this).index()).addClass('active');
		});
	})();
	//搜索谁知道
	(function(){
		var oText = $('#search_know .text');
		oText.focus(function(){
			if( $(this).val() == '输入关键字' ){
				$(this).val('');
			}	
		});
		oText.blur(function(){
			if( $(this).val() == '' ){
				$(this).val('输入关键字');
			}	
		});
	})();
	//HOT红人烧客
	(function(){
		var arr = [
				'',
				'用户名：1<br/>人气：124',
				'用户名：性感宝贝<br/>区域：朝阳CBD<br/>人气：124987',
				'用户名：3<br/>人气：987',
				'用户名：4<br/>人气：4987',
				'用户名：5<br/>人气：1987',
				'用户名：6<br/>人气：1247',
				'用户名：7<br/>人气：187',
				'用户名：8<br/>人气：1287',
				'用户名：9<br/>人气：1287',
				'用户名：10<br/>人气：1287'
			];
		var aLi = $('#area li');
		aLi.mouseover(function(){
			if($(this).index() == 0) return false;
			$('#area p').remove();
			$(this).append('<p style="width:'+( $(this).width()-12 )+'px; height:'+( $(this).height()-6 )+'px;">'+ arr[$(this).index()] +'</p>');
		});/**/
	})();
});