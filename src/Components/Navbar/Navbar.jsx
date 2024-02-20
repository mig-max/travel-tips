import logo from '../../assets/logo2.png'
import { NavLink } from 'react-router-dom'
import { HiHome, HiMagnifyingGlass, HiStar } from "react-icons/hi2";
import { HiDotsVertical } from "react-icons/hi"
import { IoIosAddCircle, IoMdContact } from "react-icons/io";
import { RiTeamFill } from "react-icons/ri";
import { useState } from 'react';

function Navbar() {

  const [toggle, setToggle] = useState(false)
    
  const menu=[
    {
      name: 'Home',
      icon: HiHome,
      path: '/'
    },
    {
      name: 'Add',
      icon: IoIosAddCircle,
      path: '/add'
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
    },
    {
      name: 'About',
      icon: RiTeamFill,
      path: '/about'
    },
    {
      name: 'Contacts',
      icon: IoMdContact,
      path: '/contact'
    }
]

  return (
    <div className='flex items-center gap-8 bg-blue-500 bg-opacity-50'>
      <img src={logo} alt="logo" className='w-[80px] md:w-[115px] object-cover'/>
      <div className='hidden md:flex gap-8'>
      {menu.map((item) => (
        <NavLink to={item.path} exact key={item.name}>
        <NavbarItem name={item.name} Icon={item.icon} />
        </NavLink>
      ))}
  </div>
    <div className='flex md:hidden gap-8' onClick={()=> setToggle(!toggle)}>
      {menu.map((item, index) => index<3&&(
        <NavLink to={item.path} exact key={item.name}>
        <NavbarItem name={''} Icon={item.icon} />
        </NavLink>
      ))}
      <div className='md:hidden'>
        <NavbarItem name={''} Icon={HiDotsVertical} />
      {toggle? <div className='absolute mt-3'>
      {menu.map((item, index) => index>3&&(
        <NavLink to={item.path} exact key={item.name}>
        <NavbarItem name={item.name} Icon={item.icon} />
        </NavLink>
      ))}
      </div> : null}
      </div>
  </div>
  </div>
  )
}
import NavbarItem from './NavbarItem';

export default Navbar
