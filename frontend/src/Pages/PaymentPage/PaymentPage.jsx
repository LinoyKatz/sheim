import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import "./paymentPage.css";
import SingleObject from "../../Components/SingleObject/SingleObject";
import CheckoutSteps from "../../Components/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { Store } from "../../store/store";
// import { PiPaypalLogoBold } from "react-icons/io";

const PurchasePage = () => {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { paymentMethod, shippingAddress },
  } = state;

  const [paymentMethodNAme, setPaymentMethod] = useState(
    paymentMethod || "cash"
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodNAme });
    localStorage.setItem("sheim-paymentMethod", paymentMethodNAme);
    navigate("/purchasePage");
  };

  const handleCard = (e) => {
    e.preventDefault();
    toast.info("Thank you!");
    navigate("/purchasePage");
  };
  const popAlert = () => {
    toast.warning("You dont have to do that... 💩");
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <h3 className="purchase-details-h4">Payment-details:</h3>
      <div className="purchase-div">
        <section className="purchase-details-left">
          <form className="radio-form" onSubmit={handleSubmit}>
            <div className="radio-box">
              <input
                type="radio"
                checked={paymentMethodNAme === "cash"}
                value="cash"
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                }}
              />
              <label>Cash</label>
            </div>
            <div className="radio-box">
              <input
                type="radio"
                checked={paymentMethodNAme === "Credit Card"}
                value="Credit Card"
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                }}
              />
              <label>Credit Card</label>
            </div>
            <div className="radio-box">
              <input
                type="radio"
                disabled
                checked={paymentMethodNAme === "paypal"}
                value="paypal"
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                }}
              />
              <label>PayPal (Soon)</label>
            </div>
            <button type="submit">Checkout</button>
          </form>
        </section>

        {paymentMethodNAme === "Credit Card" && (
          <form className="payment-details-form" onSubmit={handleCard}>
            <input
              onChange={popAlert}
              type="text"
              name="fName"
              id="fName"
              placeholder="First Name"
            />
            <input
              type="text"
              name="lName"
              id="lName"
              placeholder="Last Name"
            />
            <input type="email" name="email" id="email" placeholder="E-Mail" />
            <label htmlFor="card-details">card details:</label>
            <input
              type="number"
              name="paymentCard"
              id="paymentCard"
              placeholder="3345 XXXX XXXX XXXX"
            />
            <input type="date" name="date" id="date" />
            <input type="number" name="cvv" id="cvv" placeholder="CVV" />
            <button className="pay-btn" type="submit">
              PAY NOW
            </button>
            {/* <button className="bck-to-crt-btn"> Back to order details</button> */}
          </form>
        )}
      </div>
    </>
  );
};

export default PurchasePage;
