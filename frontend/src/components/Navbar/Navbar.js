import React from 'react'
import { NavLink } from 'react-router-dom';
import  './Navbar.css';
const Navbar = () => {
  return (
    <div>
      <nav className='navbar'> 
        <div className='navbar-container'>
        <h1 className=''>Super Market</h1>
        <ul className="nav-list-container">
            <NavLink className={"nav-link"} to="/" end>Home</NavLink>
            <NavLink className={"nav-link"} to="/contact">Contacts Us</NavLink>
            <NavLink className={"nav-link"} to="/about" >About</NavLink>
            <NavLink className={"nav-link"} to="/additem">Add Items</NavLink>
            
            </ul>
            </div>
      </nav> 
      <hr/>
    </div>
  )
}

export default Navbar