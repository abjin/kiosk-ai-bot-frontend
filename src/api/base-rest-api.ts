/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from './axios';

export default class BaseRestApi {
  private readonly instance = axiosInstance;

  protected async GET<T>(path: string, params?: Record<any, any>): Promise<T> {
    const requestConfig = { params };
    const response = await this.instance.get(path, requestConfig);
    return response.data;
  }

  protected async POST<T>(path: string, body?: Record<any, any>): Promise<T> {
    const response = await this.instance.post(path, body);
    return response.data;
  }

  protected async PATCH<T>(path: string, body?: Record<any, any>): Promise<T> {
    const response = await this.instance.patch(path, body);
    return response.data;
  }

  protected async DELETE<T>(path: string): Promise<T> {
    const response = await this.instance.delete(path);
    return response.data;
  }
}
