import React from "react";
import "./serach-filter.css";
import { Link } from "react-router-dom";

const SearchAndFilter = ({ setCategory, setSearchWordy }) => {
  const categories = ["All", "Men", "Women", "Kids"];
  const handleCategory = (title) => {
    if (title === "All") setCategory("");
    else setCategory(title);
  };
  const handleChangeSearch = (word) => {
    setSearchWordy(word);
  };
  return (
    <div className="serch-filter-container">
      <div className="search-left">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => handleChangeSearch(e.target.value)}
        />
      </div>
      <div className="search-right">
        <ul className="">
          {categories.map((c, index) => (
            <Link to={"/"}>
              {" "}
              <li key={index} onClick={() => handleCategory(c)}>
                {c}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchAndFilter;
