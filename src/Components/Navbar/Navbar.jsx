import React from 'react'
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'
import {IconName} from 'react-icons'
import { HiHome,
    HiMagnifyingGlass,
    HiStar,
    HiPlayCircle,
    HiTv } from "react-icons/hi2";
import { HiPlus,  HiDotsVertical } from 'react-icons/hi';

import 

function Navbar() {

    const menu=[
        {
            name: 'Home',
            icon: HiHome
        },
        {
          name: 'Search',
          icon: HiMagnifyingGlass
        },
        {
          name: 'Favorites',
          icon: HiStar
        },
        {

        }
    ]
    


  return (
    <div>
    <nav className="navbar">
      <h1>TipTravel</h1>
      <img src={logo} alt="logo" className="w-[80px] md:w-[115px] object-cover"/>
      {menu.map((item, index) => (
        <NavLink to={item.name} key={index} className="navbar-nav navbar">
          <NavbarItem name={item.name} icon={item.icon} />
        </NavLink>
      ))}
    </nav>
  </div>
  )
}
import NavbarItem from './NavbarItem';

export default Navbar
