import React from "react";

import "./footer.css";
const Footer = () => {
  return (
    <div className="footer-div">
      <div className="footer-right">
        all rights reserved to Linoy Katz
        <div className="footer-logo">SHEIM</div>
      </div>
      <div className="footer-left">
        Contact:
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
