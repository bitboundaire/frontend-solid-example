import axios, { Axios } from "axios";

export interface ServerApi {
  get<T>(url: string, params: Record<any, any>): Promise<T>;
}

export class HttpServerApi implements ServerApi {
  api: Axios;

  constructor() {
    this.api = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3/",
      headers: {
        accept: "application/json",
      }
    });
  }

  async get<T>(url: string, params: Record<any, any>): Promise<T> {
    const request = await this.api.get(url, { params });

    return request.data as T;
  }
}
