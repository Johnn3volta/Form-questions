<?php

$to = 'worktepmeh90694@yandex.ru';
$page = $_SERVER['HTTP_REFERER'];
$time = date("Hч:iм - d.m.y г.  ");
$siteName = 'Мой сайт';
$adminEmail = 'admin@yandex.ru';
$form_subject = 'Ответы на вопросы';
if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['data'])){
    extract($_POST['data'], EXTR_SKIP);
    $data = [
        'Имя'                   => $name,
        'Телефон'               => $phone,
        'Уже обращался в фирму' => $happ,
        'Цветa'                 => $colors,
        'Размер'                => $size,
        'Доставка'              => $delivery,
    ];

    foreach ($data as $key => $value) {
            $message .= "<tr style='border: 1px solid #ddd;'>
			<td width='50%' style='padding: 10px 0; border-right: 1px solid #ddd'><strong>$key</strong></td>
			<td style='padding: 10px 0;'>$value</td>
		</tr>
		";

    }

    $message = "<table align='center' width='70%' style='text-align:center; border:1px solid #ddd; margin-bottom: 20px; background-color: transparent;border-spacing: 0;border-collapse: collapse'>
    <tr style='border: 1px solid #ddd;'><th colspan='2' style='padding: 10px 0'>Форма вопросов</th></tr>
    $message
    <tr style='border: 1px solid #ddd;'><td width=50% style='border-right: 1px solid #ddd;padding: 10px 0 '><strong>Время и дата заказа</strong></td><td>$time </td></tr>
    <tr style='border: 1px solid #ddd;'><td width=50% style='border-right: 1px solid #ddd;padding: 10px 0 '><strong>Страница заполнения формы</strong></td><td>$page</td></tr>
    </table>";

    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
    $headers .= "From: $siteName <{$adminEmail}>\r\n"; // от кого письмо

    mail($to, $form_subject, $message, $headers);

    print_r($_POST);

}
