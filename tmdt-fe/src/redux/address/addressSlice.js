import {createSlice} from "@reduxjs/toolkit";
import {findByIdUserShop} from "../../service/shopService";
import {getAllAddress} from "../../service/addressUser";

const initialState = {
    listAddress: [],

}
const addressUserSlice = createSlice({
    name: 'addresses',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllAddress.fulfilled, (state, action) => {
            state.listAddress = action.payload
        })
    }
})
export default addressUserSlice.reducer