<?php

include "nokogiri.php";

$u = $_REQUEST['url'];

$content = file_get_contents($u);

// Извлекаем имя хоста из URL
preg_match('@^(?:http://)?([^/]+)@i',$u, $matches);
$host = $matches[1];

// извлекаем две последние части имени хоста
preg_match('/[^.]+\.[^.]+$/', $host, $matches);
$host = $matches[0];

$saw = new nokogiri($content);

// выводим title
echo '<h1>';
echo $saw->getDom()->getElementsByTagName('title')->item(0)->nodeValue;
echo '</h1>';

$content = strip_tags($content, '<p><br><span><h1><h2><h3><h4><a><code><pre><b><i><strong><em><ul><ol><li>');

if ($host == 'habrahabr.ru') {
	$text = $saw->get('.content')->getDom()->saveHTML();
	$text = str_replace("<root>", "", $text);
	$text = str_replace("</root>", "", $text);
	echo $text;
} else if (in_array($host, $article_array)) {
	echo $saw->get('article')->toXml();
} else if ($host == 'bash.im') {
	echo $saw->get('.text')->toXml();
} else {
	$content = preg_replace('#<script[^>]*>.*?</script>#is', '', $content);
	$content = preg_replace('#<head[^>]*>.*?</head>#is', '', $content);
	$content = preg_replace('#<style[^>]*>.*?</style>#is', '', $content);
	$content = preg_replace('#<form[^>]*>.*?</form>#is', '', $content);
	$content = preg_replace('#<noscript[^>]*>.*?</noscript>#is', '', $content);
	$content = preg_replace('#<footer[^>]*>.*?</footer>#is', '', $content);
	$content = preg_replace('#<header[^>]*>.*?</header>#is', '', $content);
	$content = preg_replace('#<aside[^>]*>.*?</aside>#is', '', $content);
	echo $content;
}