import { createSlice } from "@reduxjs/toolkit";
import { getDistricts, getProvinces } from "../../service/addressService";

const initialState = {
   provinces: [],
   districts: [],
   wards: []
};

const addressSlice = createSlice({
   name: "category",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getProvinces.fulfilled, (state, action) => {
         state.provinces = action.payload;
      });
      builder.addCase(getDistricts.fulfilled, (state, action) => {
         state.districts = action.payload;
      });
   },
});

export default addressSlice.reducer;
