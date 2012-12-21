$(document).ready(function(e) {

hljs.initHighlightingOnLoad();
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

	$('#menu a').click(function (e) {

		location.hash = this.href;
		$('#showmenu').click();

		prev_def(e);
		return false;
	});


	$('#content a').live('click', function (e) {
	 	location.hash = this.href;	 	
		prev_def(e);
		return false;
	});

// устанавливаем размеры контента и меню
	var wh = document.height-100;
	var ww = document.width-100;
	if (ww % 2 != 0) {ww--;}
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
      	location.hash = $('#form input:first').val();
		$('#showmenu').click();
        prev_def(e);
        return false;
    }); 

});

