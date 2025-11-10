
import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";

import authRoutes from "./routes/authRoute.js";
import employeeRoutes from "./routes/employeeRoute.js"; 

dotenv.config();
const app = express();



app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes); 

app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/employee_crud_db")
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
