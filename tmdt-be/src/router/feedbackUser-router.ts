import { Router } from "express";
import { auth } from "../middleware/auth";
import feedbackUserController from "../controller/FeedbackUserController";

export const feedbackUserRouter = Router();
// feedbackUserRouter.use(auth);
feedbackUserRouter.get("/:id", feedbackUserController.findByIdProduct);
feedbackUserRouter.post("/", feedbackUserController.create);
feedbackUserRouter.put("/:id",feedbackUserController.update)
feedbackUserRouter.delete("/:id",feedbackUserController.remove)