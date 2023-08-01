import React, { useContext, useReducer, useState } from "react";
import { Store } from "../../store/store";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../utils/utils";
import { reducer } from "../../store/reducers";

import "./editUserForm.css";
const EditUserForm = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Paswwords dont match");
      return;
    } else {
      try {
        const { data } = await axios.put(
          "/api/users/profile",
          {
            name,
            email,
            password,
          },
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({
          type: "USER_UPDATE_SUCCESS",
        });
        ctxDispatch({ type: "USER_SIGNIN", payload: data });
        localStorage.setItem("sheim-userInfo", JSON.stringify(data));
        toast.success("User updated successfully");
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
        });
        toast.error(getError(err));
      }
    }
  };

  return (
    <div className="edit-user-form">
      <form onSubmit={submitHandler}>
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <label>Confirm Password</label>
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="mb-3">
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
