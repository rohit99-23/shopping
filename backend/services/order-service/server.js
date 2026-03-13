import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import orderRouter from "./orderRoutes.js";

dotenv.config({ path: "./.env" });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Order service connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.use("/api/orders", orderRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = 5003;

app.listen(port, () => {
  console.log(`Order Service running at http://localhost:${port}`);
});
