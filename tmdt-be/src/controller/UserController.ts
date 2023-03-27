import UserService from "../service/UserService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import {Request, Response} from "express";

class UserController {
    private UserService

    constructor() {
        this.UserService = UserService;
    }

    editUser = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let editProfile = await this.UserService.editUser(id, req.body);
            res.status(200).json(editProfile);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    showListUser = async (req: Request, res: Response) => {
        try {
            let users = await this.UserService.getAll();
            res.status(200).json(users)
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    showProfile = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let user = await this.UserService.getUser(id)
            res.status(200).json({user})
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    checkPassword = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let user = await UserService.findUser(id)
            let passwordCompare = await bcrypt.compare(req.body.password, user.password)
            if (!passwordCompare) {
                res.status(200).json('wrong password')
            } else {
                res.status(200).json('success')
            }
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    changePassword = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let newPass = await bcrypt.hash(req.body.password, 10)
            let response = await UserService.changePassword(id, newPass)
            res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}

export default new UserController();