import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../store/store";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../../Components/CheckoutSteps.jsx";

import "./shipping.css";
const ShippingPage = () => {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, cartItems },
    userInfo,
  } = state;

  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [zipcode, setZipcode] = useState(shippingAddress.zipcode || "");

  useEffect(() => {
    if (!userInfo || cartItems.length < 1) {
      navigate("/signin");
    }
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        zipcode,
      },
    });
    localStorage.setItem(
      "sheim-shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        zipcode,
      })
    );
    navigate("/payment");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 />
      <h1>shipping address</h1>
      <section className="address-section" onSubmit={handleSubmit}>
        <form className="address-form">
          <label>Full Name: </label>
          <input
            type="text"
            value={fullName}
            required
            placeholder="Full Name"
            onChange={(e) => setFullName(e.target.value)}
          />
          <br />
          <label>Address: </label>
          <input
            type="text"
            value={address}
            required
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <br />
          <label>City: </label>
          <input
            type="text"
            value={city}
            required
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
          />
          <br />
          <label>Zipcode: </label>
          <input
            type="text"
            value={zipcode}
            required
            placeholder="Zipcode"
            onChange={(e) => setZipcode(e.target.value)}
          />
          <br />
          <button type="submit">Continue</button>
        </form>
      </section>
    </div>
  );
};

export default ShippingPage;
