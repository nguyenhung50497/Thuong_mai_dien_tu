import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";
export const getAllTransport = createAsyncThunk (
    'transport/getAll',
    async (data) => {
        const res = await customAxios.get('transport')
        return res.data;
    }
)