import React, { useContext, useEffect, useReducer, useState } from "react";
import "./admin-edit-product.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Store } from "../../store/store";
import Loader from "../../Components/Loader/Loader";
import Msg from "../../Components/Msg";
import { getError } from "../../utils/utils";
import axios from "axios";
import { toast } from "react-toastify";

const editProductReducer = (state, action) => {
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

const AdminiEditProduct = () => {
  const params = useParams();
  const { id: productId } = params;

  const navigate = useNavigate();

  const [{ loading, loadingUpdate, error }, dispatch] = useReducer(
    editProductReducer,
    {
      loading: true,
      error: "",
    }
  );

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [img1, setImg1] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [desc, setDesc] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/products/${productId}`);
        setTitle(data.title);
        setSlug(data.slug);
        setImg1(data.img1);
        setPrice(data.price);
        setCategory(data.category);
        setBrand(data.brand);
        setStock(data.stock);
        setDesc(data.desc);

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `/api/products/${productId}`,
        {
          _id: productId,
          title,
          slug,
          img1,
          price,
          category,
          brand,
          stock,
          desc,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "UPDATE_SUCCESS" });
      toast.success("product updated successfully!");
      navigate(`/admin/products`);
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };

  return (
    <div className="edit-product-main">
      <h1>
        EDIT PRODUCT <br /> {productId}
      </h1>
      <button>
        <Link to="/admin/products">Back to products</Link>
      </button>

      {loading ? (
        <Loader />
      ) : error ? (
        <Msg color="hotPink">{error}</Msg>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Title: </label>
          <input
            type="text"
            value={title}
            required
            placeholder="Product Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <label>Slug: </label>
          <input
            type="text"
            value={slug}
            required
            placeholder="Product Slug"
            onChange={(e) => setSlug(e.target.value)}
          />
          <br />
          <label>Image: </label>
          <input
            type="text"
            value={img1}
            required
            placeholder="Product Image"
            onChange={(e) => setImg1(e.target.value)}
          />
          <br />
          <label>Category: </label>
          <input
            type="text"
            value={category}
            required
            placeholder="Product Category"
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label>Brand: </label>
          <input
            type="text"
            value={brand}
            required
            placeholder="Product Brand"
            onChange={(e) => setBrand(e.target.value)}
          />
          <br />
          <label>Price: </label>
          <input
            type="number"
            value={price}
            required
            placeholder="Product Price"
            onChange={(e) => setPrice(e.target.value)}
          />

          <br />
          <label>Stock: </label>
          <input
            type="text"
            value={stock}
            required
            placeholder="Product Stock"
            onChange={(e) => setStock(e.target.value)}
          />
          <br />
          <label>Description: </label>
          <input
            type="text"
            value={desc}
            required
            placeholder="Product Description"
            onChange={(e) => setDesc(e.target.value)}
          />
          <br />
          <button disabled={loadingUpdate} type="submit">
            UPDATE PRODUCT
          </button>
          {loadingUpdate && <div>LOADING...</div>}
        </form>
      )}
    </div>
  );
};

export default AdminiEditProduct;
