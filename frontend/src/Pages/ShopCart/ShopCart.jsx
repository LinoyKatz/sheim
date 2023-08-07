import React, { useContext } from "react";

import "./shopCart.css";
import { IoHeartOutline } from "react-icons/io5";
import { BiTrash } from "react-icons/bi";
import { IoBagOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../../store/store";
import axios from "axios";
import Layout80 from "../../layout/Layout80";
import { toast } from "react-toastify";

const ShopCart = () => {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartQty = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.stock < quantity) {
      toast.error("no more items");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };

  const removeItem = (item) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch({ type: "CART_REMOVE_ITEM", payload: item });
    }
  };

  const handleCheckout = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <Layout80>
      <div className="cart-page">
        <h5 className="shop-cart-h5">
          SHEIM CART <IoBagOutline />
        </h5>

        {cartItems.length < 1 ? (
          <div>
            Your Cart is empty <Link to="/">Go Shopping</Link>
          </div>
        ) : (
          <>
            <section className="shopCart-section">
              <ul className="shopCart-list">
                {cartItems.map((item) => (
                  <li key={item.slug} className="shopCart-item">
                    <img
                      src={item.img1}
                      alt={item.title}
                      className="cart-item-img"
                    />
                    <p className="item-title">
                      {item.title} <br /> ${item.price}
                    </p>
                    {/* <p>price: ${item.price}</p> */}
                    <section className="qty-section">
                      <button
                        disabled={item.quantity === item.stock}
                        onClick={() => updateCartQty(item, item.quantity + 1)}
                      >
                        +
                      </button>
                      <div className="qty-num">{item.quantity}</div>
                      <button
                        disabled={item.quantity === 1}
                        onClick={() => updateCartQty(item, item.quantity - 1)}
                      >
                        -
                      </button>
                    </section>
                    <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                    <button>
                      <IoHeartOutline />
                    </button>

                    <button onClick={() => removeItem(item)}>
                      <BiTrash />
                    </button>
                    <br />
                    <hr />
                  </li>
                ))}
              </ul>

              {/* <Link to="/purchasePage"> */}
              {/* </Link> */}
            </section>
            <button className="Pay-btn" onClick={handleCheckout}>
              {" "}
              PURCHACE NOW
            </button>
          </>
        )}
      </div>
    </Layout80>
  );
};

export default ShopCart;
// return (
//   <div>
//     <h1>CartPage</h1>
//     {cartItems.length < 1 ? (
//       <div>
//         Cart is empty. <Link to="/">Go Shopping</Link>
//       </div>
//     ) : (
//       cartItems.map((item) => (
//         <div key={item._id}>
//           <p>{item.title}---</p>
//           <p>price: ${item.price}</p>
//           <b>total: {item.price * item.quantity}</b>
//           <br />
//           <button
//             disabled={item.quantity === item.stock}
//             onClick={() => updateCartQty(item, item.quantity + 1)}
//           >
//             +
//           </button>
//           qty:{item.quantity}
//           <button
//             disabled={item.quantity === 1}
//             onClick={() => updateCartQty(item, item.quantity - 1)}
//           >
//             -
//           </button>
//           <br />
//           <button onClick={() => removeItem(item)}>X</button>
//           <hr />
//         </div>
//       ))
//     )}
//     <div>
//       <h3>
//         subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} Items) : ${" "}
//         {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
//       </h3>
//       <button onClick={handleCheckout}>CHECKOUT!</button>
//     </div>
//   </div>
// );
