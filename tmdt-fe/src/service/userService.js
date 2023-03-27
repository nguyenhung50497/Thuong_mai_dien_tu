import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const loginUser = createAsyncThunk(
    'auth/login',
    async (data) => {
        const res = await customAxios.post('auth/login', data)
        return res.data;
    }
)
export const registerUser = createAsyncThunk(
    'auth/register',
    async (data) => {
        const res = await customAxios.post('auth/register', data)
        return res.data;
    }
)
export const checkEmail = createAsyncThunk(
    'auth/checkEmail',
    async (data) => {
        const res = await customAxios.post('auth/check-email', data)
        return res.data;
    }
)
export const checkPhone = createAsyncThunk(
    'auth/checkPhone',
    async (data) => {
        const res = await customAxios.post('auth/check-phone', data)
        return res.data;
    }
)
export const userGoogle = createAsyncThunk(
    'auth/userGoogle',
    async (data) => {
        const res = await customAxios.post('auth/google', data)
        return res.data
    }
)
export const showProfile = createAsyncThunk(
    'users/showProfile',
    async (data) => {
        const res = await customAxios.get('users/profile/' + data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + localStorage.getItem("access-token"),
                }
            })
        return res.data
    }
)
export const editProfile = createAsyncThunk(
    'users/editProfile',
    async (data) => {
        const res = await customAxios.put('users/' + data.idUser, data)
        return res.data
    }
)
export const checkPassword = createAsyncThunk(
    'users/checkPassword',
    async (data) => {
        console.log(data.idUser)
        const res = await customAxios.put('users/checkPassword/' + data.idUser, data)
        return res.data
    }
)
export const changePassword = createAsyncThunk(
    'users/changePassword',
    async (data) => {
        const res = await customAxios.put('users/password/' + data.idUser, data)
        return res.data
    }
)
