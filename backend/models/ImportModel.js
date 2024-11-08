const mongoose = require("mongoose");

const importSchema = new mongoose.Schema({
  importId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      productId: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      importPrice: {
        type: Number,
        required: true,
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  supplier: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  importDate: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("Import", importSchema); 