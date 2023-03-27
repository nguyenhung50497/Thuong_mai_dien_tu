import categoryService from "../service/CategoryService";
import {Request, Response} from "express";
import feedbackService from "../service/FeedbackUserService";

class FeedbackUserController {
    private feedbackService;
    constructor() {
        this.feedbackService = feedbackService;

    }

    findByIdProduct = async (req: Request, res: Response) => {
        try {
            let limit = 10;
            let offset = 0;
            let page = 1;
            if (req.query.page) {
                page = +req.query.page;
                offset = (+page - 1) * limit;
            }
            let idProduct = req.params.id;
            let feedbacks = await feedbackService.findById(idProduct,limit,offset);
            let totalPage = await feedbackService.count(idProduct,limit);
            return res.status(200).json({
                feedbacks: feedbacks,
                currentPage: page,
                totalPage: totalPage,
            });
        } catch (e) {
            res.status(500).json(e.message);
        }
    };

    create = async (req: Request, res: Response) => {
        let check = true
        let existFeedbacks = await feedbackService.getAll()
        for (let i = 0; i < existFeedbacks.length; i++) {
            if(existFeedbacks[i].idProduct === req.body.idProduct && existFeedbacks[i].idUser === req.body.idUser){
                check = false
            }
        }
        try {
            if (check === true){
                let feedbacks = await feedbackService.save(req.body);
                return res.status(200).json(feedbacks);
            }else {
                return res.status(401).json('lỗi');
            }
        } catch (e) {
            res.status(500).json(e.message);
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            let idFeedback = req.params.id;
            let feedbacks = await this.feedbackService.update(idFeedback, req.body);
            return res.status(200).json(feedbacks);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
    remove = async (req: Request, res: Response) => {
        try {
            let idFeedback = req.params.id;
            let feedbacks = await this.feedbackService.remove(idFeedback);
            return res.status(200).json(feedbacks);
        }
    catch(e) {
        res.status(500).json(e.message);
    }
};


}

export default new FeedbackUserController();
