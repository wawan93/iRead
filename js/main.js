$(document).ready(function(e) {

	$.ajaxSetup({cache:true});

// выносим в отдельную функцию, т.к. часто используется
	function prev_def (e) {

		// Предотвращаем дальнейшее всплытие события
		if (e.stopPropagation) e.stopPropagation();
		else e.cancelBubble = true;

		// Отменяем действие по умолчанию для события
		if (e.preventDefault) e.preventDefault();
		else e.returnValue = false;
	}


// функция загрузки контента по AJAX
	function ajax_load (u) {
		$.ajax({
			'url':'get.php',
			data:{'url':u},
			beforeSend: function ( xhr ) {
				$('#content').html('<h1>LOADING...</h1><p>Please wait...</p>');
			}

		})
		.done(function ( data ) {
			$('#content').html(data);
			$('#content').scrollLeft(0);
		});
	}

	if (location.hash != '') {
		ajax_load(location.hash.replace(/^#/,''));
	} else {
		$('#showmenu').click();
	}

	$(window).bind('hashchange', function() {
		if (location.hash != '') {
			ajax_load(location.hash.replace(/^#/,''));
		}
	});

	$('#menu a').click(function (e) {

		location.hash = this.href;
		$('#showmenu').click();

		prev_def(e);
		return false;
	});


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

		prev_def(e);
	};

	$(document).keydown(function(e){
		if((e.keyCode == 39) || (e.keyCode == 40)){
			var direction = -1;
		} else if ((e.keyCode == 37) || (e.keyCode == 38)) {
			var direction = 1;
		} else {return;}
			$('#content').stop(true,true,true).animate({ scrollLeft : $('#content').scrollLeft()-direction*(col_w+25) },250);
			prev_def(e);
	});



// вешаем обработчик на клик для переключения между контентом и меню
	$('#showmenu').toggle(
		function(e) {
			$('#menu').toggle("slide", {direction: "left"}, 300);
    		$(this).text('< menu');
			prev_def(e);
		}, 
		function(e) {
    		$('#menu').toggle("slide", {direction: "left"}, 300);
    		$(this).text('> menu');
    		prev_def(e);
		}
	);

// обработчик формы
	$('#form').submit(function(e) { 
        $u = $('#form input:first').val();
		ajax_load($u);
		$('#showmenu').click();
        prev_def(e);
        return false;
    }); 

});

