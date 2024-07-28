import { createAsyncThunk } from "@reduxjs/toolkit"
import httpClient from "../../api/httpClient"
import { IPostResponse } from "../../types/interfaces";


export const createPost: any = createAsyncThunk("post/create", async (formData:any) => {
    const response = await httpClient.post("api/v1/post/create-post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response
});

export const fetchPostBySlug: any = createAsyncThunk("post/fetch-by-slug", async (slug) => {
    const response = await httpClient.get<IPostResponse>(`api/v1/post/${slug}`)
    return response
});