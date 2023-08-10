import React, {useEffect, useState, useRef} from "react";
import Inputbox from "./todo_inputbox";
import ListData from "./todo_listdata";
import axios from "axios";

function App(){
const [data,setData] = useState([]);
const [text,setText] = useState('');

useEffect(()=>
{
  axios.post('http://localhost:8000/index.php')
  .then((response)=>
  {
    console.log(response.data);
    setData(response.data.data);
  })
  .catch((error)=>
  {
    console.error(error);
  })
},[]);

const onChange = (e) =>{
  setText(e.target.value);
}

const onSubmit = () => {
  if(text != ''){
      axios.post('http://localhost:8000/store.php' ,{
       request: text
      })
     .then((response)=>
     {
      let submittedText = [{name:text, id: response.data.data.id},...data];
      setData(submittedText);
      setText('');
     })
     .catch((error)=>
     {
      console.error(error);
     })

  }
  else{
    console.warn("tidak boleh kosong");
  }
}


const onDelete = (key,id) => {
  let confirm = window.confirm("apakah anda ingin menghapus data")
  let newData = data;

  if(confirm){
    axios.post('http://localhost:8000/destroy.php' ,{
      id: id
    })
    .then((response)=>
    {
      newData.splice(key,1);
      setData(newData);
      document.getElementById('todo-'+key).style.display ="none";
      console.log("berhasil apus");
    })
    .catch((error)=>
    {
     console.error(error);
    })   
  }

}

const onEdit = (key,id) => {
  let item = data.filter(item => item.id == id)[0];
  let prompt = window.prompt("Ubah data", item.name);

  if(prompt)
  {
    axios.post('http://localhost:8000/update.php' ,{
      request: prompt,
      id: id
    })
    .then((response)=>
    {
      let newData = data;
      newData[key] = {
        id: id,
        name: prompt
      };
    
      setData(newData);
      document.getElementById('label-'+ key).innerText = prompt;
      console.log("berhasil mengubah data");
    })
    .catch((error)=>
    {
     console.error(error);
    })   
  

  }
}

 const onDone = (key, id) =>{
  axios.post('http://localhost:8000/changeStatus.php' ,{
    id: id
  })
  .then((response)=>
  {
    let newStatus = response.data.data;
    let color = newStatus === 'active' ? 'bg-light' : 'bg-success';
    let btnColor = newStatus === 'active' ? 'bg-success' : 'bg-light';
    let textColor = newStatus === 'active' ? 'text-black' : 'text-white';
    document.getElementById('todo-'+key).classList.remove(newStatus === 'active' ? 'bg-success' : 'bg-light')
    document.getElementById('todo-'+key).classList.add(color)
    document.getElementById('btnCheck'+key).classList.remove(newStatus === 'active' ? 'bg-light' : 'bg-success')
    document.getElementById('btnCheck'+key).classList.add(btnColor)
    document.getElementById('label-'+key).classList.remove(newStatus === 'active' ? 'text-white' : 'text-black')
    document.getElementById('label-'+key).classList.add(textColor)

  })
  .catch((error)=>
  {
   console.error(error);
  })   
 }


return(
  <div className="container mt-5">
      <div className="card m-4">
        <div className="card-header text-center">
          <label><i className="bi bi-droplet-half"></i>  Aplikasi TodoList  <i className="bi bi-droplet-half"></i></label>
        </div>
        <div class="card-body">
          <Inputbox value={text} onChange={(e)=>onChange(e)} onSubmit={()=>onSubmit()}  />
          <ListData  data={data}  onDone={(key,id)=>onDone(key,id)} onDelete={(key,id)=>onDelete(key,id)} onEdit={(key,id)=>onEdit(key,id)}/>
        </div>
      </div>
    </div>
  );
}

export default App