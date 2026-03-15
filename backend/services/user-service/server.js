import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./userRoutes.js";

dotenv.config({ path: "./.env" });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("User service connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.port || 5001;

app.listen(port, () => {
  console.log(`User Service running at http://localhost:${port}`);
});

console.log("Mongo URI:", process.env.MONGODB_URI);
