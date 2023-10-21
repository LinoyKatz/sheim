import React, { useContext, useEffect, useReducer } from "react";
import "./admin-products.css";
import axios from "axios";
import { Store } from "../../store/store";
import { getError } from "../../utils/utils";
import Loader from "../../Components/Loader/Loader";
import Msg from "../../Components/Msg";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

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

    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreate: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false, error: action.payload };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

const AdminProducts = () => {
  const [
    { loading, products, error, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(productsReducer, {
    loading: true,
    error: "",
  });
  const navigate = useNavigate();

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    window.scrollTo(0, 0);
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
  }, [userInfo, successDelete]);

  const handleCreate = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(
        `/api/products/`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      toast.success("PRODUCT CREATED SUCCESSFULLY");
      dispatch({ type: "CREATE_SUCCESS" });
      navigate(`/admin/product/${data.product._id}`);
    } catch (err) {
      toast.error(getError(err));
      dispatch({
        type: "CREATE_FAIL",
        payload: getError(err),
      });
    }
  };

  const handleDelete = async (product) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch({ type: "DELETE_REQUEST" });
      try {
        await axios.delete(`/api/products/${product._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success("Product deleted successfully");
        dispatch({ type: "DELETE_SUCCESS" });
      } catch (err) {
        toast.error(getError(err));
        dispatch({ type: "DELETE_FAIL" });
      }
    }
  };

  return (
    <div className="admin-products-main">
      <h1>Products:</h1>
      <button
        className="new-prdct-btn"
        disabled={loadingCreate}
        onClick={handleCreate}
      >
        CREATE NEW PRODUCT
      </button>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
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
              <tr className="tr-products" key={product._id}>
                <td>{index + 1}</td>
                <td>{product._id.slice(-5)}</td>
                <td>{product.title}</td>
                <td>
                  <img alt={product.title} src={product.img1} id="table-img" />
                </td>
                <td>{product.stock}</td>
                <td>{product.price}$</td>
                <td>
                  <Link to={`/admin/product/${product._id}`}>
                    <button>EDIT</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product)}
                    disabled={loadingDelete}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="bck-to-dshbrd">
        <Link to="/admin/dashboard">Back to Dashboard</Link>
      </button>
    </div>
  );
};

export default AdminProducts;
