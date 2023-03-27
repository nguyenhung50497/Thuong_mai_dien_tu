import {AppDataSource} from "../data-source";
import {AddressUser} from "../model/addressUser";

class AddressUserService {
    private addressUserRepository;

    constructor() {
        this.addressUserRepository = AppDataSource.getRepository(AddressUser)
    }

    create = async (address) => {
        try {
            await this.addressUserRepository.save(address)
            return 'success'
        } catch (e) {
            console.log(e)
        }
    }
    delete = async (idAddress) => {
        try {
            let address = await this.addressUserRepository.findOneBy({
                idAddress: idAddress,
            });
            if (!address) {
                return null;
            }
            await this.addressUserRepository.delete({idAddress: idAddress});
            return 'success'
        } catch (e) {
            console.log(e)
        }
    }
    getAll = async (idUser) => {
        try {
            let sql = `select * from address_user where idUser = ${idUser}`;
            let address = await this.addressUserRepository.query(sql);
            return address;
        } catch (e) {
            console.log(e)
        }
    }
    update = async (idAddress, newAddress) => {
        try {
            let address = await this.addressUserRepository.findOneBy({
                idAddress: idAddress,
            });
            if (!address) {
                return null;
            }
            await this.addressUserRepository.update({idAddress: idAddress}, newAddress);
            return 'success'
        } catch (e) {
            console.log(e)
        }
    }
    findByIdAddress = async (idAddress) => {
        try {
            let address = await this.addressUserRepository.findOneBy({idAddress: idAddress,});
            return address;
        } catch (e) {
            console.log(e)
        }
    }
}

export default new AddressUserService()