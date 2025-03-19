 // import express from "express";

 import express from "express";
 import dotenv from "dotenv";
 import connectDB from "./config/db.js";
 import cors from "cors";
 import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);


app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
