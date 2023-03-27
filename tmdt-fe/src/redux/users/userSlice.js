import {createSlice} from "@reduxjs/toolkit";
import {checkEmail, loginUser, showProfile, userGoogle} from "../../service/userService";

const initialState = {
    users: JSON.parse(localStorage.getItem('users')),
    user: {}
}
const userSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: builder => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.users = action.payload;
            localStorage.setItem('users', JSON.stringify(action.payload))
            localStorage.setItem('access-token', action.payload.token)
        })
        builder.addCase(userGoogle.fulfilled, (state, action) => {
            state.users = action.payload
            localStorage.setItem('users', JSON.stringify(action.payload))
            localStorage.setItem('access-token', action.payload.token)
        })
        builder.addCase(showProfile.fulfilled, (state, action) => {
            state.user = action.payload
        })
    }
})
export default userSlice.reducer;