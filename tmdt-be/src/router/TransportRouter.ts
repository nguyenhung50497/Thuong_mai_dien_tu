import {Router} from "express";
import TransportController from "../controller/TransportController";
export const transportRouter = Router()
transportRouter.get('/', TransportController.getAll )


