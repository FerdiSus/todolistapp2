function ListData(props){
  
    return(
      <>
        {
          props.data?.map((item, key)=>
          {
            let color = item.status === 'done' ? 'bg-success' : 'bg-light';
            let btnColor = item.status === 'done' ? 'bg-light' : 'bg-success';
            let textColor = item.status === 'done' ? 'text-white' : 'text-black';

            return(    
              <div id={'todo-' + key} key={key} className={"card mb-3 "+ color}>
              <div className="row g-0">
                  <div className="col-md-8">
                      <div className="card-body">
                        <h5 id={'label-' + key} className={"card-title " + textColor}>{item.name}</h5>
                      </div>
                  </div>
                  <div className="col-md-4 d-flex justify-content-end align-items-center">
                      <button id={'btnCheck' + key } onClick={props.onDone.bind(null, key, item.id)} className={"btn " + btnColor + " mx-1"}> <i className="bi bi-check2-all"></i> </button>
                      <button onClick={props.onEdit.bind(null, key, item.id)} className="btn btn-warning mx-1"> <i className="bi bi-pencil"></i> </button>
                      <button onClick={props.onDelete.bind(null, key, item.id)} className="btn btn-danger mx-1"> <i className="bi bi-trash"></i> </button>
                  </div>
              </div>
          </div>
          );
          })
        }
      </>
    )
  }

export default ListData;