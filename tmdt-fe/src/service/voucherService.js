import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const getAllVouchers = createAsyncThunk(
   "vouchers/getAllVouchers",
   async () => {
      const res = await customAxios.get("vouchers");
      return res.data;
   }
);
export const createVoucher = createAsyncThunk(
   "vouchers/createVoucher",
   async (data) => {
      const res = await customAxios.post("vouchers", data);
      return res.data;
   }
);
export const deleteVoucher = createAsyncThunk(
   "vouchers/deleteVoucher",
   async (data) => {
      await customAxios.delete("vouchers/" + data);
      const res = await customAxios.get("vouchers");
      return res.data;
   }
);
export const editVoucher = createAsyncThunk(
   "vouchers/editVoucher",
   async (data) => {
      const res = await customAxios.put("vouchers/" + data.idVoucher, data);
      if (res.data === "Không hợp lệ") {
         return res.data;
      }
      return (await customAxios.get("vouchers")).data;
   }
);
