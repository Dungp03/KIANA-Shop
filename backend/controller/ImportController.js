const Import = require("../models/ImportModel");
const Product = require("../models/ProductModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Tạo phiếu nhập hàng
exports.createImport = catchAsyncErrors(async (req, res, next) => {
  const { products, supplier, note } = req.body;

  // Tạo importId với format NH-XXXXXX
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  const importId = `NH-${randomNumber.toString().padStart(6, '0')}`;

  // Tính tổng tiền
  let totalAmount = 0;
  for (const item of products) {
    totalAmount += item.quantity * item.importPrice;
    
    // Cập nhật số lượng trong kho
    const product = await Product.findById(item.product);
    if (!product) {
      return next(new ErrorHandler("Sản phẩm không tồn tại", 404));
    }
    product.Stock += item.quantity;
    await product.save();
  }

  const importDoc = await Import.create({
    importId,
    products,
    totalAmount,
    supplier,
    note,
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    import: importDoc,
  });
});

// Lấy danh sách phiếu nhập
exports.getAllImports = catchAsyncErrors(async (req, res, next) => {
  const imports = await Import.find()
    .populate("products.product", "name productId")
    .populate("createdBy", "name");

  res.status(200).json({
    success: true,
    imports,
  });
});

// Lấy chi tiết một phiếu nhập
exports.getImportDetails = catchAsyncErrors(async (req, res, next) => {
  const importDoc = await Import.findById(req.params.id)
    .populate("products.product", "name productId")
    .populate("createdBy", "name");

  if (!importDoc) {
    return next(new ErrorHandler("Không tìm thấy phiếu nhập", 404));
  }

  res.status(200).json({
    success: true,
    import: importDoc,
  });
}); 