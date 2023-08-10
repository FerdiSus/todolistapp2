<?php
include_once('connect.php');

class Todo extends DB{
    public function index()
    {
        $sql = "SELECT * FROM todo ORDER BY id DESC";
        $result = $this->db->query($sql)->fetch_all(MYSQLI_ASSOC);
        $response = [
            "data" => $result,
            "message" => "Berhasil Menambah data",
            "status" => 200
        ];
            
            echo json_encode($response);

    }

    public function store($request)
    {
        $name = $request;

        $sql ="INSERT INTO todo (name) VALUES ('$name') ";
        $result = $this->db->query($sql);
       if($result)
        {
            $response = [
                "data" => [
                    "id" => $this->db->insert_id,
                    "name" => $name
                ],
                "message" => "Berhasil Menambah data",
                "status" => 200
            ];
            
            echo json_encode($response);
        }

    }

    public function update($request,$id)
    {
        $name = $request;

        $sql ="UPDATE todo SET name='$name' WHERE id='$id'";
        $result = $this->db->query($sql);
        if($result)
        {
            $response = [
                "data" => $name,
                "message" => "Berhasil Mengubah data",
                "status" => 200
            ];
            
            echo json_encode($response);
        }

    }

    public function show($id)
    {
        $sql = "SELECT * FROM todo WHERE id='$id'";
        $result = $this->db->query($sql)->fetch_assoc();
        $response = [
            "data" => $result,
            "message" => "Berhasil Menambah data",
            "status" => 200
        ];
            
            echo json_encode($response);
    }

    public function destroy($id)
    {
        $sql ="DELETE FROM todo WHERE id='$id'";
        $result = $this->db->query($sql);
        if($result)
        {
            $response = [
                "data" => $result,
                "message" => "Berhasil Mengubah data",
                "status" => 200
            ];
            
            echo json_encode($response);
        }
    }

    public function changeStatus($id)
    {
        $sql ="SELECT * FROM todo WHERE id ='$id'";
        $data = $this->db->query($sql)->fetch_assoc();

        $status = $data['status'];
        $target = '';
        if($status === 'active')
        {
            $target='done';
        }
        else
        {
            $target='active';
        }

        $sql2 ="UPDATE todo set status ='$target' WHERE id ='$id'";
        $result = $this->db->query($sql2);
        if($result)
        {
            $response = [
                "data" => $target,
                "message" => "Berhasil Mengubah status",
                "status" => 200
            ];
            
            echo json_encode($response);
        }

    }
}