import React, { useEffect, useState } from "react";
import Footer from "../../Footer";
import Header from "../Home/Header";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../more/Loader";
import ProductCard from "./ProductCard";
import { clearErrors, getProduct } from "../../actions/ProductActions";
import Pagination from "react-js-pagination";
import "./Product.css";
import Typography from "@material-ui/core/Typography";
import MetaData from "../../more/Metadata";
import BottomTab from "../../more/BottomTab";
import Carousel from "react-material-ui-carousel";
import bg from "../../Assets/backgroundHome1.webp";
import bg3 from "../../Assets/backgroundHome2.jpg";
import bg4 from "../../Assets/productBanner/NEW_ARRIVALS.png";

// Các danh mục và thuộc tính khác...
const categories = ["Áo hoodie", "Others"];
const styleman = ["Áo thun nam", "Áo sơ mi nam", "Áo khoác nam", "Quần short nam", "Quần dài nam"];
const stylegirl = ["Áo thun nữ", "Áo sơ mi nữ", "Áo khoác nữ", "Quần short nữ", "Quần dài nữ", "Chân váy nữ", "Đầm nữ", "Yếm"];
const accessory = ["Túi xách", "Giày nữ", "Thắt lưng", "Kính mắt", "Giày nam", "Ví"];
const colors = ["Trắng", "Xám", "Xanh lục", "Đen", "Đỏ", "Xanh dương", "Hồng", "Xanh rêu", "Màu be", "Xanh bơ", "Nâu", "Kem", "Nâu sữa", "Hồng tím", "Hồng sữa", "Cam", "Vàng"];
const size = ["S", "M", "L", "XL", "XXL", "XXXL", "25", "26", "27", "28", "29", "30", "31", "32", "34", "35", "36"];

const Products = ({ match }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [sizes, setSizes] = useState("");

  // Hàm tạo ID sản phẩm với định dạng "SP-xxxxxxx"
  function generateProductID() {
    const randomNumber = Math.floor(Math.random() * 10000000);
    const formattedNumber = String(randomNumber).padStart(7, '0');
    return `SP-${formattedNumber}`;
  }

  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, category, color, sizes));
  }, [dispatch, keyword, currentPage, category, color, sizes, alert, error]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Sản phẩm" />
          <Header />
          <div>
            <div style={{ justifyContent: "center", alignItems: "center" }}>
              <div className="productBanner">
                <Carousel
                  style={{
                    overflow: "hidden",
                    height: "10vh",
                  }}
                >
                  <img src={bg} className="bgImgi" />
                  <img src={bg3} className="bgImgi" />
                  <img src={bg4} className="bgImgi" />
                </Carousel>
              </div>
            </div>

            {products.length === 0 ? (
              <span
                style={{
                  display: "block",
                  padding: "30px 0",
                  fontSize: "1.5rem",
                  flex: ".9",
                  textAlign: "center",
                }}
              >
                Không tìm thấy sản phẩm trong danh mục này....
              </span>
            ) : (
              <div
                className="products"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  flex: ".9",
                }}
              >
                {products &&
                  products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={{ ...product, id: generateProductID() }} // Gán ID mới cho từng sản phẩm
                    />
                  ))}
              </div>
            )}
          </div>

          <Footer />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default Products;
