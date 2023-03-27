import { Router } from "express";
import productController from "../controller/ProductController";

export const categoryRouter = Router();
categoryRouter.get("/", productController.findCategory);

