 (function(){
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
			var name = $('#filename').val().replace(/^.*[\/\\]/g, '');
			if (location.hash != '') {name = location.hash;}
			if ($.cookie(name)>0) {$('#content').scrollLeft($.cookie(name));}
			else {$('#content').scrollLeft(0)};
			$('pre code').each(function(i, e) {hljs.highlightBlock(e)});
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
 })();