import React, { useState } from "react";

import "./burger.css";
import { IoMenu } from "react-icons/io5";
import toggle from "../Side-nav/SideNav";

function Burger() {
  return (
    <button>
      <IoMenu size={50} onClick={toggle} />
    </button>
  );
}

export default Burger;
