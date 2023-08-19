import React, { useContext, useEffect, useReducer } from "react";
import "./admin-products.css";
import { Store } from "../../store/store";
import axios from "axios";
import { getError } from "../../utils/utils";
import Loader from "../../Components/Loader/Loader";
import Msg from "../../Components/Msg";

const productsReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const AdminProducts = () => {
  const [{ loading, products, error }, dispatch] = useReducer(productsReducer, {
    loading: true,
    error: "",
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div className="admin-products-main">
      <h1>Products:</h1>
      <button>CREATE NEW PRODUCT</button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Msg color="hotPink">{error}</Msg>
      ) : (
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Id</th>
              <th>TITL:</th>
              <th>IMG</th>
              <th>STOCK</th>
              <th>PRICE:</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product._id.slice(-5)}</td>
                <td>{product.title}</td>
                <td>
                  <img alt={product.title} src={product.img1} id="table-img" />
                </td>
                <td>{product.stock}</td>
                <td>{product.price}</td>
                <td>
                  <button>EDIT</button>
                  <button>DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminProducts;
