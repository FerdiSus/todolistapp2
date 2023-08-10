<?php
class DB{
    private $hostname = "localhost";
    private $user = "root";
    private $password = "";
    private $database = "todolistapp";

    public $db;

    public function __construct()
    {
        $this->db = mysqli_connect($this->hostname, $this->user, $this->password, $this->database);
        if($this->db){
            return "Error DB";
        }
    }
}