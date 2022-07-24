import axios, { AxiosResponse } from 'axios';

export const get = async (
  url: string,
  headers?: { [key: string]: string },
): Promise<AxiosResponse> => axios.get(url, { headers });

export const post = async (
  url: string,
  body: { [key: string]: string },
  headers?: { [key: string]: string },
): Promise<AxiosResponse> => axios.post(url, body, { headers });
