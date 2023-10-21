import express from "express";

import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";

import { isAuth, isAdmin } from "../utils/utils.js";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.get("/slug/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

// CREATE NEW PRODUCT WITH FAKE DETAILS
productRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Product({
      title: "sample name " + Date.now(),
      slug: "sample-name-" + Date.now(),
      img1: "https://th.bing.com/th/id/R.0761f7ec8d43ca424fa078775b322cc9?rik=vW0JriMSX%2fJESw&riu=http%3a%2f%2fmpmco.com%2fwp-content%2fuploads%2f2018%2f02%2fplaceholder.jpg&ehk=Ma%2beNkBomEexasJFRkD57DmdZ4UvtjUYu%2f5L%2bkSG4as%3d&risl=&pid=ImgRaw&r=0",
      price: 0,
      category: "sample category",
      brand: "sample brand",
      stock: 0,
      rating: 0,
      numOfReviews: 0,
      desc: "sample description",
    });
    const product = await newProduct.save();
    res.send({ message: "Product Created", product });
  })
);

// EDIT PRODUCT FROM ADMIN PAGE
productRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.title = req.body.title;
      product.slug = req.body.slug;
      product.price = req.body.price;
      product.img1 = req.body.img1;
      product.images = req.body.images;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.stock = req.body.stock;
      product.desc = req.body.desc;
      await product.save();
      res.send({ message: "Product Updated" });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

// DELETE PRODUCT _ADMIN
productRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.send({ message: "Product Deleted" });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

export default productRouter;
