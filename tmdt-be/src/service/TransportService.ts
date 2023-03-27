import {AppDataSource} from "../data-source";
import {Transport} from "../model/transport";
class TransportService {
    private transportRepository
    constructor() {
        this.transportRepository =  AppDataSource.getRepository(Transport)
    }
    getAll = async () => {
        let transport = await this.transportRepository.find()
        return transport;
    }
}
export default new TransportService();