import React, { useContext, useEffect, useReducer } from "react";

import "./purchasePage.css";
import SingleObject from "../../Components/SingleObject/SingleObject";
import CheckoutSteps from "../../Components/CheckoutSteps";

import { Store } from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { reducer } from "../../store/reducers";
import { getError } from "../../utils/utils";

const PurchasePage = () => {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  //  * The function `round2` rounds a number to two decimal places.
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 200 ? round2(0) : round2(30);
  cart.taxPrice = round2((cart.itemsPrice + cart.shippingPrice) * 0.17);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, navigate]);

  const handlePlaceOrder = async () => {
    try {
      dispatch({ type: "ORDER_CREATE_REQUEST" });
      const { data } = await axios.post(
        "api/orders",
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: "CART_CLEAR" });
      dispatch({ type: "ORDER_CREATE_SUCCESS" });
      localStorage.removeItem("sheim-cartItems");

      navigate(`/order/${data.order._id}`);
    } catch (error) {
      dispatch({ type: "ORDER_CREATE_FAIL" });
      toast.error(getError(error));
    }
  };
  return (
    <div className="purchase-page">
      <CheckoutSteps step1 step2 step3 step4 />

      <div className=" big-div">
        <div className="whitebordr" style={{ flex: "5" }}>
          <h1>Preview order</h1>
          <div className="shipping-div">
            <h2>shipping</h2>
            <p>{cart.shippingAddress.fullName}</p>
            <p>
              {cart.shippingAddress.address} ,{cart.shippingAddress.city}
            </p>
            <p>Zip Code: {cart.shippingAddress.zipcode}</p>
            <button className="prchs-pge-btn">
              <Link to="/shipping">EDIT</Link>
            </button>
          </div>
          <hr />

          <div className="paymentMeth-div">
            <h2>Payment method</h2>
            <p>{cart.paymentMethod}</p>
            <button className="prchs-pge-btn">
              <Link to="/payment">EDIT</Link>
            </button>
          </div>
          <hr />

          <div className="CartItems-div">
            <h2>Cart Items</h2>

            {cart.cartItems.map((item) => (
              <div key={item._id} className="flex center CartItems">
                <article className="product-desc">
                  <img className="sml-img" src={item.img1} alt={item.title} />
                  ||<Link to={`/product/${item.slug}`}> {item.title} </Link>
                </article>
                <div className="product-details">
                  {" "}
                  <p> || qty: {item.quantity}</p>
                  <p> || $ {item.price}</p>
                  <p> ||total: $ {item.price * item.quantity}</p>
                  <hr />
                </div>
              </div>
            ))}
            <button className="prchs-pge-btn">
              <Link to="/shopCart">EDIT</Link>
            </button>
          </div>
          <hr />
        </div>

        <div style={{ flex: "2" }} className="col summery">
          <h2>order summery</h2>
          <p> || items: ${cart.itemsPrice?.toFixed(2)}</p>
          <p> || shipping: ${cart.shippingPrice?.toFixed(2)}</p>
          <p> || tax: ${cart.taxPrice?.toFixed(2)}</p>
          <p>
            <mark>|| total: ${cart.totalPrice?.toFixed(2)}</mark>{" "}
          </p>
          <button
            className="prchs-pge-btn"
            disabled={cart.cartItems.length < 1}
            onClick={handlePlaceOrder}
          >
            Place order
          </button>
          {loading && <p>LOADING...</p>}
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;
