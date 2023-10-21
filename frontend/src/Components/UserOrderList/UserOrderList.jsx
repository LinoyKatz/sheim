import React, { useEffect, useReducer } from "react";
import { reducer } from "../../store/reducers";
import { getError } from "../../utils/utils";
import axios from "axios";
import Msg from "../Msg";
import { useNavigate } from "react-router-dom";

import "./userOrderList.css";

const UserOrderList = ({ userInfo }) => {
  const navigate = useNavigate();
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "USER_ORDERS_FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          `/api/orders/mine`,

          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: "USER_ORDERS_FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({
          type: "USER_ORDERS_FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  console.log(orders);

  return (
    <div className="main-orderList-div">
      <div className="main-orderList-div">
        {loading ? (
          <h1>LOADING</h1>
        ) : error ? (
          <Msg color="pink">{error}</Msg>
        ) : orders.length < 1 ? (
          <Msg color="lightBlue">
            You dont have any orders yet. go shopping❤️
          </Msg>
        ) : (
          <>
            <h2>UserOrderList</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt}</td>
                    <td>{order.totalPrice.toFixed(2)}$</td>
                    <td>
                      {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                    </td>
                    <td>
                      {order.isDelivered
                        ? order.deliveredAt.substring(0, 10)
                        : "No"}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          navigate(`/order/${order._id}`);
                        }}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <section className="UserOrderList-mobile">
              <div className="single-order-list">
                <ul>
                  {orders.map((order) => (
                    <li>id: {order._id}</li>
                  ))}
                  {orders.map((order) => (
                    <li>DATE:{order.createdAt} </li>
                  ))}
                  // <li>TOTAL</li>
                  // <li>PAID</li>
                  // <li>DELIVERED</li>
                  // <li>ACTIONS</li>
                </ul>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default UserOrderList;
