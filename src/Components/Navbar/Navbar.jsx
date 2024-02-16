import React from 'react'
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'
import { HiHome,
  HiMagnifyingGlass,
  HiStar} from "react-icons/hi2";


function Navbar() {
    
  const menu=[
    {
      name: 'Home',
      icon: HiHome,
      path: '/'
    },
    {
      name: 'Search',
      icon: HiMagnifyingGlass,
      path: '/search'
    },
    {
      name: 'Favorites',
      icon: HiStar,
      path: '/favorites'
    }
]

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
