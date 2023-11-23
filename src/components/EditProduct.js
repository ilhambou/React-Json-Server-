import React, { useEffect, useState } from 'react'
import { getProductById, saveProduct, updateProduct } from '../app/app';
import { useParams } from 'react-router-dom';

function EditProduct() {
  const {id}=useParams();
  const[name, setName]=useState("");
  const[price, setPrice]=useState(0);
  const[checked, setChecked]=useState(false)
  useEffect(()=>{
    handleGetProductById(id)

  },[])

  const handleGetProductById=(id)=>
  {
    getProductById(id).then(resp=>
    {
      let product = resp.data;
      setName(product.name);
      setPrice(product.price);
      setChecked(product.checked);

    });
  }

  const handleUpdateProduct=(event)=>{
    event.preventDefault(); //pour ne pas refresh la page 
    let product = {id,name,price,checked} // on ajoute id pour update
    updateProduct(product).then(resp=>{
      alert(JSON.stringify(resp.data))
    })
  }

  return (
     
    <div className='row p-1'>
      <div className='col-md-6'>
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={handleUpdateProduct}>
              <div className='mb-3'>
                <label className='form-label'>Name : </label>
                <input 
                onChange={(e)=>setName(e.target.value)} /*mettra à jour la variable d'état 'name' avec la valeur actuelle du champ de saisie.*/
                value={name}
                className='form-control'></input> {/* Cela lie la valeur du champ de saisie à la variable d'état 'name'. Ainsi, si 'name' change ailleurs dans le code, la valeur du champ de saisie sera mise à jour en conséquence.*/}
              </div>
              <div className='mb-3'>
                <label className='form-label'>Price : </label>
                <input 
                onChange={(e)=>setPrice(e.target.value)}
                value={price}
                className='form-control'></input>
              </div>
              <div className="form-check">
                  <input 
                  onChange={(e)=>setChecked(e.target.value)}
                  checked={checked}
                  className="form-check-input" type="checkbox" />
                   <label className="form-check-label" for="flexCheckChecked">
                   Checked
              </label>
               </div>
               <button className='btn btn-success'>Save</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default EditProduct