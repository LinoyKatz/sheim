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

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const hide = () => setIsOpen(false);
  const show = () => setIsOpen(true);
  return (
    <>
      <button className="menu-btn">
        <IoMenu size={50} onClick={toggle} />
      </button>
      <ul className={`side-nav ${isOpen ? "show" : ""}`}>
        <li key={SideNav.text}>
          <VscChromeClose size={50} />
        </li>
        <li key={SideNav.text}>
          Women <GiLargeDress />
        </li>
        <li key={SideNav.text}>
          Men
          <RiShirtFill />
        </li>
        <li key={SideNav.text}>
          Kids
          <TbShirt />
        </li>
        <li key={SideNav.text}>
          Language <VscGlobe />
        </li>
        <li key={SideNav.text}>
          Help <IoHelpCircle />
        </li>
        <li key={SideNav.text}>
          Wish-List
          <IoHeartOutline />
        </li>
        <li key={SideNav.text}>
          Shop-Cart
          <IoBagOutline />
        </li>
        <li key={SideNav.text}>
          My-Profile
          <BiUserCircle />
        </li>
      </ul>
    </>
  );
};

export default SideNav;
