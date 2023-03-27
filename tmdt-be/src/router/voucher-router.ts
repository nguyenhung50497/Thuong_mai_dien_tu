import { Router } from "express";
import VoucherController from "../controller/VoucherController";

export const voucherRouter = Router();
voucherRouter.get("/", VoucherController.getAll);
voucherRouter.post("/", VoucherController.createVoucher);
voucherRouter.delete("/:id", VoucherController.deleteVoucher);
voucherRouter.put("/:id", VoucherController.editVoucher);