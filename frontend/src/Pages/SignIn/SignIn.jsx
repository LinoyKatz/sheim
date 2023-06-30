import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import "./signIn.css";
import { Store } from "../../store/store";
import { getError } from "../../utils/utils";

const SignIn = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/signin", {
        email,
        password,
      });
      ctxDispatch({ type: "USER_LOGIN", payload: data });
      localStorage.setItem("sheim-userInfo", JSON.stringify(data));
      toast.success("You loged in!");
      navigate(redirect || "/");
      // window.location.reload();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <section className="login-section">
      <h2 className="login-h2">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="mail"
          placeholder="enter mail"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="enter password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="signIn-button" type="submit">
          Sign In!
        </button>
      </form>

      <p>
        New costumer?
        <Link to={`/signup?redirect=${redirect}`}>Create your acount</Link>
      </p>
    </section>
  );
};

export default SignIn;
