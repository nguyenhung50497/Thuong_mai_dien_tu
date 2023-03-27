import {createSlice} from "@reduxjs/toolkit";
import {getAllTransport} from "../../service/transportService";
import {editShop, findByIdShop, findByIdUserShop} from "../../service/shopService";

const initialState = {
    shop: {}
}
const shopSlice = createSlice({
    name: 'shops',
    initialState,
    extraReducers: builder => {
        builder.addCase(findByIdUserShop.fulfilled, (state, action) => {
            state.shop = action.payload
        })
        builder.addCase(findByIdShop.fulfilled, (state, action) => {
            state.shop = action.payload
        })
    }
})
export default shopSlice.reducer;