import React from "react";

import "./wishList.css";
import { BiTrash } from "react-icons/bi";
import { BsCartPlusFill } from "react-icons/bs";
const WishList = () => {
  return (
    <section className="wishList-section">
      <h5 className="wish-list-h5">Wish List</h5>
      <ul className="wish-list">
        <li className="wishList-item">
          img <BiTrash />
          <BsCartPlusFill />
        </li>
        <li className="wishList-item">
          img <BiTrash />
          <BsCartPlusFill />
        </li>
        <li className="wishList-item">
          img <BiTrash />
          <BsCartPlusFill />
        </li>
        <li className="wishList-item">
          img <BiTrash />
          <BsCartPlusFill />
        </li>
        <li className="wishList-item">
          img <BiTrash />
          <BsCartPlusFill />
        </li>
      </ul>
    </section>
  );
};

export default WishList;
