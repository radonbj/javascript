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