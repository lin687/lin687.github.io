$(function(){
	var lis = $(".head-ul li");      //下拉列表部分；
	var timer = null;
	lis.each(function(i,ele){
		$(ele).on("mouseenter",function(){
			clearTimeout(timer);
			$(".select").stop().slideUp();
			$(lis).removeClass('headulActive');
			$(this).addClass('headulActive');
			$(".select").eq(i).stop().slideDown();
		})
		$(ele).on("mouseleave",function(){
			var that = this;
			timer = setTimeout(function(){
				$(that).removeClass('headulActive');
				$(".select").eq(i).stop().slideUp();
			
			},300)
		})
		$(".select").eq(i).on("mouseenter",function(){
			clearTimeout(timer);
		})
		$(".select").eq(i).on("mouseleave",function(){
			var that = this;
			timer = setTimeout(function(){
				$(lis).eq(i).removeClass('headulActive');
				$(that).stop().slideUp();
				
			},300)
		})
	})
	var list =$(".select li");				//下拉列表 尖括号部分；
	var spans = $(".select li span");
	
	$(list).each(function(i,ele){
		$(ele).on("mouseenter",function(){
			$(spans).eq(i).show();
		})
		$(ele).on("mouseleave",function(){
			$(spans).eq(i).hide();
		})
	})
	
	var arrimg = ["img/bg_00.png","img/bg_01.png","img/bg_03.png"];			//轮播图部分
	var num = 0;
	var imgs = $(".lun-img li img")
	var iW = imgs.eq(0).width();
	var as = $("nav a");
	var timer2 = null;
	
	var obj = [
		{
			"h1":"CREATE TOP AGENCY",
			"h2":"WE ONLY DO TRAVEL",
			"p1":"Sanya(Sandy) located in the southernmost part of Hainan Isiand,is the most",
			"p2":"Sanya(Sandy) located in the southernmost part of Hainan Isiand,is the most Hainan Isiand,is the most",
			"btn":"GET IN TOUCH",
			"didian":"Sanya",
			"zdwd":"25",
			"zgwd":"30"
		},
		{
			"h1":"Elephantidae",
			"h2":"WE ONLY DO TRAVEL",
			"p1":"nanfei(nanfei) located in the Republic of South Africa",
			"p2":"nanfei(nanfei) located in the Republic of South Africa",
			"btn":"GET IN TOUCH",
			"didian":"Nanfei",
			"zdwd":"12",
			"zgwd":"40"
		},
		{
			"h1":"dark",
			"h2":"WE ONLY DO TRAVEL",
			"p1":"nanjing(nanjing) located in the southernmost part of jiangsu,is the most",
			"p2":"nanjing(nanjing) located in the southernmost part of jiangsu",
			"btn":"GET IN TOUCH",
			"didian":"nanji",
			"zdwd":"7",
			"zgwd":"25"
		},
	];
	
	
	
	$(".right").on("click",function(){
		fn();
		fm();
	})
	$(".left").on("click",function(){
		imgs.eq(0).attr("src",arrimg[num-1]);
		imgs.eq(1).attr("src",arrimg[num]);
		num--;
		if(num<0){
			imgs.eq(0).attr("src",arrimg[arrimg.length-1]);
			imgs.eq(1).attr("src",arrimg[0]);
			num=arrimg.length-1;
		}
		$(".lun-img").css({
			left:-iW
		})
		$(".lun-img").stop().animate({
			left:0
		})
		as.eq(num).addClass('active').siblings('a').removeClass('active');
		fm();
	})
	
	as.each(function(i,ele){
		$(ele).on('click',function(){
			if($(this).index() == num){
				return false;
			}
			if($(this).index() > num){
				imgs.eq(0).attr("src",arrimg[num]);
				imgs.eq(1).attr("src",arrimg[$(this).index()]);
				$(".lun-img").css({
					left:0
				})
				$(".lun-img").stop().animate({
					left:-iW
				})
				num = $(this).index();
				as.eq(num).addClass('active').siblings('a').removeClass('active');
			}else{
				imgs.eq(0).attr("src",arrimg[$(this).index()]);
				imgs.eq(1).attr("src",arrimg[num]);
				$(".lun-img").css({
					left:-iW
				})
				$(".lun-img").stop().animate({
					left:0
				})
				num = $(this).index();
				as.eq(num).addClass('active').siblings('a').removeClass('active');
			}
			fm();
		})
	})
	
	timer2 = setInterval(function(){
		fn();
		fm();
	},2000)
	
	$(".lun").on('mouseenter',function(){
		clearInterval(timer2);
		$(".left").show();
		$(".right").show();
	})
	$(".lun").on('mouseleave',function(){
		timer2 = setInterval(function(){
			fn();
			fm();
		},2000);
		$('.left').hide();
		$(".right").hide();
	})
	function fn(){
		num++;
		imgs.eq(0).attr("src",arrimg[num-1]);
		imgs.eq(1).attr("src",arrimg[num]);
		if(num>arrimg.length-1){
			imgs.eq(0).attr("src",arrimg[arrimg.length-1]);
			imgs.eq(1).attr("src",arrimg[0]);
			num=0;
		}
		$(".lun-img").css({
			left:0
		})
		$(".lun-img").stop().animate({
			left:-iW
		})
		as.eq(num).addClass('active').siblings('a').removeClass('active');
	}
	function fm(){
		var attr = obj[num];
		for(var i in attr){
			$(".lun-h-a").html(attr["h1"]);
			$(".lun-h-b").html(attr["h2"]);
			$(".lun-p-a").html(attr["p1"]);
			$(".lun-p-b").html(attr["p2"]);
			$(".lun-span").html(attr["btn"]);
			$(".didian").html(attr["didian"]);
			$(".wendu a").eq(0).html(attr["zdwd"]);
			$(".wendu a").eq(1).html(attr["zgwd"]);
		}
	}
	
	
	var modiv = $(".conterTop-img-div");
	var bgbwte = $(".conterTop-span");
	var mo = $(".conterTop-mo");
	
	modiv.each(function(i,ele){
		$(ele).on("mouseenter",function(){
			mo.hide();
			bgbwte.removeClass('active2');
			mo.eq(i).stop().slideDown();
			bgbwte.eq(i).addClass('active2');
		})
		$(ele).on("mouseleave",function(){
			mo.hide();
			bgbwte.removeClass('active2');
		})
	})
//	$(".blur").focus(function(){
//		$(".blur").removeClass('border');
//		$(this).addClass('border');
//	})
	
})