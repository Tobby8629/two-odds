 // import express from "express";

 import express from "express";
 import dotenv from "dotenv";
 import connectDB from "./config/db.js";
 import cors from "cors";
 import authRoutes from "./routes/authRoutes.js";
// configure dotenv
dotenv.config();
// create express app
const app = express();

// middleware
app.use(cors());

// connect to database
connectDB();

// middleware
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

// start server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
