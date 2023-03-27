import { createSlice } from "@reduxjs/toolkit";
import { addCartDetails, editCartDetails, getCartDetails, getCartDetailsById, getCartDetailsByStatus, getCartDetailsByUser } from "../../service/cartDetailService";
import { payCart } from "../../service/cartService";

const initialState = {
   cartDetails: [],
   cartDetail: [],
   count: [],
   cart: [],
   loading: false
};

const cartDetailSlice = createSlice({
   name: "cartDetail",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getCartDetails.fulfilled, (state, action) => {
         state.cartDetails = action.payload;
         state.loading = true;
      });
      builder.addCase(addCartDetails.fulfilled, (state, action) => {
         state.cartDetails.push(action.payload);
      });
      builder.addCase(getCartDetailsById.fulfilled, (state, action) => {
         state.cartDetail = action.payload;
      });
      builder.addCase(getCartDetailsByUser.fulfilled, (state, action) => {
         state.cart = action.payload;
         state.loading = true;
      });
      builder.addCase(getCartDetailsByStatus.fulfilled, (state, action) => {
         state.cartDetails = action.payload.cartDetails;
         state.count = action.payload.count;
      });
   },
});

export default cartDetailSlice.reducer;
