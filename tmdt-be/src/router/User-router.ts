import {Router} from "express";
import UserController from "../controller/UserController";
export const userRouter = Router()
userRouter.get('/', UserController.showListUser)
userRouter.put('/:id', UserController.editUser)
userRouter.put('/password/:id', UserController.changePassword)
userRouter.put('/checkPassword/:id', UserController.checkPassword)
userRouter.get('/profile/:id', UserController.showProfile)