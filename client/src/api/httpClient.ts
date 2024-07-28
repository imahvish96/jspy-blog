// src/httpClient.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class HttpClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({ baseURL, withCredentials: true });
  }

  async get<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.get(url, config);
      return response.data;
    } catch (error) {
      console.error('Error fetching data', error);
      throw error;
    }
  }

  async post<T>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.post(url, data, config);
      return response.data;
    } catch (error) {
      console.error('Error posting data', error);
      throw error;
    }
  }

  // You can add more methods like put, delete, etc., as needed.
}

const httpClient = new HttpClient('http://localhost:4001');

export default httpClient;
