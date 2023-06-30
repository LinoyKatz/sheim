import React from "react";

const Msg = ({ children, color }) => {
  return <div style={{ backgroundColor: color }}>{children}</div>;
};

export default Msg;
