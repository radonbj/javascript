// 检测键盘弹起的一系列状态
var changeKeyboard = (function(window) {
    var clearMonitor, monitorWindowHeight, containerId, btnGroupId,
        isFocus = false,
        blurHandle, init, winHeight = window.innerHeight;

    // input获取焦点, 检测可视化高度
    init = function( target ) {

        if ( target.dataset.code !== "key" ) return;
        btnGroupId = $( "#homeMoreBtn" );
        btnGroupId.addClass( "hide" );

        setTimeout(function() {
            var newTop = 0;
            !isFocus && monitorWindowHeight();
            isFocus = true;

            containerId = document.querySelector( "#container" );
            if ( !containerId ) return;
            containerId.style.height = window.innerHeight + "px";
            newTop = target.getBoundingClientRect().top + containerId.scrollTop;
            containerId.scrollTop = newTop - window.innerHeight + 40;
        }, 500 );
    };

    // 让当前获取焦点的元素失焦
    blurHandle = function() {
        var el = document.activeElement;
        $( el ).blur();
    };

    // 监听window高度的变化
    monitorWindowHeight = function() {
        clearMonitor = setInterval(function() {
            var heightStr, wh = window.innerHeight;
            if ( winHeight == wh ) {
                heightStr = ( tools.h - 50 ) + "px";
                btnGroupId && btnGroupId.removeClass( "hide" );
                clearInterval( clearMonitor );
                blurHandle();
                isFocus = false;
            } else {
                heightStr = wh + "px";
            }
            containerId && ( containerId.style.height = heightStr );
        }, 500);
    };

    return {
        blurHandle: blurHandle,
        init: init
    }
})(window);


// 监听touchstart事件, 判断来源是否input, 做对应的处理
var blurOut = 0;
$( "body" ).on( "tap", function( e ) {

    if ( e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" ) {
        App.IS_ANDROID && changeKeyboard.init( e.target );
        blurOut && clearTimeout( blurOut );
    } else {
        changeKeyboard.blurHandle();
    }

});