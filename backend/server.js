import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import data from "./data.js";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to mongo");
  })
  .catch((error) => {
    console.error(error.message);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/seed", seedRouter);

// app.get("/api/products", (req, res) => {
//   res.send(data.products);
// });

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`serve at ${PORT}`);
});
