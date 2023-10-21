import React, { useContext, useEffect, useReducer } from "react";
import orderReducer from "../../store/reducers";

import "./orderPage.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Msg from "../../Components/Msg";
import { Store } from "../../store/store";
import { getError } from "../../utils/utils";
import axios from "axios";
import { toast } from "react-toastify";

const OrderPage = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(orderReducer, {
    loading: true,
    order: {},
    error: "",
    successPay: false,
    loadingPay: false,
    successDeliver: false,
    loadingDeliver: false,
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    if (!userInfo) {
      return navigate("/login");
    }

    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
      if (successDeliver) {
        dispatch({ type: "DELIVER_RESET" });
      }
    }
  }, [order, userInfo, orderId, navigate, successPay, successDeliver]);

  const handlePay = async () => {
    try {
      dispatch({ type: "PAY_REQUEST" });
      const { data } = await axios.put(
        `/api/orders/${order._id}/pay`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "PAY_SUCCESS", payload: data });
      toast.success("Order is Paid!");
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: "PAY_FAIL" });
    }
  };

  const handleDeliver = async () => {
    try {
      dispatch({ type: "DELIVER_REQUEST" });
      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "DELIVER_SUCCESS", payload: data });
      toast.success("Order is Delivered!");
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: "DELIVER_FAIL" });
    }
  };

  return loading ? (
    <h1>LOADING...</h1>
  ) : error ? (
    <Msg color="pink">{error}</Msg>
  ) : (
    <section className="order-section">
      <section className="left-sec">
        <h1> order {order._id.slice(-6)}</h1>
        {userInfo.isAdmin && (
          <div className="btns-panel ship-info">
            <button onClick={handlePay} disabled={loadingPay}>
              ADMIN- MARK AS PAID
            </button>
            <button onClick={handleDeliver} disabled={loadingDeliver}>
              ADMIN- MARK AS DELIVERED
            </button>
          </div>
        )}

        <div className="flex">
          <div style={{ flex: "5" }}>
            <div className="paymnt-info">
              <h2>Payment method</h2>
              <p>{order.paymentMethod}</p>
              {order.isPaid ? (
                <Msg color="lightgreen">Paid at {order.paidAt}</Msg>
              ) : (
                <Msg color="pink">Not Paid</Msg>
              )}
            </div>

            <div className="ship-info">
              <h1>shipping</h1>
              <p>{order.shippingAddress.fullName}</p>
              <p>
                {order.shippingAddress.address} ,{order.shippingAddress.city}
              </p>
              <p>{order.shippingAddress.zipcode}</p>
              {order.isDelivered ? (
                <Msg color="lightgreen">Deliverd at {order.deliveredAt}</Msg>
              ) : (
                <Msg color="pink">Not Delivered</Msg>
              )}
            </div>

            <hr />
            <div>
              <div style={{ flex: "2" }} className="col">
                <h2>order summery</h2>
                <p> || items: ${order.itemsPrice?.toFixed(2)}</p>
                <p> || shipping: ${order.shippingPrice?.toFixed(2)}</p>
                <p> || tax: ${order.taxPrice?.toFixed(2)}</p>
                <p>
                  <mark>|| total: ${order.totalPrice?.toFixed(2)}</mark>{" "}
                </p>
                {loading && <p>LOADING...</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="right-sec">
        <h2>ORDER ITEMS</h2>

        {order.orderItems.map((item) => (
          <div key={item._id} className="flex center orderItems">
            <img className="sml-img" src={item.img1} alt={item.title} />
            ||<Link to={`/product/${item.slug}`}> {item.title} </Link>
            <p> || qty: {item.quantity}</p>
            <p> || $ {item.price}</p>
            <p> ||total: $ {item.price * item.quantity}</p>
          </div>
        ))}
        <div className="place-order-btnArea">
          <button className="bck-to-dshbrd-btn">
            <Link to="/profile"> My orders</Link>
          </button>
          <button className="bck-to-shop-btn">
            <Link to="/"> Back to shop</Link>
          </button>
        </div>
      </section>
    </section>
  );
};
export default OrderPage;
