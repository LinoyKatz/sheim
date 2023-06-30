import React, { useState, useEffect } from "react";

const Fake = () => {
  const [fake, setFake] = useState([]);
  useEffect(() => {
    fakeStore();
  }, []);

  const fakeStore = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const jsonData = await response.json();
    // console.log(jsonData);
    setFake(jsonData);
  };
  <div></div>;
  return <></>;
};

export default Fake;
