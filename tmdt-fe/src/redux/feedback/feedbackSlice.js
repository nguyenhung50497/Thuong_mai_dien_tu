import {createSlice} from "@reduxjs/toolkit";
import {getFeedbacksByIdProduct} from "../../service/feedbackService";

const initialState = {
    feedbacks: []
}
const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    extraReducers: builder => {
        builder.addCase(getFeedbacksByIdProduct.fulfilled, (state, action) => {
            state.feedbacks = action.payload
        })
    }
})
export default feedbackSlice.reducer;