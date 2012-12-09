$(document).ready(function(e) {

// устанавливаем размеры контента и меню
	var wh = document.height-100;
	var ww = document.width-100;
	var col_w = ww/2;

	$('#content').css({
		'width':ww,
		'height':wh,
		'-webkit-column-width:':col_w,
		'-moz-column-width:':col_w,
		'column-width:':col_w
	});
	$('#menu').css({
		'width':ww,
		'height':wh,
		'-webkit-column-width:':col_w,
		'-moz-column-width:':col_w,
		'column-width:':col_w
	});


// вешаем обработчик на клик для переключения между контентом и меню
	$('#showmenu').toggle(
		function(e) {
			$('#menu').toggle("slide", {direction: "left"}, 300);
			e.stopImmediatePropagation();
    		$(this).text('< menu');
    		return false;
		}, 
		function(e) {
    		$('#menu').toggle("slide", {direction: "left"}, 300);
			e.stopImmediatePropagation();
    		$(this).text('> menu');
    		return false;
		}
	);

// вешаем обработчик скролла мыши
    if (window.addEventListener) window.addEventListener("DOMMouseScroll", mouse_wheel, false);
    window.onmousewheel = document.onmousewheel = mouse_wheel;

// собственно сам обработчик прокрутки мыши
	function mouse_wheel (e) {
		// тут обрабатывай событие прокрутки колеса мыши.

	    var direction = ((e.wheelDelta) ? e.wheelDelta/120 : e.detail/-3) || false;
	    
	    $('#content').stop(true,true,true).animate({ scrollLeft : $('#content').scrollLeft()-direction*(col_w+26) },250);

		// собственно само событие, для ИЕ берем из window
		e = e || window.event;

		// Предотвращаем дальнейшее всплытие события
		if (e.stopPropagation) e.stopPropagation();
		else e.cancelBubble = true;

		// Отменяем действие по умолчанию для события
		if (e.preventDefault) e.preventDefault();
		else e.returnValue = false;		
	};

	$(document).keydown(function(e){
		if(e.keyCode ==39){
			var direction = -1;
		} else if (e.keyCode == 37) {
			var direction = 1;
		}
		$('#content').stop(true,true,true).animate({ scrollLeft : $('#content').scrollLeft()-direction*(col_w+26) },250);

		// Предотвращаем дальнейшее всплытие события
		if (e.stopPropagation) e.stopPropagation();
		else e.cancelBubble = true;

		// Отменяем действие по умолчанию для события
		if (e.preventDefault) e.preventDefault();
		else e.returnValue = false;		
	});



});

