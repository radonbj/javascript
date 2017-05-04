/* 
     * +++++++++++++++++++++++++++++++++++++++++++++
     *  loadRes (load Resources) Component 
     *  version 1.0
     *  author gtshen
     *  date 2016/8/27
     *  bug feedback 903050269 (QQ)
     * +++++++++++++++++++++++++++++++++++++++++++++
     */

(function(root){
    'use strict';
    function loadRes(params){

        this.fn = params.fn || null;  
        this.filter = params.filter || 'img';  // Filter 
        this.oImgs = document.images;
        this.imgs = [];
        this.count = 0;
        this.curr = 0;
        this.read();

    }

    loadRes.prototype.read=function(){

        var _this = this;

        var loadImgs = function(){

            var imgReg = /url\(\"?(.*[\.jpg|\.png|\.bmp|\.jpeg])\"?\)/,
                allElement = document.getElementsByTagName('*');

            for(var i =0,l=allElement.length;i<l;i++){
                _this.oImgs[i] && _this.imgs.push(_this.oImgs[i].src);

                var style  = (window.getComputedStyle)?getComputedStyle(allElement[i],null)['backgroundImage'] : allElement[i].currentStyle['backgroundImage'];
                
                if(imgReg.test(style)){
                    _this.imgs.push(RegExp.$1);
                }
            }
            _this.count+=_this.imgs.length;
            
            for(var i = 0,l=_this.imgs.length;i<l;i++){
                var img = new Image();
                img.src = _this.imgs[i];
                if(img.complete){
                    _this.fn && _this.fn(_this.count,++_this.curr);
                }else{
                    img.onload = function(){
                        if(!this.isloaded){
                            this.isloaded = true;
                            _this.fn && _this.fn(_this.count,++_this.curr);
                        }
					this.onload = null;
                    };
                    img.onreadystatechange=function(){
                        if(_this.readyState == 'loaded' || _this.readyState == 'complete' && !this.isloaded){
                            this.isloaded = true;
                            _this.fn && _this.fn(_this.count,++_this.curr);
                        }
                    };
                    img.onerror=img.onabort=function(){
                        _this.onerror=_this.onabort=null;
                        _this.fn && _this.fn(_this.count,++_this.curr);
                    };
                }
            }

        }();


    };
    root.loadRes = function(params){
        new loadRes(params);
    };
})(window);


