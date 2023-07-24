import React from "react";
import "./styles.css";
import {AiFillHome} from "react-icons/ai";

const SideBar = () => {
  return (
    <div className="left-side">
      <div className="logo">
        <p className="main-logo"><span>Do</span>easily</p>
        <p className="sub-logo">Business Made Easy</p>
      </div>
      <div className="parties">
        <AiFillHome />
        <h3>Parties</h3>
        <button>-</button>
      </div>
      <div className="parties-list">
        <p>Karigar</p>
        <p>Bullion</p>
        <p>Supplier</p>
        <p>Customer</p>
      </div>
    </div>
  );
};

export default SideBar;
