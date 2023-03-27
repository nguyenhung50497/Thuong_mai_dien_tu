import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";


export const getNotificationsByReceiver = createAsyncThunk(
    "notifications/getNotificationsByShop",
    async (idReceiver) => {
        const res = await customAxios.get("notifications/find-by-receiver/" + idReceiver);
        return res.data;
    }
);

export const addNotification = createAsyncThunk(
    "notifications/addNotifications",
    async (data) => {
        const res = await customAxios.post("notifications", data);
        return res.data;
    }
);

export const editNotification = createAsyncThunk(
    "notifications/editNotifications",
    async (data) => {
        const res = await customAxios.put("notifications/" + data);
        return res.data;
    }
);

export const deleteNotification = createAsyncThunk(
    "notifications/deleteNotifications",
    async (data) => {
        const res = await customAxios.delete("notifications/" + data);
        return res.data;
    }
);
