import React from "react";

import "./sideNav.css";
import { VscChromeClose } from "react-icons/vsc";
import { GiLargeDress } from "react-icons/gi";
// import { PiShirtFoldedBold } from "react-icons/pi";
import { VscGlobe } from "react-icons/vsc";
// import { FaShirt } from "react-icons/fa";
import { IoHelpCircle } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { IoBagOutline } from "react-icons/io5";
import { BiUserCircle } from "react-icons/bi";
import { RiShirtFill } from "react-icons/ri";
import { TbShirt } from "react-icons/tb";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  // const hide = () => setIsOpen(false);
  // const show = () => setIsOpen(true);
  return (
    <>
      <button className="menu-btn" onClick={toggle}>
        <IoMenu size={50} />
      </button>

      <ul className={`side-nav ${isOpen ? "show" : ""}`}>
        <li onClick={toggle} key={SideNav.text}>
          <VscChromeClose size={50} />
        </li>

        <li key={SideNav.text} onClick={toggle}>
          <Link to="/Women">Home</Link>
          <GiLargeDress />
        </li>

        {/* <li key={SideNav.text}>
          Men
          <RiShirtFill />
        </li>
        <li key={SideNav.text}>
          Kids
          <TbShirt />
        </li> */}
        {/* <li key={SideNav.text}>
          Language <VscGlobe />
        </li>
        <li key={SideNav.text}>
          Help <IoHelpCircle />
        </li> */}

        <li key={SideNav.text} onClick={toggle}>
          <Link to="/wishList">WishList</Link>
          <IoHeartOutline />
        </li>

        <li key={SideNav.text} onClick={toggle}>
          <Link to="/shopCart">Shop-Cart</Link>

          <IoBagOutline />
        </li>
        <li key={SideNav.text} onClick={toggle}>
          <Link to="/profile">My-Profile</Link>

          <BiUserCircle />
        </li>
      </ul>
    </>
  );
};

export default SideNav;
