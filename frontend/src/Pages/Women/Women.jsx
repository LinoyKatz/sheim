import React from "react";

import "./women.css";
import Header from "../../Components/Header/Header";
import Objects from "../../Components/Objects/Objects";
import Footer from "../../Components/Footer/Footer";
import IndividualIntervalsExample from "../../Components/Carousel/Carousel";
// import joinUs from "../../media/app/joinUs";
import { BiDownvote } from "react-icons/bi";
import ProductsHeadline from "../../Components/Products-headline/ProductsHeadline";
const Women = () => {
  // // Get the button:
  // let mybutton = document.getElementById("myBtn");

  // // When the user scrolls down 20px from the top of the document, show the button
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  // // When the user clicks on the button, scroll to the top of the document
  // function topFunction() {
  //   document.body.scrollTop = 0; // For Safari
  //   document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  // }
  return (
    <div>
      {/* <img className="joinUs-star" src={joinUs} alt="join" /> */}
      <div className="hero-div">
        <IndividualIntervalsExample />
      </div>
      <ProductsHeadline />
      <Objects />
      <button onclick="topFunction()" id="myBtn" title="Go to top">
        Top
      </button>
    </div>
  );
};

export default Women;
// Women;
