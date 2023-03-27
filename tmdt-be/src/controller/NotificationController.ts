import {Request, Response} from "express";
import notificationService from "../service/NotificationService";

class NotificationController {
    private notificationService

    constructor() {
        this.notificationService = notificationService
    }

    getAllNotification = async (req: Request, res: Response) => {
        try {
            let notifications = await notificationService.getAllNotification();
            return res.status(201).json(notifications);
        } catch (err) {
            res.status(500).json(err.message);
        }
    };
    createNotification = async (req: Request, res: Response) => {
        try {
            let data = req.body
            let notification;
            if (data.idProduct) {
                let idUserShop = await notificationService.getIdUserShop(data.idProduct)
                data.idReceiver = idUserShop[0].idUser
                data.idCart = 0
                notification  = await notificationService.save(data);
            } else {
               notification  = await notificationService.save(data);
            }
            return res.status(200).json(notification);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
    editNotification = async (req: Request, res: Response) => {
        try {
            let idNotification = req.params.id;
            let notification = await this.notificationService.update(idNotification);
            return res.status(200).json(notification);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
    removeNotification = async (req: Request, res: Response) => {
        try {
            let idNotification = req.params.id;
            let notification = await this.notificationService.remove(idNotification);
            return res.status(200).json(notification);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
    findByIdSender = async (req: Request, res: Response) => {
        try {
            let idSender = req.params.id;
            let notifications = await notificationService.findBySender(idSender);
            return res.status(200).json(notifications);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
    findByIdReceiver = async (req: Request, res: Response) => {
        try {
            let idReceiver = req.params.id;
            let notifications = await notificationService.findByReceiver(idReceiver);
            return res.status(200).json(notifications);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
}

export default new NotificationController();








