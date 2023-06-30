import React, { useContext } from "react";
import { Store } from "../../store/store";
import { useNavigate } from "react-router-dom";
import UserOrderList from "../../Components/UserOrderList/UserOrderList";

import "./userProfile.css";
const UserProfilePage = () => {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const signOutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("sheim-userInfo");
    localStorage.removeItem("sheim-cartItems");
    localStorage.removeItem("sheim-shippingAddress");

    navigate("/");
  };

  return (
    <div className="userP">
      <h1>user Profile</h1>
      <button onClick={signOutHandler}>sign out</button>
      <br />
      <button>update user</button>
      <button>fav list</button>
      <p>
        <UserOrderList userInfo={userInfo} />
      </p>
    </div>
  );
};

export default UserProfilePage;
