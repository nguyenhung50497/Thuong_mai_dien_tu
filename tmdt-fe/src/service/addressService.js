import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProvinces = createAsyncThunk("address/province", async () => {
   const res = await axios.get("https://vapi.vnappmob.com/api/province/");
   return res.data.results;
});

export const getDistricts = createAsyncThunk(
   "address/district",
   async (provinceId) => {
      const res = await axios.get(
         `https://vapi.vnappmob.com/api/province/district/${provinceId}`
      );
      return res.data.results;
   }
);
