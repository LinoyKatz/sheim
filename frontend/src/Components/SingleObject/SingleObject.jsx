import React from "react";

import "./singleObject.css";
// import PictureModel1 from "../../media/3women.jpg";
import { Link } from "react-router-dom";

const SingleObject = ({ product }) => {
  return (
    <div className="single-obj">
      <img
        className="single-obj-picture"
        src={product.img1}
        alt="model-picture"
      />
      <div className="bottom-obj">
        <p className="product-title">{product.title}</p>
        <p className="product-price">${product.price}</p>
      </div>
      <Link to={`/products/${product.slug}`}>
        {product.stock < 1 ? (
          <button className="out-of-stck-btn" disabled={product.stock === 0}>
            OUT OF STOCK
          </button>
        ) : (
          <button className="buy-btn">BUY</button>
        )}
      </Link>
    </div>
  );
};

export default SingleObject;
