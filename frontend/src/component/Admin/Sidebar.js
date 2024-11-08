import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import LocalOffer from "@material-ui/icons/LocalOffer";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import logo from "../../Assets/logo.webp";
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import { colors } from "@mui/material";

const Sidebar = () => {
  const button = () => {
    let items = document.querySelectorAll(".Dashboard__item");
  };

  return (
    <div className="sidebar">
      <div className="title" style={{ marginLeft: "20px" }}>
        <Link to="/">
          <h1 style={{ color: "black", fontWeight: "bold", fontFamily: "Ojuju" }}>KIANA<strong style={{ color: "red", fontFamily: "Ojuju" }}>ADMIN</strong></h1>
        </Link>
      </div>
      <Link to="/dashboard" style={{ color: "black", fontFamily: "Oswald", fontWeight: "300" }}>
        <p className="Dashboard__item" onClick={button}>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link to="/admin/products" style={{ color: "black", fontFamily: "Oswald", fontWeight: "300" }} >
        <p className="Dashboard__item">
          <PostAddIcon /> Tất cả sản phẩm
        </p>
      </Link>

      <Link to="/admin/product" style={{ color: "black", fontFamily: "Oswald", fontWeight: "300" }}>
        <p>
          <AddIcon />
          Thêm sản phẩm
        </p>
      </Link>
      <Link to="/admin/proposal" style={{ color: "black", fontFamily: "Oswald", fontWeight: "300" }}>
        <p>
          <RateReviewIcon />
          Đề xuất nhập hàng
        </p>
      </Link>

      <Link to="/admin/orders" style={{ color: "black", fontFamily: "Oswald", fontWeight: "300" }}>
        <p>
          <ListAltIcon />
          Đơn hàng
        </p>
      </Link>
      <Link to="/admin/users" style={{ color: "black", fontFamily: "Oswald", fontWeight: "300" }}>
        <p>
          <PeopleIcon /> Tài khoản
        </p>
      </Link>
      <Link to="/admin/reviews" style={{ color: "black", fontFamily: "Oswald", fontWeight: "300" }}>
        <p>
          <RateReviewIcon />
          Quản lý đánh giá
        </p>
      </Link>

      <a href="https://dashboard.stripe.com/test/dashboard" style={{ color: "black", fontFamily: "Oswald", fontWeight: "300" }}>
        <p >
          <AccountBalanceWalletOutlinedIcon /> Quản lý ví
        </p>
      </a>
    </div>
  );
};

export default Sidebar;
