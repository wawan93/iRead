(function(){
$('#fileForm').submit(function(e){

	$('#fileForm').ajaxForm();

	$('#fileForm').ajaxSubmit({
		url:'upload.php',
		iframe: true,
		dataType: 'html',
		beforeSubmit: function (){
			$('#content').html('<h1>UPLOAD</h1><p>Please wait...</p>');
		},
		success: function(data){
			$('#content').html(data);
			var name = $('#filename').val().replace(/^.*[\/\\]/g, '');
			if ($.cookie(name)>0) {$('#content').scrollLeft($.cookie(name));}
			location.hash = '';
			$('#showmenu').click();
		}
	});

	// Предотвращаем дальнейшее всплытие события
	if (e.stopPropagation) e.stopPropagation();
	else e.cancelBubble = true;

	// Отменяем действие по умолчанию для события
	if (e.preventDefault) e.preventDefault();
	else e.returnValue = false;
	return false;
});
})();