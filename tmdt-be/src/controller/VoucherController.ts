import { Request, Response } from "express";
import VoucherService from "../service/VoucherService";
class VoucherController {
   private voucherService;
   constructor() {
      this.voucherService = VoucherService;
   }
   getAll = async (req: Request, res: Response) => {
      try {
         let voucher = await this.voucherService.getAllVoucher();
         res.status(200).json(voucher);
      } catch (e) {
         res.status(500).json(e.message);
      }
   };

   createVoucher = async (req: Request, res: Response) => {
      try {
         let newVoucher = req.body;
         let checkVoucher = await this.voucherService.findByIdProduct(
            newVoucher.idProduct
         );
         for (let i of checkVoucher) {
            if (new Date(i.dayEnd) >= new Date(newVoucher.dayStart)) {
               return res.status(200).json("Không hợp lệ");
            }
         }
         let voucher = await this.voucherService.save(newVoucher);
         return res.status(200).json(voucher);
      } catch (e) {
         res.status(500).json(e.message);
      }
   };

   deleteVoucher = async (req: Request, res: Response) => {
      try {
         let voucher = await this.voucherService.remove(req.params.id);
         return res.status(200).json(voucher);
      } catch (e) {
         res.status(500).json(e.message);
      }
   };
   editVoucher = async (req: Request, res: Response) => {
      try {
         let newVoucher = req.body;
         let checkVoucher = await this.voucherService.findByIdProduct(
            newVoucher.idProduct
         );
         for (let i of checkVoucher) {
            if (
               new Date(i.dayEnd) >= new Date(newVoucher.dayStart) &&
               i.idVoucher !== newVoucher.idVoucher
            ) {
               return res.status(200).json("Không hợp lệ");
            }
         }
         let voucher = await this.voucherService.update(newVoucher);
         return res.status(200).json(voucher);
      } catch (e) {
         res.status(500).json(e.message);
      }
   };
}
export default new VoucherController();
