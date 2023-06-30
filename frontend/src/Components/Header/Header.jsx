import React, { useContext } from "react";
import { VscGlobe } from "react-icons/vsc";
import { IoHelpCircle } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { IoBagOutline } from "react-icons/io5";

import { Link } from "react-router-dom";
import "./header.css";
import { Store } from "../../store/store";
import { IoMenu } from "react-icons/io5";

const Header = () => {
  const { state } = useContext(Store);
  const { cart, userInfo } = state;

  const categories = ["Men", "Women", "Kids"];

  return (
    <header className="header-div">
      <section className="head-sec">
        <div className="left-head">
          <ul className="left-list">
            <li>
              <VscGlobe className="header-icon" />
            </li>
            <li>
              {" "}
              <IoHelpCircle className="header-icon" />{" "}
            </li>
            <Link to="/wishList">
              <li>
                {" "}
                <IoHeartOutline className="header-icon" />{" "}
              </li>
            </Link>
            <Link to="/shopCart">
              <li>
                {" "}
                <IoBagOutline className="header-icon" /> cart:
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </li>
            </Link>
            <li className="header-icon">
              {userInfo ? (
                <Link to="/profile">{userInfo.name}</Link>
              ) : (
                <Link to="/signin">Login</Link>
              )}
            </li>
          </ul>
        </div>
        <Link to="/women">
          <div className="logo-head">SHEIM</div>
        </Link>
        <div className="right-head">
          <ul className="right-list">
            {categories.map((category, index) => (
              <li key={index}>
                <Link to={`/search?category=${category}`}>{category}</Link>
              </li>
            ))}
          </ul>
        </div>
        {/* <button className="nav-burger">menu</button> */}
        {/* <div className="nav-burger">
          <IoMenu />
        </div> */}
      </section>
      <section className="search-bar">
        <input type="text" />
      </section>
    </header>
  );
};

export default Header;
