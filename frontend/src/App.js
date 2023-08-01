import React, { useState, useEffect, useReducer } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

import axios from "axios";
import HomeDecor from "./Pages/HomeDecor/HomeDecor";
import Kids from "./Pages/Kids/Kids";
import Men from "./Pages/Men/Men";
import Women from "./Pages/Women/Women";
import Header from "./Components/Header/Header";
// import Hero from "./Components/Hero/Hero";
// import Objects from "./Components/Objects/Objects";
import Footer from "./Components/Footer/Footer";
import ShopCart from "./Pages/ShopCart/ShopCart";
import WishList from "./Pages/WishList/WishList";
import IndividualIntervalsExample from "./Components/Carousel/Carousel";
import ObjectInfo from "./Pages/ObjectInfo/ObjectInfo";
import PurchasePage from "./Pages/PurchasePage/PurchasePage";
import { productsReducer } from "./store/reducers";
import Space from "../../frontend/src/Components/Space/Space";
import SignIn from "./Pages/SignIn/SignIn.jsx";
import SignUp from "./Pages/SignUp/SignUp";
import ShippingPage from "./Pages/ShippingPage/ShippingPage";
import UserProfilePage from "./Pages/UserProfilePage.jsx/UserProfilePage";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import OrderPage from "./Pages/OrderPage/OrderPage";
import SearchPage from "./Pages/Serach/SearchPage";
import SideNav from "./Components/Side-nav/SideNav";
// import WelcomeSec from "./Components/welcomeSec/WelcomeSec";
// import SingleObject from "./Components/SingleObject/SingleObject";

function App() {
  return (
    <div className="App">
      <ToastContainer position="bottom-center" limit={1} />
      {/* <BrowserRouter> */}
      <Header />
      <Space />
      {/* <SideNav /> */}
      <Routes>
        <Route path="/shopCart" element={<ShopCart />} />
        <Route path="/wishList" element={<WishList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/products/:slug" element={<ObjectInfo />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/purchasePage" element={<PurchasePage />} />
        <Route path="/" element={<Women />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/men" element={<Men />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/homeDecor" element={<HomeDecor />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="*" element={<Women />} />
      </Routes>
      {/* <Space /> */}
      <Footer />
      {/* </BrowserRouter> */}
    </div>
  );
}

// export default { App, fake() };
export default App;
