import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiDownvote } from "react-icons/bi";

import "./objects.css";
import SingleObject from "../SingleObject/SingleObject";
// import PictureModel1 from "../../media/3women.jpg";
import fake from "../../App";
// import { productsReducer, reducer } from "../../store/reducers";
import { reducer } from "../../store/reducers";

const Objects = () => {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    products: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="objects-section">
      {products.map((product) => (
        <SingleObject product={product} key={product._id} />
      ))}
    </div>
  );
};

export default Objects;
