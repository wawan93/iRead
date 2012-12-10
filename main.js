$(document).ready(function(e) {
// выносим в отдельную функцию, т.к. часто используется
	function prev_def (e) {
		// Предотвращаем дальнейшее всплытие события
		if (e.stopPropagation) e.stopPropagation();
		else e.cancelBubble = true;

		// Отменяем действие по умолчанию для события
		if (e.preventDefault) e.preventDefault();
		else e.returnValue = false;		
	}

	$.ajaxSetup({cache: true});
	$.getScript("menu.js");
	$.getScript("scroll.js");
	$.getScript("set_proportions.js");
	$.getScript("ajax.js");

});

