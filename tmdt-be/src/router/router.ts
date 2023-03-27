import { productRouter } from "./product-router";
import { categoryRouter } from "./category-router";
import { searchRouter } from "./search-router";
import { authRouter } from "./AuthRouter";
import { auth } from "../middleware/auth";
import { userRouter } from "./User-router";
import { shopRouter } from "./ShopRouter";
import { transportRouter } from "./TransportRouter";
import { Router } from "express";
import { AddressUserRouter } from "./AddressUserRouter";
import {cartDetailRouter } from "./cartDetail-router";
import { cartRouter } from "./cart-router";
import {feedbackUserRouter} from "./feedbackUser-router";
import { voucherRouter } from "./voucher-router";
import {notificationRouter} from "./notification-router";
export const router = Router();
router.use("/api/auth", authRouter);
router.use("/api/products", productRouter);
router.use("/api/categories", categoryRouter);
router.use("/api/search", searchRouter);
router.use(auth)
router.use("/api/categories", categoryRouter);
router.use("/api/users", userRouter);
router.use("/api/shops", shopRouter);
router.use("/api/transport", transportRouter);
router.use("/api/addressUser", AddressUserRouter);
router.use("/api/cart-details", cartDetailRouter);
router.use("/api/carts", cartRouter);
router.use('/api/feedbackUser',feedbackUserRouter)
router.use('/api/vouchers',voucherRouter)
router.use('/api/notifications',notificationRouter)


