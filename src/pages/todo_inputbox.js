import React, {useRef,useEffect} from "react";

function Inputbox({value,onChange,onSubmit,submitEnterLoc}){  
    const inputRef = useRef(null);
  
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, []);
    
    // useEffect(()=>{
    //   document.addEventListener('keypress',(e)=>{
    //     if(e.key === 'Enter'){
    //       onSubmit();
    //     }
    //   })
    // });
  
    return(
          <div class="card-body">
            <label className="bg-light">Masukan Todolist</label> 
            <div className="d-flex justify-content-between gap-2">
              <input type="text" className="form-control" value={value} onChange={onChange} ref={inputRef}></input>
              <button id="btnSubmit" className="btn btn-primary" onClick={onSubmit}><i className="bi bi-plus-circle"></i></button>
            </div> 
          </div>
       
    );
  
  }

  export default Inputbox;