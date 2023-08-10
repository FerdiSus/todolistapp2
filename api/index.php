<?php
header('Access-Control-Allow-Origin: *');

include_once('todo.php');


$todo = new Todo;
return $todo->index();