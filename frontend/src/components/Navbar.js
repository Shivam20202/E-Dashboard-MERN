import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'


function Navbar() {
  const auth=localStorage.getItem('user');
  const navigate=useNavigate();

  const logout=()=>{
    localStorage.clear();
     navigate('/signup')
  }
  return (
    <div>
      <img alt='logo' className='logo' src='https://cdn3.iconfinder.com/data/icons/round-icons-vol-2/512/s-64.png'/>
      
        {
          auth?
          <ul className='nav-ul'>
            <li><Link to='/'>Products</Link></li>
            <li><Link to='/add'>Add Product</Link></li>
            <li><Link to={`/update`}>Update</Link></li>
            <li><Link to='/profile'>Profile</Link></li>
            <li><Link onClick={logout} to='/signup'>Logout ({JSON.parse(auth).name})</Link></li>
           </ul> 
          :
          <ul className='nav-ul nav-right'>
            <li><Link to='/signup' >Signup</Link></li>
            <li><Link to='/login'>Login</Link></li>
            </ul>
            }
        
      
    </div>
  )
}

export default Navbar
