import "./admin-edit-user.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../../store/store";
import { useContext, useEffect, useReducer, useState } from "react";
import { getError } from "../../utils/utils";
import Loader from "../../Components/Loader/Loader";
import Msg from "../../Components/Msg";

const editUserReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

const AdminiEditUser = () => {
  const params = useParams();
  const { id: userId } = params;

  const navigate = useNavigate();

  const [{ loading, loadingUpdate, error }, dispatch] = useReducer(
    editUserReducer,
    {
      loading: true,
      error: "",
    }
  );

  const [name, setName] = useState("");
  const [email, setSEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setName(data.name);
        setSEmail(data.email);
        setIsAdmin(data.isAdmin);

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userId, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `/api/users/${userId}`,
        {
          _id: userId,
          name,
          email,
          isAdmin,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "UPDATE_SUCCESS" });
      toast.success("User updated successfully!");
      navigate(`/admin/users`);
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };

  return (
    <div className="edit-product-main">
      <h1>Edit User: {userId.slice(-6)}</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Msg color="hotpink">{error}</Msg>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            required
            placeholder="User Name"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label>Email: </label>
          <input
            type="email"
            value={email}
            required
            placeholder="User Email"
            onChange={(e) => setSEmail(e.target.value)}
          />
          <br />
          <label>Is Admin: </label>
          <input
            type="checkbox"
            checked={isAdmin}
            value={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          <br />

          <button disabled={loadingUpdate} type="submit">
            UPDATE USER
          </button>
          {loadingUpdate && <div>LOADING...</div>}
        </form>
      )}
    </div>
  );
};

export default AdminiEditUser;
