import {Router} from "express";
import ShopController from "../controller/ShopController";
export const shopRouter = Router()
shopRouter.get('/', ShopController.getAll )
shopRouter.put('/:id',ShopController.edit)
shopRouter.delete('/:id',ShopController.delete)
shopRouter.get('/find-by-idShop/:id',ShopController.findByIdShop)
shopRouter.get('/:id',ShopController.findById)
shopRouter.post('/', ShopController.create)