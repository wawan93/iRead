(function(){
	
	var name = $('#filename').val().replace(/^.*[\/\\]/g, '');

	$('#bookmark').click(function(e){

		var name = $('#filename').val().replace(/^.*[\/\\]/g, ''); 
		
		if (location.hash != '') {
			name = location.hash;
		}

		$.cookie(name, $('#content').scrollLeft());

		if (e.stopPropagation) e.stopPropagation();
		else e.cancelBubble = true;

		if (e.preventDefault) e.preventDefault();
		else e.returnValue = false;
		$('#showmenu').click();
	})
	
	$('#bm_list>li>a').live('click',function(e){
		var list = $.cookie($('#filename').val());
	});

}) ();