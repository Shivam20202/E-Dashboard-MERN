import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const navigate=useNavigate();

    useEffect(()=>{
      const auth=localStorage.getItem('user');
      if(auth){
           navigate('/')
      }
    })

    const collectData= async() =>{
        console.log(name,email,password)
        let result=await fetch('http://localhost:5000/register',{
          method:"post",
          body:JSON.stringify({name,email,password}),
          headers:{
           'Content-Type':'application/json',
           authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        })
      result = await  result.json();
      console.warn(result)
      
      localStorage.setItem("user",JSON.stringify(result.result))
      localStorage.setItem("token",JSON.stringify(result.auth))
      navigate('/')
      

    }

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        collectData(); // Trigger the login function on Enter key press
      }
    };

  return (
    <div className='register'>
      <h1>Signup</h1>
      <input className='inputBox' onKeyDown={handleKeyDown}  value={name} onChange={(e)=>setName(e.target.value)} type='text' placeholder='Enter name'/>
      <input className='inputBox' onKeyDown={handleKeyDown}  value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Enter email'/>
      <input className='inputBox' onKeyDown={handleKeyDown}  value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Enter Password'/>
      <button onClick={collectData} className='appButton' type='button'>Signup</button>
    </div>
  )
}

export default Signup
