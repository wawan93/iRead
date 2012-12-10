
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

