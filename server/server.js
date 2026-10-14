import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// 5mb limit so the base64 images can fit in the request
app.use(express.json({ limit: "5mb" }));

// test route
app.get("/", (req, res) => {
  res.json({ message: "ShowCase API is running!" });
});

app.use("/api/products", productRoutes);

// only start the server after the database is connected
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});