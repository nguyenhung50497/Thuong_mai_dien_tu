import { createSlice } from "@reduxjs/toolkit";
import {
   addProduct,
   deleteProduct,
   editProduct,
   getProductById,
   getProductByIdShop,
   getProducts,
   search
} from "../../service/productService";


const initialState = {
   products: [],
   product: {},
   search: [],
   keyword: [],
   existUrl: '',
   loading: true,
};

const productSlice = createSlice({
   name: "product",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getProducts.fulfilled, (state, action) => {
         state.products = action.payload;
         state.loading = false;
         state.product = {};
      });
      builder.addCase(getProductById.fulfilled, (state, action) => {
         state.product = action.payload;
         state.loading = true;
      });
      builder.addCase(getProductByIdShop.fulfilled, (state, action) => {
         state.products = action.payload;
         state.loading = false;
         state.product = {};
      });
      builder.addCase(search.fulfilled, (state, action) => {
         state.search = action.payload.search;
         state.keyword = action.payload.keyword;
         state.existUrl = action.payload.existUrl;
         state.loading = false
      });
      builder.addCase(addProduct.fulfilled, (state, action) => {
         state.products.products.push(action.payload);
      });
      builder.addCase(editProduct.fulfilled, (state, action) => {
         state.products.products.splice(
            action.payload.idProduct,
            1,
            action.payload
         );
         state.product = {};
      });
      builder.addCase(deleteProduct.fulfilled, (state, action) => {
         state.products.products.splice(action.payload, 1);
      });
   },
});

export default productSlice.reducer;
