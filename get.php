<?php

include "nokogiri.php";

//$url=имя хоста, куда будем заходить

function get_content($url){

$cookies=array();

// имя хоста, откуда якобы пришли, некоторые проверяют

$ref="google.com";

// инициализация cURL

$ch = curl_init($url);

//-- откуда пришли )

curl_setopt($ch, CURLOPT_REFERER, $ref);

// чтобы выводил заголовки

curl_setopt ($ch, CURLOPT_HEADER, 1);

// если ведется проверка HTTP User-agent, то передаем один из возможных допустимых вариантов:

curl_setopt ($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 6.1; ru; rv:1.9.0.8) Gecko/2009032609 Firefox/3.0.8');

// // если проверятся откуда пришел пользователь, то указываем допустимый заголовок HTTP Referer:

// curl_setopt ($ch, CURLOPT_REFERER, 'http://'.$hostname.'/');

// возвращать результат работы

curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);

// не проверять SSL сертификат

curl_setopt ($ch, CURLOPT_SSL_VERIFYPEER, 0);

// не проверять Host SSL сертификата

curl_setopt ($ch, CURLOPT_SSL_VERIFYHOST, 0);

// это необходимо, чтобы cURL не высылал заголовок на ожидание

curl_setopt ($ch, CURLOPT_HTTPHEADER, array('Expect:'));



// выполнить запрос

$cont = curl_exec ($ch);

$t=curl_multi_getcontent ($ch);
// получил массив всех заголовков от сервера
$ret = curl_getinfo($ch);
curl_close ($ch);


	if($ret && isset($ret['content_type']) && $ret['content_type']!=null)
	{
	    preg_match("|Content-Type: .*?charset=(.*)\n|imsU", $t, $matches);
	    if(!empty($matches[1]))
	    {
		$ret['charset'] =$matches[1];
		if ($ret['charset'] == 'windows-1251') {$ret['charset']='win-1251';}
	    }	   
	}
$ret['content'] = $cont;
$ret['charset'] = $ret['charset']?:"UTF-8";
return $ret;

}

	$u = $_REQUEST['url'];

	// Извлекаем имя хоста из URL
	preg_match('@^(?:http://)?([^/]+)@i',$u, $matches);
	$host = $matches[1];

	// извлекаем две последние части имени хоста
	preg_match('/[^.]+\.[^.]+$/', $host, $matches);
	$host = $matches[0];

	$res = get_content($u);
	$ch_set = $res['charset'];

	$content = $res['content'];
	// echo mb_detect_encoding($content); 
	// if (mb_detect_encoding($content) != "UTF-8") $content = mb_convert_encoding($content, "UTF-8");

// echo $host;
$saw = new nokogiri($content);

 $article_array = array(
 	'gazeta.ru', 'news.mail.ru'
 );

$content = preg_replace('#<script[^>]*>.*?</script>#is', '', $content);
$content = preg_replace('#<head[^>]*>.*?</head>#is', '', $content);
$content = preg_replace('#<style[^>]*>.*?</style>#is', '', $content);
$content = preg_replace('#<form[^>]*>.*?</form>#is', '', $content);
$content = preg_replace('#<noscript[^>]*>.*?</noscript>#is', '', $content);
$content = preg_replace('#<footer[^>]*>.*?</footer>#is', '', $content);
$content = preg_replace('#<header[^>]*>.*?</header>#is', '', $content);
$content = preg_replace('#<aside[^>]*>.*?</aside>#is', '', $content);

$content = strip_tags($content, '<p><br><span><h1><h2><h3><h4><a><code><pre><b><i><strong><em><ul><ol><li>');

// if ($host == 'habrahabr.ru') {
// 	echo $saw->get('.content')->toXml();
// } else if (in_array($host, $article_array)) {
// 	echo $saw->get('article')->toXml();
// } else if ($host == 'bash.im') {
// 	echo $saw->get('.text')->toXml();
// } else {
	echo $content;
// }
// foreach ($saw->get('.content') as $link){
//     var_dump($link['#text']);
// }
	// echo $content;
