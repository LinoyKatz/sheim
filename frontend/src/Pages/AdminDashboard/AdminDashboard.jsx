import React, { useContext, useEffect, useReducer } from "react";
import "./admin-dashboard.css";
import { Link } from "react-router-dom";
import { Store } from "../../store/store";
import axios from "axios";
import { getError } from "../../utils/utils";
import Loader from "../../Components/Loader/Loader";
import Msg from "../../Components/Msg";
import { Chart } from "react-google-charts";

const adminReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, summary: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const AdminDashboard = () => {
  const [{ loading, summary, error }, dispatch] = useReducer(adminReducer, {
    loading: true,
    error: "",
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/orders/summary", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <main className="dashboard-main">
      <h1>Admin DashBoard</h1>
      <Link to="/admin/products">
        <button className="dashboard-btn">Products</button>
      </Link>
      <Link to="/admin/users">
        <button className="dashboard-btn">Users</button>
      </Link>
      <Link to="/admin/orders">
        <button className="dashboard-btn">Orders</button>
      </Link>
      <hr />
      <div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Msg color="pink">{error}</Msg>
        ) : (
          <>
            <div className="flex sumAllDshbrd">
              <div className="border">
                <h3>Users</h3>
                <h2>
                  {summary.users && summary.users[0]
                    ? summary.users[0].numUsers
                    : 0}
                </h2>
              </div>

              <div className="border">
                <h3>Orders</h3>
                <h2>
                  {summary.orders && summary.orders[0]
                    ? summary.orders[0].numOrders
                    : 0}
                </h2>
              </div>
              <div className="border">
                <h3>Total Sales</h3>
                <h2>
                  $
                  {summary.orders && summary.orders[0]
                    ? summary.orders[0].totalSales.toFixed(2)
                    : 0}
                </h2>
              </div>
            </div>

            <hr />

            <div>
              <h1>SALES</h1>
              {summary.dailyOrders.length === 0 ? (
                <Msg color="lightBlue">No Sales</Msg>
              ) : (
                <Chart
                  data={[
                    ["Date", "Sales"],
                    ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                  ]}
                  legendToggle
                  loader={<div>LOADING CHART...</div>}
                  chartType="AreaChart"
                  width="100%"
                  height="400px"
                  options={{
                    // chart: {
                    //   title: "Spend Uplift",
                    backgroundColor: "none",
                    // },
                    colors: [
                      "hotPink",
                      "lightblue",
                      "lightgreen",
                      "purple",
                      "wheat",
                      "pink",
                      "rgb(200, 154, 216)",
                      "rgb(89, 169, 215)",
                      "rgb(216, 225, 160)",
                      "salmon",
                    ],
                  }}
                />
              )}
            </div>
            <div>
              <h1>Sales For Day</h1>
              {summary.productCategories.length === 0 ? (
                <Msg color="lightBlue">No Category</Msg>
              ) : (
                <Chart
                  data={[
                    ["Category", "Products"],
                    ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                  ]}
                  loader={<div>LOADING CHART...</div>}
                  chartType="PieChart"
                  width="100%"
                  height="400px"
                  options={{
                    // chart: {
                    //   title: "Spend Uplift",
                    backgroundColor: "none",
                    // },
                    colors: [
                      "hotPink",
                      "lightblue",
                      "lightgreen",
                      "purple",
                      "wheat",
                      "pink",
                      "rgb(200, 154, 216)",
                      "rgb(89, 169, 215)",
                      "rgb(216, 225, 160)",
                      "salmon",
                    ],
                  }}
                />
              )}
            </div>
            <div>
              <h1>CATEGORIES</h1>
              {summary.productCategories.length === 0 ? (
                <Msg color="lightBlue">No Category</Msg>
              ) : (
                <Chart
                  data={[
                    ["Category", "Products"],
                    ...summary.productCategories.map((x) => [x._id, x.count]),
                  ]}
                  loader={<div>LOADING CHART...</div>}
                  chartType="PieChart"
                  width="100%"
                  height="400px"
                  options={{
                    // chart: {
                    //   title: "Spend Uplift",
                    backgroundColor: "none",
                    // },
                    colors: [
                      "hotPink",
                      "lightblue",
                      "lightgreen",
                      "purple",
                      "wheat",
                      "pink",
                      "rgb(200, 154, 216)",
                      "rgb(89, 169, 215)",
                      "rgb(216, 225, 160)",
                      "salmon",
                    ],
                  }}
                />
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;
