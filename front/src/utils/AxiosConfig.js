import axios from 'axios';

class AxiosConfig {
  constructor() {
    this.axios = axios.create();
    this.axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`;
    this.axios.defaults.headers = {
      'Content-Type': 'application/json',
    };
    //All request will wait 1 seconds before timeout
    this.axios.defaults.timeout = 1000;
    this.axios.defaults.withCredentials = true;
  }

  GET = async (url) => {
    return await this.axios.get(`/${url}`);
  }

  POST = async (url, payload) => {
    return await this.axios.post(`/${url}`, payload);
  }

  PUT = async (url, payload) => {
    return await this.axios.put(`/${url}`, payload);
  }

  DELETE = async (url) => {
    return await this.axios.delete(`/${url}`);
  }
}

export const axiosInstance = new AxiosConfig();

