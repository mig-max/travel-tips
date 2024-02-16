import React from 'react'
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'




function Navbar() {
    

  return (
    <div>
    <nav className="navbar">
      <h1>TipTravel</h1>
      <img src={logo} alt="logo" className="w-[80px] md:w-[115px] object-cover"/>
      {menu.map((item, index) => (
        <NavLink to={item.name} key={index} className="navbar-nav navbar">{item.name}</NavLink>
      ))}
    </nav>
  </div>
  )
}
import NavbarItem from './NavbarItem';

export default Navbar
