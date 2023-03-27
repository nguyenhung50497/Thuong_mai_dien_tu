import {Request, Response} from "express"
import TransportService from "../service/TransportService";
class TransportController {
    private TransportService
    constructor() {
        this.TransportService = TransportService
    }
    getAll = async (req: Request, res: Response) => {
        try {
            let transport = await this.TransportService.getAll()
            res.status(200).json(transport);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}
export default new TransportController();