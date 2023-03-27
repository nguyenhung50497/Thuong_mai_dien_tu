import { Router } from "express";
import notificationController from "../controller/NotificationController";
import { auth } from "../middleware/auth";

export const notificationRouter = Router();
notificationRouter.use(auth);
notificationRouter.get("", notificationController.getAllNotification);
notificationRouter.post("/", notificationController.createNotification);
notificationRouter.put("/:id", notificationController.editNotification);
notificationRouter.delete("/:id", notificationController.removeNotification);
notificationRouter.get("/find-by-sender/:id", notificationController.findByIdSender);
notificationRouter.get("/find-by-receiver/:id", notificationController.findByIdReceiver);
