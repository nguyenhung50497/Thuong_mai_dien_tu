import { Voucher } from "../model/voucher";
import { AppDataSource } from "../data-source";

class VoucherService {
   private voucherRepository;
   constructor() {
      this.voucherRepository = AppDataSource.getRepository(Voucher);

   }

   getAllVoucher = async () => {
      let vouchers = await this.voucherRepository.find();
      if (!vouchers) {
         return null;
      }

      return vouchers;
   };

   save = async (voucher) => {
      return await this.voucherRepository.save(voucher);
   };
   findByIdProduct = async (idProduct) => {
      let sql = `select * from voucher where idProduct = ${idProduct}`;
      let vouchers = await this.voucherRepository.query(sql);
      if (!vouchers) {
         return null;
      }
      return vouchers;
   };
   remove = async (idVoucher) => {
      let voucher = await this.voucherRepository.findOneBy({
         idVoucher: idVoucher,
      });
      if (!voucher) {
         return null;
      }
      await this.voucherRepository.delete({
         idVoucher: idVoucher,
      });
      return "success";
   };
   update = async (newVoucher) => {
      let voucher = await this.voucherRepository.findOneBy({
         idVoucher: newVoucher.idVoucher,
      });
      if (!voucher) {
         return null;
      }
      await this.voucherRepository.update(
         {
            idVoucher: newVoucher.idVoucher,
         },
         newVoucher
      );
      return "success";
   };
}
export default new VoucherService();
