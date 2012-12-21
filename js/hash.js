
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