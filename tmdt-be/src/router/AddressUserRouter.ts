import AddressUserController from "../controller/AddressUserController";
import {Router} from "express";

export const AddressUserRouter = Router()
AddressUserRouter.get('/:id',AddressUserController.getAll)
AddressUserRouter.get('/find-by-id/:id', AddressUserController.findByIdAddress)
AddressUserRouter.delete('/:id',AddressUserController.delete)
AddressUserRouter.post('/',AddressUserController.create)
AddressUserRouter.put('/:id',AddressUserController.edit)