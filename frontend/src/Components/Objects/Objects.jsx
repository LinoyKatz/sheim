import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiDownvote } from "react-icons/bi";

import "./objects.css";
import SingleObject from "../SingleObject/SingleObject";
// import PictureModel1 from "../../media/3women.jpg";
import fake from "../../App";
// import { productsReducer, reducer } from "../../store/reducers";
import { reducer } from "../../store/reducers";

const Objects = ({ category, searchWord }) => {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    products: [],
  });

  const [productsToShow, setProductsToShow] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        setProductsToShow(products);
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products && searchWord && searchWord !== "") {
      setProductsToShow(
        products.filter((item) =>
          item.title.toLowerCase().includes(searchWord.toLowerCase())
        )
      );
    }

    if (products && category && category !== "") {
      if (category === "All") setProductsToShow(products);
      else {
        setProductsToShow(
          products.filter((item) => item.category.includes(category))
        );
      }
    }
    if (products && category && category !== "" && searchWord) {
      if (category === "All") setProductsToShow(products);
      else {
        setProductsToShow(
          products.filter(
            (item) =>
              item.category.includes(category) &&
              item.title.toLowerCase().includes(searchWord.toLowerCase())
          )
        );
      }
    }
  }, [category, searchWord]);

  return (
    <div className="objects-section">
      {loading && <h1>LOADING...</h1>}
      {productsToShow && productsToShow.length > 0
        ? productsToShow.map((product) => (
            <SingleObject product={product} key={product._id} />
          ))
        : products.map((product) => (
            <SingleObject product={product} key={product._id} />
          ))}

      {/* {products.map((product) => (
        <SingleObject product={product} key={product._id} />
      ))} */}
    </div>
  );
};

export default Objects;
