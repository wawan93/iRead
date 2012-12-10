
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