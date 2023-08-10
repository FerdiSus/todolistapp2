<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

include_once('todo.php');

$data = json_decode(file_get_contents('php://input'),true);

$id = $data['id'];

$todo = new Todo;
$todo->destroy($id);