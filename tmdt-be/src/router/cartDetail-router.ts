import { Router } from "express";
import { auth } from "../middleware/auth";
import { userAuth } from "../middleware/userAuth";
import cartDetailController from "../controller/CartDetailController";
import {searchRouter} from "./search-router";
export const cartDetailRouter = Router();
cartDetailRouter.use(auth);
cartDetailRouter.get("/stats",cartDetailController.salesStatsCartDetail)
cartDetailRouter.get("/", cartDetailController.getAllCartDetail);
cartDetailRouter.get("/find-by-id/:id", cartDetailController.findCartDetailById);
cartDetailRouter.get("/find-by-user/:id", cartDetailController.findCartDetailByIdUser);
cartDetailRouter.post("/", cartDetailController.createCartDetail);
cartDetailRouter.put("/:id", cartDetailController.updateCartDetail);
cartDetailRouter.delete("/:id", cartDetailController.deleteCartDetail);
cartDetailRouter.get("/find-by-status", cartDetailController.findByStatus);
