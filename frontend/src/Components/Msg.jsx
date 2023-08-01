import React from "react";

import "./msg.css";
const Msg = ({ children, color }) => {
  return (
    <div className="msg-order-list" style={{ backgroundColor: color }}>
      {children}
    </div>
  );
};

export default Msg;
