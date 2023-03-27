import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const getFeedbacksByIdProduct = createAsyncThunk(
   "feedbacks/getFeedbacks",
   async (data) => {
      const res = await customAxios.get("feedbackUser/" + data);
      return res.data;
   }
);

export const addFeedback = createAsyncThunk(
   "feedback/addFeedback",
   async (data) => {
      const res = await customAxios.post("feedbackUser", data, {
         headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("access-token"),
         },
      });
      return res.data;
   }
);

export const editFeedback = createAsyncThunk(
   "feedback/editFeedback",
   async (data) => {
      const res = await customAxios.put(
         "feedbackUser/" + data.idFeedback,
         data,
         {
            headers: {
               "Content-Type": "application/json",
               authorization: "Bearer " + localStorage.getItem("access-token"),
            },
         }
      );
      return res.data;
   }
);

export const deleteFeedback = createAsyncThunk(
   "feedback/deleteFeedback",
   async (data) => {
      const res = await customAxios.delete("feedbackUser/" + data, {
         headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("access-token"),
         },
      });
      return res.data;
   }
);
