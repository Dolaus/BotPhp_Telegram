<?php
define("TELEGRAM_TOKEN","ВАШ ТЕЛЕГРАМ БОТ");
define("TELEGRAM_CHAT_ID","-4061434273");#Ваш чат куди відправляти

$my_message="";

foreach ($_POST as $key => $value) {
    $my_message.= mb_convert_encoding(($key." : ".$value), "UTF-8")."\n";
}

$getQuery = array(
    "chat_id" => TELEGRAM_CHAT_ID,
    "text"=> $my_message,
    "parse_mode" =>"html",
);
$ch =  curl_init("https://api.telegram.org/bot".TELEGRAM_TOKEN."/sendMessage?".http_build_query($getQuery));
curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,false);
curl_setopt($ch,CURLOPT_HEADER,false);

$resultQuery = curl_exec($ch);
curl_close($ch);
if ($resultQuery) {
    echo "true";
} else {
    echo "false";
}
?>