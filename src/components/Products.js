import { faCheckCircle, faCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { checkProduct, deleteProduct, getProducts } from '../app/app';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


function Products() {
  const [query, setQuery] = useState("");
  const navigate=useNavigate();
  const[state,setState]=useState( // object dans state 
    {
      products:[],
      currentPage:1,
      pageSize:4,
      keyword:"",
      totalPages:0
    }
  )

  useEffect(()=>{
    handleGetProducts(state.keyword, state.currentPage, state.pageSize); // tous est reinitialise
  },[]);


  const handleGetProducts = (keyword, page, size)=>{
    getProducts(keyword, page, size).then(resp=> {
      const totalElements = resp.headers['x-total-count'];
      let totalPages = Math.floor(totalElements/size);
      if(totalElements % size != 0) ++totalPages;
      setState({...state,products:resp.data, keyword:keyword, currentPage:page, pageSize:size, totalPages:totalPages})// copie de tous les state ...
    }).catch(err => {
      console.log(err);
    })
  };

  const handleDeleteProduct=(product)=>{
    deleteProduct(product).then(resp => {
      //handleGetProducts(); recharger tous les donnes
      const newProducts=state.products.filter(p=>p.id!=product.id);
      setState({...state, products:newProducts});
    });
  };

  const handleCheckProduct = (product)=>{
    checkProduct(product).then((resp)=>{
      const newProducts = state.products.map(p=>{
      if(p.id == product.id)
      {
        p.checked =! p.checked
      }
      return p;
    });
    setState({...state, products:newProducts}); // je vais changer la valeur de product products:newProducts
    });
  };

  const handleGotoPage=(page)=>{
    handleGetProducts(state.keyword, page, state.pageSize);
  }
  const handleSearch=(event)=>{
    event.preventDefault();
    handleGetProducts(query,1,state.pageSize)

  }

  return (
    <div className='p-1 m-1'>
      <div className='row'>
        <div className='col-md-6'>
          <div className='card m-1'>
          <div className='card-body'>
            <form onSubmit={handleSearch}>
              <div className='row g-2'>
                <div className='col-auto'>
                  <input value={query} onChange={(e)=>setQuery(e.target.value)} className='form-control'></input>
                </div>
                <div className='col-auto'>
                 <button className='btn btn-success'>
                  <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                  </button>
                </div>

              </div>
            </form>
          </div>
          </div>
         <div className='card m-1'>
          <div className='card-body'>
            
            <table className='table'>
              <thead>
                <tr>
                  <th>ID</th><th>Name</th><th>Price</th><th>Checked</th>

                </tr>
              </thead>
              <tbody>
                {
                  state.products.map(product=>(
                    <tr key={product.id}> {/*on doit le donner une valeur unique si on a une boucle*/}
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>
                        <button onClick={()=>handleCheckProduct(product)} className='btn btn-outline-success'>
                          <FontAwesomeIcon 
                          icon={product.checked?faCheckCircle:faCircle}>

                          </FontAwesomeIcon>
                        </button>
                      </td>
                      <button onClick={()=>navigate(`/editProduct/${product.id}`)} className='btn btn-outline-success'>
                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>

                      </button>
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
              <ul className='nav nav-pills'>
                {
                  (new Array(state.totalPages).fill(0)).map((v,index)=>( // emerna tbleau b les 0 ms ce qu il nous intesse howa index 
                    <li>
                      <button onClick={()=>handleGotoPage(index+1)}
                      className={
                        index + 1 == state.currentPage 
                        ?"btn btn-info ms-1"
                        :"btn btn-outline-info ms-1"}
                      >
                        {index + 1} 
                      </button>
                    </li>
                  ))
                }

              </ul>


            </table>
          </div>
       </div>
     </div>
    </div>
    
    </div>  )
}

export default Products