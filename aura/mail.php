<?php
$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];

$EmailTo = "km@redcross.ru";
$Subject = "Новый запрос с сайта #ЯТВОЙДОНОР";

// prepare email body text
$Fields .= "Имя: ";
$Fields .= $name;
$Fields .= "\n";

$Fields.= "Email: ";
$Fields .= $email;
$Fields .= "\n";

$Fields .= "Сообщение: ";
$Fields .= $message;
$Fields .= "\n";

// send email
$success = mail($EmailTo,  $Subject,  $Fields, "From:".$email);

