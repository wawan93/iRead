 (function(){
// устанавливаем размеры контента и меню
	var wh = document.height-100;
	var ww = document.width-100;
	if (ww % 2 != 0) {ww--;}
	var col_w = ww/2;
	
	$('#content').css({
		'height':wh,
		'max-height':wh,
		'-moz-column-width':col_w
	});
	$('#menu').css({
		'width':ww,
		'height':wh,
	});
	$('img').css({
		'max-height':wh,
		'max-width':col_w,
		'height':wh
	});
	$('code').css({
		'max-width':col_w,
		'width':col_w
	});
	$('pre').css({
		'max-width':col_w,
		'width':col_w
	});
	$('table td').css('max-width',col_w);
	$('table').css('width',col_w);

 })();