import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Msg from "../../Components/Msg";

import "./signUp.css";
import { Store } from "../../store/store";
import { getError } from "../../utils/utils";

const SignUp = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [email, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords dont match");
      return;
    }
    if (!validateEmail(email)) {
      setErrorMsg("password");
      toast.error(errorMsg);
      toast.warning("Please enter a valid email");
      return;
    }
    if (!validatePhoneNumber(phone)) {
      toast.warning(
        "Phone number must be 10 digits lenght, with 2-3 digits of area-code. and a separetor (-)"
      );
      return;
    }
    if (!validatePassword(password)) {
      toast.warning(
        "Password must contain capital letter, small letter, 4 numbers and a spaicel sign and minimum 8 charecters"
      );
      return;
    }

    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        phone,
        password,
      });
      ctxDispatch({ type: "USER_LOGIN", payload: data });
      localStorage.setItem("sheim-userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (error) {
      toast.error(getError(error));
    }
  };

  function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&<>{}*]).{8,}$/;
    return regex.test(password);
  }

  function validatePhoneNumber(phoneNumber) {
    const regex = /^(0\d{2}[ -]\d{7})$/;
    return regex.test(phoneNumber);
  }
  function validateEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  return (
    <section className="signUp-section">
      <h2 className="signUp-h2">Sign-Up</h2>
      <form onSubmit={handleSubmit}>
        {/* <div className="admin-box">
          <label>Admin?</label>
          <input type="checkbox" />
        </div> */}

        <input
          required
          type="text"
          placeholder="enter name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          required
          type="mail"
          placeholder="enter mail"
          onChange={(e) => setMail(e.target.value)}
        />

        <input
          required
          type="phone"
          placeholder="enter phone"
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          required
          type="password"
          placeholder="enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMsg === "password" && (
          // <Msg color="orange">the password is ...</Msg>
          <h1>aaa</h1>
        )}
        <input
          required
          type="password"
          placeholder="confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="signUp-button" type="submit">
          Sign up!
        </button>
      </form>
      <p className="alrdy-have-accnt-p">
        Already have an account? <br />
        <Link to={`/signin?redirect=${redirect}`}>
          {" "}
          <span>LOGIN</span>
        </Link>
      </p>
    </section>
  );
};

export default SignUp;
