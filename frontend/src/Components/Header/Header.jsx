import React, { useContext } from "react";
import { VscGlobe } from "react-icons/vsc";
import { IoHelpCircle } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { IoBagOutline } from "react-icons/io5";

import { Link } from "react-router-dom";
import "./header.css";
import { Store } from "../../store/store";
import Burger from "../Burger/Burger";
import SideNav from "../Side-nav/SideNav";
import SearchAndFilter from "../Search/SearchAndFilter";

const Header = ({ setCategory, setSearchWordy }) => {
  const { state } = useContext(Store);
  const { cart, userInfo } = state;

  return (
    <>
      <header className="header-div">
        <section className="head-mobile-top">
          <section className="head-sec">
            <SideNav />
            <div className="left-head">
              <ul className="left-list">
                {/* <li>
                  <VscGlobe className="header-icon" size={25} />
                </li>
                <li>
                  {" "}
                  <IoHelpCircle className="header-icon" size={25} />{" "}
                </li> */}
                <Link to="/wishList">
                  <li>
                    {" "}
                    <IoHeartOutline className="header-icon" size={25} />{" "}
                  </li>
                </Link>
                <Link to="/shopCart">
                  <li>
                    {" "}
                    <IoBagOutline className="header-icon" size={25} />
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </li>
                </Link>
              </ul>
            </div>
            <Link to="/">
              <div className="logo-head">SHEIM</div>
            </Link>
            {/* <div className="right-head">
            <ul className="right-list">
              {categories.map((c, index) => (
                <li key={index} onClick={() => handleCategory(c)}>
                  {c}
                </li>
              ))}
            </ul>
          </div> */}
            <div className="right-head">
              <p className="login-iconName">
                {userInfo ? (
                  <Link to="/profile">{userInfo.name}</Link>
                ) : (
                  <Link to="/signin">Login</Link>
                )}
              </p>
            </div>
          </section>
        </section>
        <section className="head-mobile-bottom">
          <div className="search-bar">
            {/* <SerachBAr category={category} setCategory={setCategory} /> */}
            <SearchAndFilter
              setCategory={setCategory}
              setSearchWordy={setSearchWordy}
            />
          </div>
        </section>
      </header>
    </>
  );
};

export default Header;
