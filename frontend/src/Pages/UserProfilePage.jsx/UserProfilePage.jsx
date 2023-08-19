import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Store } from "../../store/store";
import { useNavigate } from "react-router-dom";
import UserOrderList from "../../Components/UserOrderList/UserOrderList";

import "./userProfile.css";
import EditUserForm from "../../Components/EditUserForm/EditUserForm";
const UserProfilePage = () => {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [showForm, setShowForm] = useState(false);
  const signOutHandler = () => {
    if (window.confirm("are you sure you want to sign out?")) {
      ctxDispatch({ type: "USER_SIGNOUT" });
      localStorage.removeItem("sheim-userInfo");
      // localStorage.removeItem("sheim-cartItems");
      localStorage.removeItem("sheim-shippingAddress");

      navigate("/");
    }
  };

  return (
    <div className="userP">
      <h1>{userInfo.name}</h1>
      <img
        className="user-circle"
        src="https://res.cloudinary.com/arikxl/image/upload/v1690197587/Ella2023/xggepehofwnyo327mumu.png"
        alt="user-img"
      />

      <br />
      <section className="user-btn-section">
        <button onClick={signOutHandler}>sign out</button>
        <button onClick={() => setShowForm(!showForm)}>update user</button>
        <Link to="/wishList">
          {" "}
          <button>fav list</button>
        </Link>
        {userInfo.isAdmin && (
          <Link to="/admin/dashboard">
            <button>Admin Dashboard</button>
          </Link>
        )}
      </section>

      {showForm && <EditUserForm />}
      <p className="UserOrderList">
        <UserOrderList userInfo={userInfo} />
      </p>
    </div>
  );
};

export default UserProfilePage;
