import React from "react";

import "./productsHeadline.css";
import { BiDownvote } from "react-icons/bi";
const ProductsHeadline = () => {
  return (
    <h4 className="products-h4">
      Products that may interest you <BiDownvote />
    </h4>
  );
};

export default ProductsHeadline;
