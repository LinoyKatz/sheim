import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./wishList.css";
import { BiTrash } from "react-icons/bi";
import { BsCartPlusFill } from "react-icons/bs";
import { Store } from "../../store/store";
import { toast } from "react-toastify";
import { AiOutlineArrowRight } from "react-icons/ai";
import Msg from "../../Components/Msg";
const WishList = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { favItems } = state;

  const removeFav = (product) => {
    if (window.confirm("Are you sure you want to delete this item?"))
      ctxDispatch({ type: "REMOVE_FAV_ITEM", payload: product });
    toast.success("Item removed from wish list!");
  };
  return (
    <>
      <section className="wishList-section">
        {favItems.length < 1 && (
          <Msg color="lightblue">
            Your wish list is empty. <br />{" "}
            <Link to="/women">
              go shopping <AiOutlineArrowRight />{" "}
            </Link>
          </Msg>
        )}
        <h5 className="wish-list-h5">Wish List</h5>
        <ul className="wish-list">
          {favItems.map((item) => (
            <li className="wishList-item" key={item.id}>
              <p>{item.title}</p>
              <img src={item.img1} />
              <button>
                <BiTrash size={20} onClick={() => removeFav(item)} />
              </button>
              {/* <BsCartPlusFill size={20} /> */}
            </li>
          ))}
        </ul>
      </section>
      <div className="btns-div">
        <Link to="/shopCart">
          <button className="back-btn">See your cart</button>
        </Link>

        <Link to="/">
          <button className="back-btn">Back to shop</button>
        </Link>
      </div>
    </>
  );
};

export default WishList;
