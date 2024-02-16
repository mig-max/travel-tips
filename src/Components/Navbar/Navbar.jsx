import React from 'react'
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'
<<<<<<< HEAD

=======
//import {IconName} from 'react-icons'
import { HiHome,
    HiMagnifyingGlass,
    HiStar,
    HiPlayCircle,
    HiTv } from "react-icons/hi2";
import { HiPlus,  HiDotsVertical } from 'react-icons/hi';
>>>>>>> 914eec5 (navbar and navbaritems implemented with navlink and tailwind installation)



function Navbar() {
<<<<<<< HEAD
=======

    const menu=[
        {
          name: 'Home',
          icon: HiHome
          path: '/'
        },
        {
          name: 'Search',
          icon: HiMagnifyingGlass
          path: '/search'
        },
        {
          name: 'Favorites',
          icon: HiStar
          path: '/favorites'
        }
    ]
>>>>>>> 914eec5 (navbar and navbaritems implemented with navlink and tailwind installation)
    

  return (
    <div className='flex items-center gap-8 bg-blue-500 bg-opacity-50'>
      <img src={logo} alt="logo" className='w-[80px] md:w-[115px] object-cover'/>
      {menu.map((item) => (
        <NavLink to={item.path} exact key={item.name}>
        <NavbarItem name={item.name} Icon={item.icon} />
        </NavLink>
      ))}
  </div>
  )
}
import NavbarItem from './NavbarItem';

export default Navbar
