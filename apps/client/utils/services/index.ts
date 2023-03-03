import axios, { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { parseCookies } from 'nookies'

const instance = axios.create({
  baseURL: process?.env?.API_HOST ?? 'http://localhost:8080',
  timeout: 3000,
  headers: {
    'x-app-id': 'auction-app-1'
  }
})

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const allCookies = parseCookies()
  const token = allCookies?.['tkn'] || ""

  config.headers.Authorization = `bearer ${token}`;
  return config;
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.info(`[response] [${JSON.stringify(response)}]`);
  return response;
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
}

const Service = (() => {
  instance.interceptors.request.use(
    onRequest,
    onRequestError
  );

  instance.interceptors.response.use(
    onResponse,
    onResponseError
  );

  return instance;
})()

export default Service;
