<?php

header('Content-Type: text/html;');

// Каталог, в который мы будем принимать файл:
$uploaddir = './files/';
$uploadfile = $uploaddir.basename($_FILES['file']['name']);

// Копируем файл из каталога для временного хранения файлов:
if (copy($_FILES['file']['tmp_name'], $uploadfile))
{
	chmod($uploadfile, 0777);

	$xml=new DOMDocument(null,'utf-8');
	$xml->load($uploadfile);

	$xsl=new DOMDocument(null,'utf-8');
	$xsl->load('FB2_22_xhtml.xsl');

	$proc = new XSLTProcessor();

	$proc->importStylesheet($xsl);

	$parsed = $proc->transformToXml($xml);

	echo $parsed;
}
else { echo "<h3>Ошибка! Не удалось загрузить файл на сервер!</h3>"; exit; }

?>