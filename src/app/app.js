import axios from "axios";

export const productsApi = axios.create(
    {
        baseURL : "http://localhost:9000",
    });

export const getProducts = ()=>
    {
        return productsApi.get("/products");
    };

export const deleteProducts = (product)=>
    {
        return productsApi.delete(`/products/${product.id}`);

    };

export const getProduct = (id)=>
    {
        return productsApi.get(`/products/${id}`);
        
    };

export const saveProduct = (product)=>
    {
        return productsApi.post(`/products`,product);
        
    };

export const checkProduct = (product)=>
    {
        return productsApi.patch(`/products`,{checked:!product.checked});
        
    };
export const updateProduct = (product)=>
    {
        return productsApi.put(`/products`,product);
        
    }
