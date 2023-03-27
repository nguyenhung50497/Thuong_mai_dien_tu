import {createSlice} from "@reduxjs/toolkit";
import {showProfile} from "../../service/userService";
import {getAllTransport} from "../../service/transportService";

const initialState = {
    transports: []
}
const transportSlice = createSlice({
    name: 'transport',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllTransport.fulfilled, (state, action) => {
            state.transports = action.payload
        })
    }
})
export default transportSlice.reducer;