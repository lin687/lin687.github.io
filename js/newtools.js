// JavaScript Document
var Tween = {
	linear: function (t, b, c, d){
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};
//callBack 回调函数，动画结束之后，执行的函数
function move(obj,attr,time,target,type,back)
{
	var t = 0;
	var b =  css(obj,attr);
	var c =  target - b;
	var d = time / 20;           
	 clearInterval(obj.timer);
	 obj.timer = setInterval(  
	 	function (){
			t++;
			var nub = Tween[type](t,b,c,d);
			if(attr == "opacity"){
				obj.style[attr] = nub/100;
				obj.style.filter ="alpha(opacity="+ nub +")";
			} else {
				obj.style[attr] = nub + "px";
			}
			 if(attr=="ZIndex"){
					obj.style[attr]= nub;
				}
			
			if(t >= d){
				clearInterval(obj.timer);
				if(back){
					back();
				}
				
			}
		},
		20
	 );
}
function mTween(init){
	var obj = init["element"];
	var type = init["type"] ;
	var time = init["time"] ;
	var target = init["target"];
	var callBack = init["callBack"];
	var t = 0;
	var b = {};
	var c = {};
	var d = time / 20;
	for(var s in target){          //用for in 循环里边的对象；
		b[s] = css(obj,s);
		c[s] = target[s] - b[s];   
	}
	 clearInterval(obj.timer);      
	 obj.timer = setInterval(       
	 	function (){ 
			t++;
			for(var s in b){
				var nub = Tween[type](t,b[s],c[s],d);
				if(s == "opacity"){
					obj.style[s] = nub/100;
					obj.style.filter ="alpha(opacity="+ nub +")";
				} else {
					obj.style[s] = nub + "px";
				}
				if(s=="ZIndex"){
					obj.style[s]= nub;
				}
				
			}
			if(t >= d){
				clearInterval(obj.timer);
				if(callBack){
					callBack();
				}
			}
		},
		20
	 );
}
function css(obj,attr){
	var nub = 0;
	if(obj.currentStyle){
		nub = parseFloat(obj.currentStyle[attr]);
	} else { 
		nub = parseFloat(getComputedStyle(obj)[attr]);
	}
	if(attr == "opacity"){
		return Math.round(nub*100);
	}
	return nub;
}
function $(ele,parent){
	var oTa = ele.substring(0,1);   //取字符串的第一个字符
	var parent = parent || document;
	var arr = [];                   //定义一个空数组
	var all = parent.getElementsByTagName("*");    //获取所有的元素
	if(oTa == "#"){
		var id = ele.substring(1);
		return parent.getElementById(id);
	}else if(oTa == "."){                  // 判断参数是否是className
		var cla = ele.substring(1);        // 获取实参的值
		if(document.getElementsByClassName == undefined){   //是否是IE浏览器
			for(var i=0;i<all.length;i++){       //  循环所有的元素
				if(all[i].className != ""){      //  排除没有className值的元素
					var s = all[i].className.split(" ");
					for(var j=0;j<s.length;j++){  
						if(cla == s[j]){       
							arr.push(all[i]);    
							console.log(all[i]);   
						}   
					}
				}
			}
			return arr;		
		}else{
			return parent.getElementsByClassName(cla);  //谷歌浏览器兼容的
		}	
	}else{
		return parent.getElementsByTagName(ele);
	}
}
function addEvent(obj,en,fn){   //事件兼容
			if(obj.addEventListener){    //如果适合谷歌浏览器
				obj.addEventListener(en,fn,false)
			}else{  //否则适合IE浏览器
				obj.attachEvent('on'+en,function(){
					fn.call(obj);
				});
				
			}
		}

function addWheel(obj,fnUP,fnDown){   //滚轮事件兼容
	var liu = window.navigator.userAgent.toLowerCase();
	if(liu.indexOf('firefox') == -1){
		obj.onmousewheel = fn;
	}else{ //走火狐
		obj.addEventListener('DOMMouseScroll',fn);
	}
	function fn(ev){
		var ev = ev||window.event;
		var down = true;
		if(ev.wheelDelta){  //滚轮方向兼容
			down = ev.wheelDelta>0?true:false;   //判断是否向上滑动
		}else{
			down = ev.detail<0?true:false;  //走火狐
		}
		if(down){						
			if(typeof fnUP == 'function'){
				fnUP();
			}
		}else{
			if(typeof fnDown == 'function'){
				fnDown();
			}
		}
	}
}