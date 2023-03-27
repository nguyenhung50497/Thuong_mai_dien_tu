import { createSlice } from "@reduxjs/toolkit";
import {
   getAllCartShop,
   getCartByIdUser,
   getCartByIdUserDone,
   getCartByStatus,
   getDetailCart,
   searchByCategory,
   searchByIdCart,
   searchByName,
   searchByPhone,
   updateCart,
} from "../../service/cartService";

const initialState = {
   carts: [],
   detailCart: [],
   cart: {},
   cartDone: {},
   cart2: {},
};
const cartSlice = createSlice({
   name: "carts",
   initialState,
   extraReducers: (builder) => {
      builder.addCase(getAllCartShop.fulfilled, (state, action) => {
         state.carts = action.payload;
      });
      builder.addCase(getCartByStatus.fulfilled, (state, action) => {
         state.carts = action.payload;
      });
      builder.addCase(searchByName.fulfilled, (state, action) => {
         state.carts = action.payload;
      });
      builder.addCase(searchByCategory.fulfilled, (state, action) => {
         state.carts = action.payload;
      });
      builder.addCase(searchByIdCart.fulfilled, (state, action) => {
         state.carts = action.payload;
      });
      builder.addCase(searchByPhone.fulfilled, (state, action) => {
         state.carts = action.payload;
      });
      builder.addCase(getDetailCart.fulfilled, (state, action) => {
         state.detailCart = action.payload;
      });
      builder.addCase(getCartByIdUser.fulfilled, (state, action) => {
         state.cart = action.payload;
      });
      builder.addCase(getCartByIdUserDone.fulfilled, (state, action) => {
         state.cartDone = action.payload;
      });
      builder.addCase(updateCart.fulfilled, (state, action) => {
         state.cart2 = action.payload;
      });
   },
});
export default cartSlice.reducer;
