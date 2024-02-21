
import { NavLink, useNavigate } from "react-router-dom";
import { HiHome, HiMagnifyingGlass, HiStar } from "react-icons/hi2";
import { HiDotsVertical } from "react-icons/hi";
import { IoIosAddCircle, IoMdContact } from "react-icons/io";
import { RiTeamFill } from "react-icons/ri";
import { useState } from "react";
import {Heading, } from "@chakra-ui/react";
import NavbarItem from "./NavbarItem";
import "./Navbar.css"
import '@fontsource/courgette';

function Navbar() {
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();

  const menu = [
    {
      name: "Home",
      icon: HiHome,
      path: "/",
    },
    {
      name: "Add",
      icon: IoIosAddCircle,
      path: "/add",
    },
    {
      name: "Search",
      icon: HiMagnifyingGlass,
      path: "/search",
    },
    {
      name: "Favorites",
      icon: HiStar,
      path: "/favorites",
    },

    /*
    {
      name: "About",
      icon: RiTeamFill,
      path: "/about",
    },
    {
      name: "Contacts",
      icon: IoMdContact,
      path: "/contact",
    },
    */
  ];

  return (
    <div className="navbar">
      <div className="flex justify-between items-center gap-9 bg-blue-500 bg-opacity-0">

        <div className="nav-logo">
          <button onClick={() => navigate("/")}>
            <Heading className={"navbar-brand"} fontFamily={"Courgette"} fontSize={"6xl"} color={"#FF6A3D"} textDecoration={"underline"}>TopTravelTips</Heading>
          </button>
        </div>

        <div className="icons-container">
          <div className="hidden flex-col text-orange-600 font-medium sm:flex justify-end pt-4 pb-2 pr-6 pl-6">
            <div className="hidden md:flex gap-8">
              {menu.map((item) => (
                <NavLink to={item.path} exact key={item.name}>
                  <NavbarItem name={item.name} Icon={item.icon} />
                </NavLink>
              ))}
            </div>
            <div className="flex md:hidden gap-8" onClick={() => setToggle(!toggle)}>
              {menu.slice(0, 4).map((item) => (
                <NavLink to={item.path} exact key={item.name}>
                  <NavbarItem name={""} Icon={item.icon} />
                </NavLink>
              ))}
            
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Navbar;