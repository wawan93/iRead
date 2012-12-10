
// вешаем обработчик скролла мыши
    if (window.addEventListener) window.addEventListener("DOMMouseScroll", mouse_wheel, false);
    window.onmousewheel = document.onmousewheel = mouse_wheel;

// собственно сам обработчик прокрутки мыши
	function mouse_wheel (e) {
		// тут обрабатывай событие прокрутки колеса мыши.

	    var direction = ((e.wheelDelta) ? e.wheelDelta/120 : e.detail/-3) || false;
	    
	    $('#content').stop(true,true,true).animate({ scrollLeft : $('#content').scrollLeft()-direction*(c+26) },250);

		// собственно само событие, для ИЕ берем из window
		e = e || window.event;

		prev_def(e);
	};

	$(document).keydown(function(e){
		if((e.keyCode == 39) || (e.keyCode == 40)){
			var direction = -1;
		} else if ((e.keyCode == 37) || (e.keyCode == 38)) {
			var direction = 1;
		} else {return;}
			$('#content').stop(true,true,true).animate({ scrollLeft : $('#content').scrollLeft()-direction*(c+26) },250);
			prev_def(e);
	});