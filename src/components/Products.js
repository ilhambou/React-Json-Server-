import { faCheckCircle, faCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

function Products() {
  const[products,setProducts]=useState([
    {id : 1, name: "computer", price:234, checked:false},
    {id : 2, name: "printer", price:34, checked:true},
    {id : 3, name: "smartphone", price:97, checked:false}

  ]);

  const handleDeleteProduct=(product)=>{
    const newProducts=products.filter(p=>p.id!=product.id);
    setProducts(newProducts);

  }
  return (
    <div className='p-1 m-1'>
      <div className='row'>
        <div className='col-md-6'>
         <div className='card'>
          <div className='card-body'>
            <table className='table'>
              <thead>
                <tr>
                  <th>ID</th><th>Name</th><th>Price</th><th>Checked</th>

                </tr>
              </thead>
              <tbody>
                {
                  products.map(product=>(
                    <tr key={product.id}> {/*on doit le donner une valeur unique si on a une boucle*/}
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>
                        <button className='btn btn-outline-success'>
                          <FontAwesomeIcon 
                          icon={product.checked?faCheckCircle:faCircle}>

                          </FontAwesomeIcon>
                        </button>
                      </td>
                      <td>
                        <button onClick={()=>handleDeleteProduct(product)} className='btn btn-outline-danger'>
                          <FontAwesomeIcon
                          icon={faTrash}
                          ></FontAwesomeIcon>
                        </button>
                      </td>

                    </tr>

                  ))
                }
              </tbody>


            </table>
          </div>
       </div>
     </div>
    </div>
    
    </div>  )
}

export default Products