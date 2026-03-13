import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./seedRoutes.js";
import productRouter from "./productRoutes.js";
import uploadRouter from "./uploadRoutes.js";

dotenv.config({ path: "./.env" });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Product service connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/keys/google", (req, res) => {
  res.send({ key: process.env.GOOGLE_API_KEY || "" });
});

app.use("/api/upload", uploadRouter);
app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = 5002;

app.listen(port, () => {
  console.log(`Product Service running at http://localhost:${port}`);
});

console.log("Mongo URI:", process.env.MONGODB_URI);
