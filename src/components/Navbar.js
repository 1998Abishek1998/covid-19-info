import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar_title">
        <h1>Covid-19 Info</h1>
        <h5>By Abishek Timsina</h5>
        <span>
          Created with
          <FavoriteIcon className="navbar_heartIcon" />
        </span>
      </div>
      <div className="navbar_routing">
        <div>
          <Link className="navbar_worldwide" to="/">
            <h4>All cases</h4>
          </Link>
        </div>
        <div>
          <Link className="navbar_AllInfo" to="/AllInfo">
            <h4>List-Info</h4>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
