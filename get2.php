<?php 

require('phpQuery.php');

function get_xml_page($url) {

 $ch = curl_init($url);
 curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
 $page = curl_exec($ch);
 curl_close($ch);
 return $page;

}

$results_page = get_xml_page($_REQUEST['url']);
$results = phpQuery::newDocument($results_page);

print $results->htmlOuter();