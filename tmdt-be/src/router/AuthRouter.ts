import AuthController from "../controller/AuthController";
import {Router} from "express";

export const authRouter = Router()
authRouter.post('/login', AuthController.login)
authRouter.post('/register', AuthController.register)
authRouter.post('/check-email', AuthController.checkEmail)
authRouter.post('/check-phone', AuthController.checkPhone)
authRouter.post('/google', AuthController.loginGoogle)