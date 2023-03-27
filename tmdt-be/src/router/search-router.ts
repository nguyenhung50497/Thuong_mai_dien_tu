import productController from "../controller/ProductController";
import {Router} from "express";

export const searchRouter = Router();

searchRouter.get('/all',productController.getAll);
searchRouter.get('/products',productController.search);
