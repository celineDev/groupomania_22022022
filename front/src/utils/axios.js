import axios from 'axios';

const Axios = axios.create();

Axios.defaults.baseURL = 'http://localhost:3000';

Axios.defaults.headers = {
  'Content-Type': 'application/json',
};

//All request will wait 2 seconds before timeout
Axios.defaults.timeout = 2000;

Axios.defaults.withCredentials = true;


export const GET = async (url) => {
  return await Axios.get(`/${url}`);
}

export const POST = async (url, payload) => {
  return await Axios.post(`/${url}`, payload);
}

export const PUT = async (url, payload) => {
  return await Axios.put(`/${url}`, payload);
}

export const DELETE = async (url) => {
  return await Axios.delete(`/${url}`);
}
