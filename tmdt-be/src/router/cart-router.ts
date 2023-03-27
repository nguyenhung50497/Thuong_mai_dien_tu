import { Router } from "express";
import CartController from "../controller/CartController";

export const cartRouter = Router();
cartRouter.get("/find-by-idUser/:id", CartController.findByIdUser);
cartRouter.get("/find-by-idUser-done/:id", CartController.findByIdUserDone);
cartRouter.get("/:id", CartController.getAllCartShop);
cartRouter.post("/all/detail-cart", CartController.getDetailCart);
cartRouter.post("/:id", CartController.searchByStatusCart);
cartRouter.post("/search-by-name/:id", CartController.searchName);
cartRouter.post("/search-by-idCart/:id", CartController.searchIdCart);
cartRouter.post("/search-by-phone/:id", CartController.searchPhone);
cartRouter.get("/order-status-sending/:id", CartController.orderStatusSending);
cartRouter.get("/order-status-refunds/:id", CartController.orderStatusRefunds);
cartRouter.post("/search-by-category/:id", CartController.searchCategory);
cartRouter.put("/pay-cart/:id", CartController.payCart);
cartRouter.put("/edit-cart/:id", CartController.updateCart);
