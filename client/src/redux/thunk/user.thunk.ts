import { createAsyncThunk } from "@reduxjs/toolkit"
import { ILoginResponse } from "../../types/interfaces"
import httpClient from "../../api/httpClient"
import { IRegisterFormData } from '../types/interface';


export const loginUser: any = createAsyncThunk("user/login", async (formData:any) => {
    const response = await httpClient.post<ILoginResponse>("api/v1/user/login", formData)
    return response
});

export const verifyUser: any = createAsyncThunk("user/verify", async () => {
    const response = await httpClient.post<ILoginResponse>("api/v1/user/refresh-token");
    console.log('blue',response)
    return response
});

export const registerUser: any = createAsyncThunk("user/register", async (formData:IRegisterFormData) => {
    const response = await httpClient.post<ILoginResponse>("api/v1/user/register", formData);
    return response
});

export const logoutUser: any = createAsyncThunk("user/logout", async () => {
    const response = await httpClient.post<ILoginResponse>("api/v1/user/logout");
    return response
});