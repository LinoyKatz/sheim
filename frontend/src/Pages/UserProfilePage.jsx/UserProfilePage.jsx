import React, { useContext } from "react";
import { Store } from "../../store/store";
import { useNavigate } from "react-router-dom";
import UserOrderList from "../../Components/UserOrderList/UserOrderList";

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
    <div>
      <h1>user Profile</h1>
      <button onClick={signOutHandler}>sign out</button>
      <br />
      <h2>update user</h2>
      <h2>fav list</h2>
      <UserOrderList userInfo={userInfo} />
    </div>
  );
};

export default UserProfilePage;
