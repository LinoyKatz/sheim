import React, { useContext, useEffect, useReducer, useState } from "react";

import "./objectInfo.css";
import { BsCartPlusFill } from "react-icons/bs";
import { IoHeartOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { reducer } from "../../store/reducers";
// import { productsItemReducer, reducer } from "../../store/reducers";
import { toast } from "react-toastify";
import axios from "axios";
import { getError } from "../../utils/utils";
import Loader from "../../Components/Loader/Loader";
import Msg from "../../Components/Msg";
import { Store } from "../../store/store";

const ObjectInfo = () => {
  const params = useParams();
  const { slug } = params;
  const [amount, setAmount] = useState(1);
  const [outOfStock, setOutOfStock] = useState(false);

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    product: {},
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  useEffect(() => {
    const fetchProduct = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "ITEM_FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "ITEM_FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + amount : amount;
    if (product.stock < existItem?.quantity + amount) {
      toast.error(`you can buy only ${product.stock} of that product`);
      return;
    }
    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    toast.success("Item added to cart.");
    if (amount === product.stock) setOutOfStock(true);
  };

  const handleFav = () => {
    ctxDispatch({ type: "ADD_FAV_ITEM", payload: product });
    toast.success("Item added to Fav!");
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Msg color={"pink"}>{error}</Msg>
  ) : (
    <section className="objectInfo-section">
      <div className="info">
        <p>{product.title}</p>
        <img src={product.img1} />
        <BsCartPlusFill />
        <IoHeartOutline />
        <button onClick={handleFav}>add to fav</button>
      </div>

      <div className="obj-info-bottom-section">
        {product.stock < 1 ? (
          <mark>NOT IN STOCK</mark>
        ) : (
          <>
            <h2> price: {product.price}</h2>
            <h2>total price: {product.price * amount}</h2>
            <br />
            <button
              disabled={amount === 1}
              onClick={() => setAmount(amount - 1)}
            >
              -
            </button>

            <button
              disabled={amount === product.stock}
              onClick={() => setAmount(amount + 1)}
            >
              +
            </button>
            <h4>amount: {amount}</h4>
            <br />
            <button disabled={outOfStock} onClick={() => handleAddToCart()}>
              Add to Cart
            </button>
          </>
        )}
      </div>
      {cart.cartItems.length > 0 && (
        <Link to="/shopCart">
          <button className="back-btn">See your cart</button>
        </Link>
      )}
      <Link to="/">
        <button className="back-btn">Back to shop</button>
      </Link>
    </section>
  );
};

export default ObjectInfo;
