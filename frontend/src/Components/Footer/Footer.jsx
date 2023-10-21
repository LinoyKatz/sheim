import React from "react";

import "./footer.css";
import { AiOutlineCaretUp, AiOutlineFontSize } from "react-icons/ai";
const Footer = () => {
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
        <div className="footer-logo">
          <p>SHEIM</p>
        </div>
        <div className="cpyright"> all rights reserved to Linoy Katz</div>
        <div>
          <ul className="footer-contact">
            <li>Katzlinoy27@gmail.com</li>
            <li>+972 4866 74</li>
          </ul>
        </div>
      </div>
      <div className="footer-left">
        <button className="bck-top" onClick={backToTop}>
          <AiOutlineCaretUp size={40} />
        </button>
      </div>
    </div>
  );
};

export default Footer;
