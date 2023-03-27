import {createSlice} from "@reduxjs/toolkit";
import {getNotificationsByReceiver} from "../../service/notificationService";

const initialState = {
    notifications: [],
    loading: false,
}
const notificationSlice = createSlice({
    name: 'shops',
    initialState,
    extraReducers: builder => {
        builder.addCase(getNotificationsByReceiver.fulfilled, (state, action) => {
            state.notifications = action.payload;
            state.loading = true;
        })
    }
})
export default notificationSlice.reducer;