import {AppDataSource} from "../data-source";
import {Shop} from "../model/shop";
import {User} from "../model/user";

class UserService {
    private shopRepository
    private userRepository
    constructor() {
        this.shopRepository = AppDataSource.getRepository(Shop)
        this.userRepository = AppDataSource.getRepository(User)
    }
    editShop = async (id, newShop) => {
        let user = await this.shopRepository.findOneBy({idShop: id})
        if (!user) {
            return null;
        }
        let shop = await this.shopRepository.update({idShop: id}, newShop)
        return shop
    }
    getAll = async () => {
        let user = await this.shopRepository.find()
        return user;
    }
    findShop = async (id) => {
        let user = await this.shopRepository.findOneBy({idUser: id})
        return user;
    }
    findByIdShop = async (id) => {
        let shop = await this.shopRepository.findOneBy({idShop: id})
        return shop;
    }
    register = async (shop) => {
        try {
            await this.shopRepository.save(shop)
           let user = await this.userRepository.findOneBy({idUser: shop.idUser})
            if (!user) {
                return null;
            } else {
                await this.userRepository.update({idUser: shop.idUser}, {role: 'user'})
            }
            return 'success'
        } catch (e) {
            console.log(e)
        }
    }
    removeShop = async (id)=> {
        let post = await this.shopRepository.findOneBy({idShop: id});
        if(!post){
            return null;
        }
        return  this.shopRepository.delete({idShop: id});
    }
}
export default new UserService()