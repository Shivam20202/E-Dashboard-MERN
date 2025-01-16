import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  let [name, setName] = useState("");
  let [price, setPrice] = useState("");
  let [category, setCategory] = useState("");
  let [company, setCompany] = useState("");
  const params=useParams();
  const navigate=useNavigate();
  

  const updateProduct = async () => {
    console.log(name,price,category,company);
    let result=await fetch(`http://localhost:5000/product/${params.id}`,{
      method:'Put',
      body:JSON.stringify({name,price,category,company}),
      headers:{
        'Content-Type':'application/json',
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    result=await result.json();
    console.log(result)
    navigate('/')
  };

  useEffect(()=>{
     getProductDetails();
  },[])

  const getProductDetails = async ()=>{
   console.warn(params)
   let result=await fetch(`http://localhost:5000/product/${params.id}`,{
    headers:{
      authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
   });
   result = await result.json();
   console.warn(result)
   setName(result.name)
   setPrice(result.price)
   setCategory(result.category)
   setCompany(result.company)
  }



  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        className="inputBox"
        placeholder="Enter Product Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="text"
        className="inputBox"
        placeholder="Enter Product Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="text"
        className="inputBox"
        placeholder="Enter Product Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <button className="appButton" onClick={updateProduct}>
        Update Product
      </button>
    </div>
  );
};
export default UpdateProduct;
