window.onload = function(){
	var banner = $('.banner')[0];
	var imgs =$('img',banner);
	var tiao =$('.tiao')[0];
	var lis3 =$('li',tiao);	
	var timer =0;
	var num=0;
	var arrImg=["img/banner1.jpg","img/banner2.jpg","img/banner3.jpg","img/banner4.jpg"];
	timer= setInterval(function(){    //轮播图
		num++;
		if(num>arrImg.length-1){
	   		num=0;
		}
		fn();
		imgs[0].src = arrImg[num%arrImg.length];	
	},3000)
	for(var i=0;i<lis3.length;i++){	 //每一个轮播都会出现样式。
    	lis3[i].index=i;
    	lis3[i].onmouseover = function(){ //鼠标移到哪一个，哪一个就会出现样式。				    	
	    	clearInterval(timer);
	    	num = this.index;
	    	fn();
			imgs[0].src = arrImg[this.index];  
        }
    	lis3[i].onmouseout = function(){ 
			timer= setInterval(function(){    //轮播图
				num++;
				if(num>arrImg.length-1){
			   		num=0;
				}
				fn();
				imgs[0].src = arrImg[num%arrImg.length];
			},3000)
		}	
	}	
	function fn(){
	    for(var i=0;i<lis3.length;i++){	 //轮播图下的横条
    		lis3[i].style.background="";	
           }
	    	lis3[num].style.background="#3EB9F2";
	   }
//导航下的样式变化	
	var ul1 = $('.ul1')[0];
	var li = $('li',ul1);
	var right = $('#right'); //获取右边产品所在元素
	var ul2 = $('.ul2')[0];
	var timer1 =0;
	var lis2= $('li',ul2);
	var bg =$('.bg')[0];
	right.onmouseenter = function(){  //鼠标移到上面产品下面的子导航出现
		clearTimeout(timer1);
		move(ul2,'left',300,865,'linear');
		move(bg,'left',300,865,'linear');	
		bg.style.display='block';
		ul2.style.display='block';
	}
	right.onmouseleave = function(){	//鼠标离开 子导航消失
		timer1 = setTimeout(function(){
		    move(ul2,'left',200,1100,'linear',function(){
		    	ul2.style.display='none';
		    })
		    move(bg,'left',200,1100,'linear',function(){	
				bg.style.display='none';
			});	
		},500)
	}
	for(var i=0;i<lis2.length;i++){   //子导航下的每一个样式
		lis2[i].onmouseenter = function(){
			clearTimeout(timer1);
			var span = this.firstElementChild;			
			 	span.style.display ='block';	
		}
		lis2[i].onmouseleave = function(){		
			this.firstElementChild.style.display ='none';
			timer1 = setTimeout(function(){
		    	move(ul2,'left',200,1100,'linear',function(){
		    		ul2.style.display='none';
		    	})
		    	move(bg,'left',200,1100,'linear',function(){	
					bg.style.display='none';
				});	
			},500)
		}
	}
	
	var top =$('.top')[0];
	var timer2 =0;
	top.onclick  = function(){             //设置点击回到顶部
		timer2 = setInterval(function(){   //
			var height = parseInt(window.pageYOffset);//滚动条高度
			var scroll = height-130;  //变量
			window.scrollTo(0,scroll); //设置滚动条x,y值
			if(!height){
				clearInterval(timer2);
			}
		},50)
	}
	window.onscroll = function(){		//页面滚动条改变触发事件
		var height = parseInt(window.pageYOffset);
		if(height){
			top.style.display = "block";
		}else{
			top.style.display = "none";
		}
		top.style.top = (580+height)+'px';
	}
	
//鼠标移入移出，图片上出现文字
	var tu = $('.tu')[0];
	var dl =$('.dl',tu);
	var timer3 =0;
	for(var i=0;i<dl.length;i++){
		dl[i].onmouseenter = function(){
			var dd =this.lastElementChild;
			var h3 = this.lastElementChild.firstElementChild;
			var span =h3.nextElementSibling;
			timer3=setTimeout(function(){
				dd.style.display='block';
				move(dd,'top',300,0,'bounceOut',function(){
					move(h3,'left',200,100,'linear');
					move(span,'left',200,60,'linear');
				});
			},100)
		}		
		dl[i].onmouseleave = function(){
			clearTimeout(timer3);
			var dd =this.lastElementChild;
			var h3 = this.lastElementChild.firstElementChild;
			var span =h3.nextElementSibling;
			move(dd,'top',300,-280,'linear',function(){
				move(h3,'left',200,-100,'linear');
				move(span,'left',200,300,'linear');
				dd.style.display='none';
			});
		}
	}
	//新闻图片旋转图
	var banner2 = $('.banner2')[0];
	var divs =$('div',banner2);
	var timer4 =0;
	var mn =0;
	console.log(divs);
	for(var i=0;i<divs.length;i++){
		divs[i].onmouseover = function(){
			var that =this;
			clearTimeout(timer4);
			mn++;
			if(mn>4){
				for( var i=0;i<divs.length;i++){
				divs[i].style.display='block';
				}	
				mn=0;
			}else{
				timer4 =setTimeout(function(){
					that.style.display ="none";	
				},1000)
			}
		}
		
	}
			    	
	

}
