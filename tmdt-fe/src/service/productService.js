import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const getProducts = createAsyncThunk(
   "products/getProducts",
   async (page) => {
      const res = await customAxios.get("products?page=" + page);
      return res.data;
   }
);

export const getProductById = createAsyncThunk(
   "products/getProduct",
   async (data) => {
      const res = await customAxios.get("products/find-by-id/" + data);
      return res.data;
   }
);





export const getProductByIdShop = createAsyncThunk(
   "products/getProductsByIdShop",
   async (data) => {
      const res = await customAxios.get(
         "products/my-shop/" + data.idShop + "?page=" + data.page
      );
      return res.data;
   }
);

export const addProduct = createAsyncThunk(
   "products/addProduct",
   async (data) => {
      const res = await customAxios.post("products", data, {
         headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("access-token"),
         },
      });
      return res.data;
   }
);

export const editProduct = createAsyncThunk(
   "products/editProduct",
   async (data) => {
      const res = await customAxios.put("products/" + data.idProduct, data, {
         headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("access-token"),
         },
      });
      return res.data;
   }
);

export const deleteProduct = createAsyncThunk(
   "products/deleteProduct",
   async (data) => {
      const res = await customAxios.delete("products/" + data, {
         headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("access-token"),
         },
      });
      return res.data;
   }
);
export const search = createAsyncThunk(
   "products/searchProducts",
   async (search) => {
      const res = await customAxios.get(
         "search/products?" + search[0] + "&page=" + search[1]
      );
      const searchParams = new URLSearchParams(search[0]);

      let keyword = [];
      let keywordExist = false;
      for (const [key, value] of searchParams.entries()) {
         if (key === "keyword") {
            keywordExist = true;
            keyword[0] = value;
         }
      }
      if (keywordExist === false) keyword[0] = null;
      return { search: res.data, keyword: keyword, existUrl: search[0] };
   }
);
