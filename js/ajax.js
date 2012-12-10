	$(window).bind('hashchange', function() {
		if (location.hash != '') {
			$('#content').load(location.hash);
		}
	});

	if (location.hash != '') {
		$('#content').load(location.hash);
	}

	$('#menu a').click(function (e) {

		location.hash = this.href;

		prev_def(e);
		return false;
	});