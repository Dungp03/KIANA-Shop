import React from 'react';
import "./Favourite.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteFavouriteItemsToCart, deleteOfferFavouriteItemsToCart } from "../../actions/FavouriteAction"
import { Typography } from "@mui/material";
import RemoveShoppingCartIcon from "@material-ui/icons/FavoriteBorder";
import { Link } from "react-router-dom";
import FavouriteItemsCard from './FavouriteItemsCard.jsx';
import MetaData from '../../more/Metadata';
import Loading from '../../more/Loader';
import { useState } from "react";
import BottomTab from '../../more/BottomTab';
import Header from '../Home/Header';

const Favourite = ({ history }) => {
  const dispatch = useDispatch();

  const { loading } = useSelector(
    (state) => state.productDetails
  );
  const { favouriteItems } = useSelector((state) => state.favourite);

  const deleteFavouriteItems = (id) => {
    dispatch(deleteFavouriteItemsToCart(id));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <h2 style={{ textAlign: "center", padding: "5px", fontSize: "29px" }}>DANH MỤC YÊU THÍCH</h2>
          <MetaData title="Sản phẩm yêu thích" />
          {favouriteItems.length === 0 ? (
            <div className="emptyCart">
              <RemoveShoppingCartIcon />
              <Typography>Không có sản phẩm yêu thích!!!</Typography>
              <Link to="/products">Mua ngay!!!</Link>
              <BottomTab />
            </div>
          ) : (
            <>
              <div className="favouritesPage">
                <div className="favouritesHeader">
                  <p>Sản phẩm</p>
                  <p>Tên sản phẩm</p>
                  <p>Giá</p>
                  <p>Trạng thái</p>
                  <p>Tùy chọn</p>
                </div>
                {favouriteItems &&
                  favouriteItems.map((item) => (
                    <div className="favouritesContainer" key={item.product}>
                      <FavouriteItemsCard item={item} deleteFavouriteItems={deleteFavouriteItems} />
                    </div>
                  ))
                }
                <BottomTab />
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}

export default Favourite
