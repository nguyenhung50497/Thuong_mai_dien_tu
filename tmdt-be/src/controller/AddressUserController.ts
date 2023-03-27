import {Request, Response} from "express";
import AddressUserService from "../service/AddressUserService";

class AddressUserController {
    private AddressUserService
    constructor() {
        this.AddressUserService = AddressUserService
    }
    getAll = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let address = await this.AddressUserService.getAll(id)
            return res.status(200).json(address);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
    create = async (req: Request, res: Response) => {
        try {
            let address = await this.AddressUserService.create(req.body)
            return res.status(200).json(address);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
    delete = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let address = await this.AddressUserService.delete(id)
            return res.status(200).json(address);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
    findByIdAddress = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let address = await this.AddressUserService.findByIdAddress(id)
            return res.status(200).json(address);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
    edit = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let address = await this.AddressUserService.update(id,req.body)
            return res.status(200).json(address);
        }  catch (err) {
            res.status(500).json(err.message);
        }
    }
}
export default new AddressUserController()







