import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const getAllCartShop = createAsyncThunk(
   "carts/getAllCartShop",
   async (data) => {
      const res = await customAxios.get("carts/" + data.idShop + "?page=" + data.page);
      return res.data;
   }
);
export const getCartByStatus = createAsyncThunk(
   "carts/getCartByStatus",
   async (data) => {
      const res = await customAxios.post("carts/" + data.idShop + "?page=" + data.page, data);
      return res.data;
   }
);
export const searchByName = createAsyncThunk(
   "carts/searchByName",
   async (data) => {
      const res = await customAxios.post("carts/search-by-name/" + data.idShop + "?page=" + data.page, data);
      return res.data;
   }
);
export const searchByPhone = createAsyncThunk(
   "carts/searchByPhone",
   async (data) => {
      const res = await customAxios.post("carts/search-by-phone/" + data.idShop + "?page=" + data.page, data);
      return res.data;
   }
);
export const searchByCategory = createAsyncThunk(
   "carts/searchByCategory",
   async (data) => {
      const res = await customAxios.post("carts/search-by-category/" + data.idShop + "?page=" + data.page, data);
      return res.data;
   }
);
export const searchByIdCart = createAsyncThunk(
   "carts/searchByIdCart",
   async (data) => {
      const res = await customAxios.post("carts/search-by-idCart/" + data.idShop + "?page=" + data.page, data);
      return res.data;
   }
);
export const getDetailCart = createAsyncThunk(
   "carts/getDetailCart",
   async (data) => {
      const res = await customAxios.post("carts/all/detail-cart", data);
      return res.data;
   }
);
export const orderStatusSending = createAsyncThunk(
   "carts/getDetailCart",
   async (data) => {
      const res = await customAxios.get("carts/order-status-sending/" + data);
      return res.data;
   }
);
export const orderStatusRefunds = createAsyncThunk(
   "carts/orderStatusRefunds",
   async (data) => {
      const res = await customAxios.get("carts/order-status-refunds/" + data);
      return res.data;
   }
);

export const getCartByIdUser = createAsyncThunk(
   "carts/getCartByIdUser",
   async (data) => {
      const res = await customAxios.get("carts/find-by-idUser/" + data);
      return res.data;
   }
);

export const getCartByIdUserDone = createAsyncThunk(
   "carts/getCartByIdUserDone",
   async (data) => {
      const res = await customAxios.get("carts/find-by-idUser-done/" + data);
      return res.data;
   }
);

export const payCart = createAsyncThunk("carts/payCart", async (data) => {
   const res = await customAxios.put("carts/pay-cart/" + data.idCart, data);
   return res.data;
});
export const updateCart = createAsyncThunk("carts/updateCart", async (data) => {
   await customAxios.put("carts/edit-cart/" + data[0].idCart, data[0]);
   const res = await customAxios.get("carts/find-by-idUser/" + data[1]);
   return res.data;
});
