import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    img1: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true },
    numOfReviews: { type: Number, required: true },
    desc: { type: String, required: true },
    isTop4: { type: Boolean, require: false },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
