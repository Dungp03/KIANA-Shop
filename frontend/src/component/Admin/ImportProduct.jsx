import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { clearErrors, createImport } from "../../actions/importAction";
import { getAllProducts } from "../../actions/productAction";
import "./ImportProduct.css";

const ImportProduct = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newImport);
  const { products } = useSelector((state) => state.products);

  const [supplier, setSupplier] = useState("");
  const [note, setNote] = useState("");
  const [importProducts, setImportProducts] = useState([
    { product: "", quantity: 1, importPrice: 0 }
  ]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Nhập hàng thành công");
      history.push("/admin/imports");
      dispatch({ type: "CREATE_IMPORT_RESET" });
    }

    dispatch(getAllProducts());
  }, [dispatch, alert, error, success, history]);

  const addProductField = () => {
    setImportProducts([
      ...importProducts,
      { product: "", quantity: 1, importPrice: 0 }
    ]);
  };

  const removeProductField = (index) => {
    const list = [...importProducts];
    list.splice(index, 1);
    setImportProducts(list);
  };

  const handleProductChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...importProducts];
    list[index][name] = value;
    setImportProducts(list);
  };

  const importSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = {
      supplier,
      note,
      products: importProducts,
    };

    dispatch(createImport(myForm));
  };

  return (
    <>
      <MetaData title="Nhập hàng" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={importSubmitHandler}
          >
            <h1>Phiếu nhập hàng</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Nhà cung cấp"
                required
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Ghi chú"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            {importProducts.map((product, index) => (
              <div key={index} className="productImportField">
                <div>
                  <AccountTreeIcon />
                  <select
                    name="product"
                    value={product.product}
                    onChange={(e) => handleProductChange(e, index)}
                    required
                  >
                    <option value="">Chọn sản phẩm</option>
                    {products &&
                      products.map((prod) => (
                        <option key={prod._id} value={prod._id}>
                          {prod.name} ({prod.productId})
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <StorageIcon />
                  <input
                    type="number"
                    placeholder="Số lượng"
                    name="quantity"
                    required
                    value={product.quantity}
                    onChange={(e) => handleProductChange(e, index)}
                    min="1"
                  />
                </div>

                <div>
                  <AttachMoneyIcon />
                  <input
                    type="number"
                    placeholder="Giá nhập"
                    name="importPrice"
                    required
                    value={product.importPrice}
                    onChange={(e) => handleProductChange(e, index)}
                    min="0"
                  />
                </div>

                {importProducts.length > 1 && (
                  <Button onClick={() => removeProductField(index)}>Xóa</Button>
                )}
              </div>
            ))}

            <Button onClick={addProductField}>Thêm sản phẩm</Button>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Tạo phiếu nhập
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ImportProduct; 