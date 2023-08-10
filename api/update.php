<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

include_once('todo.php');

$data = json_decode(file_get_contents('php://input'),true);

$request = $data['request'];
$id = $data['id'];

$todo = new Todo;
$todo->update($request, $id);