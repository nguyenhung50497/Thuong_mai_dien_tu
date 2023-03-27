import {AppDataSource} from "../data-source";
import {User} from "../model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import {SECRET} from "../middleware/auth";

class AuthService {
    private userRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }

    checkEmail = async (checkEmail) => {
        try {
            let emailCheck = await this.userRepository.findOneBy({emailUser: checkEmail})
            if (emailCheck === null) {
                return 'allow'
            } else {
                return 'not allowed'
            }
        } catch (e) {
            console.log(e)
        }
    }
    checkPhoneUser = async (numberPhone) => {
        try {
            let phone = numberPhone.phoneUser
            let phoneCheck = await this.userRepository.findOneBy({phoneUser: phone})
            if (phoneCheck === null) {
                return 'allow'
            } else {
                return 'not allowed'

            }
        } catch (e) {
            console.log(e)
        }
    }
    register = async (user) => {
        try {
            user.password = await bcrypt.hash(user.password, 10)
            await this.userRepository.save(user)
            return 'success'
        } catch (e) {
            console.log(e)
        }
    }
    registerGoogle = async (user) => {
        try {
            user.idGoogle = await bcrypt.hash(user.idGoogle, 10)
            user.password = await bcrypt.hash(user.password, 10)
            await this.userRepository.save(user)
            return 'success'
        } catch (e) {
            console.log(e)
        }
    }
    findUserByEmail = async (email)=> {
        try {
            let user = await this.userRepository.findOneBy({emailUser: email})
            if (!user) {
                return null
            }
            return user;
        } catch (e) {
            console.log(e)
        }
    }
    checkUser = async (user) => {
        try {
            let userCheck = await this.userRepository.findOneBy({username: user.username})
            if (!userCheck) {
                return 'user not found'
            } else {
                let passwordCompare = await bcrypt.compare(user.password, userCheck.password)
                if (!passwordCompare) {
                    return 'Password does not match'
                } else {
                    let payload = {
                        idUser: userCheck.idUser,
                        fullName: userCheck.fullName,
                        role: userCheck.role,
                        avatar: userCheck.avatar
                    }
                    const token = jwt.sign(payload, SECRET, {
                        expiresIn: 3600000
                    })
                    const check = {
                        token: token,
                        idUser: userCheck.idUser,
                        fullName: userCheck.fullName,
                        role: userCheck.role,
                        avatar: userCheck.avatar
                    }
                    return check;
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
    checkUserGoogle = async (user) => {
        try {
            let userCheck = await this.userRepository.findOneBy({username: user.username})
            if (!userCheck) {
                return 'user not found'
            } else {
                let idCompare = await bcrypt.compare(user.idGoogle, userCheck.idGoogle)
                if (!idCompare) {
                    return 'Password does not match'
                } else {
                    let payload = {
                        idUser: userCheck.idUser,
                        fullName: userCheck.fullName,
                        role: userCheck.role,
                        avatar: userCheck.avatar
                    }
                    const token = jwt.sign(payload, SECRET, {
                        expiresIn: 3600000
                    })
                    const check = {
                        token: token,
                        idUser: userCheck.idUser,
                        fullName: userCheck.fullName,
                        role: userCheck.role,
                        avatar: userCheck.avatar
                    }
                    return check;
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export default new AuthService()