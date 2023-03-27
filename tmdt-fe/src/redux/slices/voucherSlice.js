import { createSlice } from "@reduxjs/toolkit";
import { createVoucher, deleteVoucher, editVoucher, getAllVouchers } from "../../service/voucherService";
import { editProduct } from "../../service/productService";

const initialState = {
   vouchers: [],
   voucher: [],
   check: [],
};

const voucherSlice = createSlice({
   name: "voucher",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getAllVouchers.fulfilled, (state, action) => {
         state.vouchers = action.payload;
      });
      builder.addCase(createVoucher.fulfilled, (state, action) => {
         state.vouchers.push(action.payload);
      });
      builder.addCase(deleteVoucher.fulfilled, (state, action) => {
         state.vouchers = action.payload;
      });
      builder.addCase(editVoucher.fulfilled, (state, action) => {
         if (action.payload === "Không hợp lệ") {
            state.check = action.payload;
         } else {
            state.vouchers = action.payload;
         }
      });
   },
});

export default voucherSlice.reducer;
