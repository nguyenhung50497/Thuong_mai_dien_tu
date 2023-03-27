import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const getAllAddress = createAsyncThunk(
   "address/getAll",
   async (data) => {
      const res = await customAxios.get("/addressUser/" + data);
      return res.data;
   }
);
export const deleteAddress = createAsyncThunk(
   "address/deleteAddress",
   async (data) => {
      const res = await customAxios.delete("/addressUser/" + data);
      return res.data;
   }
);
export const createAddress = createAsyncThunk(
   "address/createAddress",
   async (data) => {
      const res = await customAxios.post("/addressUser", data);
      return res.data;
   }
);
export const editAddress = createAsyncThunk(
   "address/editAddress",
   async (data) => {
      const res = await customAxios.put("/addressUser/" + data.idAddress, data);
      return res.data;
   }
);
