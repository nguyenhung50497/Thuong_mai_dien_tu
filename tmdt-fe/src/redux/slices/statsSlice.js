import { createSlice } from "@reduxjs/toolkit";

import {sales} from "../../service/statsService";


const initialState = {
    sales: [],
};

const statsSlice = createSlice({
    name: "stats",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sales.fulfilled, (state, action) => {
            state.sales = action.payload;
        });

    },
});

export default statsSlice.reducer;