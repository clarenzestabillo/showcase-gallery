import { Router } from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = Router();

// /api/products
router.route("/").get(getProducts).post(createProduct);

// /api/products/:id
router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);

export default router;