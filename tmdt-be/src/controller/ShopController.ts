import {Request, Response} from "express"
import ShopService from "../service/ShopService";
class ShopController {
    private ShopService
    constructor() {
        this.ShopService = ShopService
    }
    create = async (req: Request, res: Response) => {
        try {
            let shop = await this.ShopService.register(req.body)
            res.status(200).json(shop);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    edit = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let shop = await this.ShopService.editShop(id,req.body)
            res.status(200).json("success");
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    delete = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let shop = await this.ShopService.removeShop(id)
            res.status(200).json(shop);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    findById = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let shop = await this.ShopService.findShop(id)
            res.status(200).json(shop);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    findByIdShop = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let shop = await this.ShopService.findByIdShop(id)
            res.status(200).json(shop);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    getAll = async (req: Request, res: Response) => {
        try {
            let shop = await this.ShopService.getAll()
            res.status(200).json(shop);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}
export default new ShopController()