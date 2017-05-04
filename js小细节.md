##onscroll事件兼容
先看下面的图，不看不知道，一看吓一跳，原来这小小东西还这么多内容。

![croll](https://github.com/radonbj/resource/blob/master/scroll.jpg?raw=true)

##类数组转数组
Array.prototype.slice.call()
[].slice.call()
Array.from()

##是否为数组
首推Array.isArray，但是兼容不够，所以就有了下面的

if (!Array.isArray) {

  Array.isArray = function(arg) {
  
    return Object.prototype.toString.call(arg) === '[object Array]';
    
  };
  
}

##是否为类数组

什么是类数组：拥有length属性，其它属性（索引）为非负整数(对象中的索引会被当做字符串来处理，这里你可以当做是个非负整数串来理解)，不具有数组所具有的方法。

function isArrayLike(o) {
    if (o &&                                // o is not null, undefined, etc.
        typeof o === 'object' &&            // o is an object
        isFinite(o.length) &&               // o.length is a finite number
        o.length >= 0 &&                    // o.length is non-negative
        o.length===Math.floor(o.length) &&  // o.length is an integer
        o.length < 4294967296)              // o.length < 2^32
        return true;                        // Then o is array-like
    else
        return false;                       // Otherwise it is not
}

##如何判断一个值为整数

首先需要知道js并没有严格意义上的整数，都是基于IEEE745的浮点数。

es6中可以用工具方法Number.isInteger()

es5：function isIntNumber(num){

  return typeof num == 'number' && num % 1 == 0;
  
}

##isNaN的bug
isNaN('foo')的返回值true，这是一个很明显的bug，在es6中Number.isNaN()修复了这个问题，而window.isNaN依旧。因此在不考虑低版本的时候就用Number.isNaN()，而在需要考虑低版本的时候可以用如下的方法：

function ifNaN(num){

  return typeof num == 'number' && isNaN(num);
  
}



##CSS事件
判断过渡(transition)执行完成
elem.on('transitionend',function(){//function});

判断动画(animation)执行开始，这里不会受animation-iteration-count的影响而有多次开始
elem.on('animationstart',function(){//function});

动画(animation)迭代，执行次数是animation-iteration-count的次数减1，默认值1时则不会执行
elem.on('animationiteration',function(){//function});

判断动画(animation)执行完成，这里的执行完成不是单次执行完成而是由animation-iteration-count的次数来确定
elem.on('animationend',function(){//function});





##认识setSelectionRange
mdn:https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement/setSelectionRange

setSelectionRange() 方法可以设置一个 < input />元素中的文本选中内容的起始位置和结束位置。语法inputElement.setSelectionRange(selectionStart, selectionEnd, selectionDirection)。

selectionStart：被选中的第一个字符的位置。

selectionEnd：被选中的最后一个字符的 下一个 位置。

selectionDirection (可选)：一个指明选择方向的字符串，有"forward","backward"和"none" 3个可选值, 分别表示"从前往后", "从后往前"和"选择方向未知或不重要"。

setSelectionRange在ie9以下不能用，以下是兼容的方法:
function range(elem){

	if(elem.setSelectionRange){
	
		elem.setSelectionRange(elem.value.length,elem.value.length);
		
		oT.focus();
		
	}else{
	
		var range=elem.createTextRange();
		
		range.collapse(false);  //选方向，从左往右
		
		range.moveStart('character',elem.value.length);	//开始位置
		
		range.moveEnd('character',elem.value.length);//结束位置
		
		range.select();
		
		elem.focus();	
		
		}
		
}