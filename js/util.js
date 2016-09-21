window.utils = {};
//判断当前触摸屏的位置
window.utils.caputerTouch = function(element) {
    var touch = {x:null, y:null, isPressed:false, event:null},
        body_scrollLeft = document.body.scrollLeft,
        element_scrollLeft = document.documentElement.scrollLeft,
        body_scrollTop = document.body.scrollTop,
        element_scrollTop = document.documentElement.scrollTop,
        offsetLeft = element.offsetLeft,
        offsetTop = element.offsetTop;

    element.addEventListener('touchstart', function(event) {
        touch.isPressed = true;
        touch.event = event;
    }, false);

    element.addEventListener('touchend', function(event) {
        touch.isPressed = flase;
        touch.x = null;
        touch.y = null;
        touch.event = event;
    }, false);

    element.addEventListener('touchmove', function(event) {
        var x,y,
            touch_event = event.touches[0];

        if (touch_event.pageX || touch_event.pageY) {
            x = touch_event.pageX;
            y = touch_event.pageY;
        } else {
            x = touch_event.clientX + body_scrollLeft + element_scrollLeft;
            y = touch_event.clientY + body_scrollTop + element_scrollTop;
        }

        x -= offsetLeft;
        y -= offsetTop;

        touch.x = x;
        touch.y = y;
        touch.event = event;
    }, false);
    return touch;
};

//获取当前鼠标的位置
window.utils.caputerMouse = function(element) {
    var mouse = {x:0, y:0, event:null},
        body_scrollLeft = document.body.scrollLeft,
        element_scrollLeft = document.documentElement.scrollLeft,
        body_scrollTop = document.body.scrollTop,
        element_scrollTop = document.documentElement.scrollTop,
        offsetLeft = element.offsetLeft,
        offsetTop = element.offsetTop;

    element.addEventListener('mousemove', function(event) {
        var x,y;

        if (event.pageX || event.pageY) {
            x = event.pageX;
            y = event.pageY;
        } else {//相对于文档的位置
            x = event.clientX + body_scrollLeft + element_scrollLeft;
            y = event.clientY + body_scrollTop + element_scrollTop;
        }
        x -= offsetLeft;
        y -= offsetTop;

        mouse.x = x;
        mouse.y = y;
        mouse.event = event;
    }, false);
    return mouse;
};

window.utils.intersects = function(mouse, obj) {
    var dis = Math.sqrt((mouse.x - obj.x)*(mouse.x - obj.x) + (mouse.y - obj.y)*(mouse.y - obj.y));
    return dis < obj.radius ? true : false;
};