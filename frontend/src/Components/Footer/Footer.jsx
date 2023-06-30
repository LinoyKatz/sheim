import React from "react";

import "./footer.css";
const Footer = () => {
  /**
   * The function `backToTop` scrolls the window to the top with a smooth animation.
   */
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="footer-div">
      <div className="footer-right">
        all rights reserved to Linoy Katz
        <div className="footer-logo">SHEIM</div>
      </div>
      <div className="footer-left">
        <button className="bck-top" onClick={backToTop}>
          Top
        </button>

        <div>
          <ul className="footer-contact">
            <li>Katzlinoy27@gmail.com</li>
            <li>+972 4866 74</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
